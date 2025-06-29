'use client';

import React, { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { useRouter } from 'next/navigation';

interface Question {
    id: number;
    statement: string;
    alternatives: { [key: string]: string };
}

interface ExamData {
    creator: string;
    id: string;
    title: string;
    subtitle: string;
    questions: Question[];
}

interface AnswerKeyEntry {
    id: number;
    correct: string;
}

interface AnswerKeyData {
    creator: string;
    id: string;
    title: string;
    subtitle: string;
    answers: AnswerKeyEntry[];
}

const ALT_LETTERS = ['A', 'B', 'C', 'D', 'E'];

async function fetchYamlFile(path: string): Promise<string> {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return await res.text();
}

function parseYamlExam(yamlText: string): ExamData {
    return yaml.load(yamlText) as ExamData;
}

function parseYamlAnswerKey(yamlText: string): AnswerKeyData {
    return yaml.load(yamlText) as AnswerKeyData;
}

// Custom hook to detect if screen is small (tailwind 'sm')
function useIsSmallScreen() {
    const [isSmall, setIsSmall] = useState(false);
    useEffect(() => {
        // Match max-width: 639px (tailwind's sm breakpoint)
        const media = window.matchMedia('(max-width: 639px)');
        const listener = () => setIsSmall(media.matches);
        listener();
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, []);
    return isSmall;
}

export default function ExamApp() {
    const [examData, setExamData] = useState<ExamData | null>(null);
    const [answerKey, setAnswerKey] = useState<AnswerKeyData | null>(null);
    const [current, setCurrent] = useState(0);
    const [answers, setAnswers] = useState<(string | null)[]>([]);
    const [showSheet, setShowSheet] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resultSent, setResultSent] = useState(false);

    const isSmallScreen = useIsSmallScreen();

    useEffect(() => {
        async function autoLoad() {
            setLoading(true);
            setError(null);
            try {
                const examYaml = await fetchYamlFile('/beta_exam.yaml');
                const answersYaml = await fetchYamlFile('/answers.yaml');
                const exam = parseYamlExam(examYaml);
                const answerKey = parseYamlAnswerKey(answersYaml);
                setExamData(exam);
                setAnswerKey(answerKey);
                setAnswers(Array(exam.questions.length).fill(null));
                setCurrent(0);
                setShowSheet(false);
                setResultSent(false);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('Failed to load exam');
                }
            }
            setLoading(false);
        }
        autoLoad();
    }, []);

    function selectAnswer(letter: string) {
        setAnswers(a => {
            const next = [...a];
            next[current] = letter;
            return next;
        });
    }

    async function handleFinish() {
        if (!examData || !answerKey) return;
        setShowSheet(true);

        if (!resultSent) {
            const correctMap: Record<number, string> = {};
            answerKey.answers.forEach(a => { correctMap[a.id] = a.correct; });
            const total = examData.questions.length;
            const right = examData.questions.reduce((sum, q, idx) => (
                answers[idx] === correctMap[q.id] ? sum + 1 : sum
            ), 0);
            const percent = Math.round((right / total) * 100);

            try {
                await fetch('/api/save-exam', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ percent }),
                });
                setResultSent(true);
            } catch {}
        }
    }

    function nextQuestion() {
        if (!examData) return;
        if (current < examData.questions.length - 1) setCurrent(c => c + 1);
        else handleFinish();
    }

    if (loading && (!examData || !answerKey)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-green-900 via-black to-black text-white">
                <h2 className="text-2xl font-bold mb-2">Loading Exam & Answer Key...</h2>
            </div>
        );
    }

    if (error && (!examData || !answerKey)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-radial from-green-900 via-black to-black text-white">
                <h2 className="text-2xl font-bold mb-2">Error Loading Exam</h2>
                <div className="text-red-400 mt-5">{error}</div>
                <p className="mt-8">
                    It will fetch <code>/beta_exam.yaml</code> and <code>/answers.yaml</code> from your public folder.
                </p>
            </div>
        );
    }

    if (!examData || !answerKey) return null;

    if (showSheet) {
        return <ResultSheet
            examData={examData}
            answerKey={answerKey}
            answers={answers}
            isSmallScreen={isSmallScreen}
        />;
    }

    const q = examData.questions[current];

    return (
        <main className="font-sans bg-gradient-radial from-green-900 via-black to-black min-h-screen text-white">
            {/* Download button for small screens */}
            {!isSmallScreen && (
                <div className="fixed top-6 left-6 z-10">
                    <DownloadButton />
                </div>
            )}
            {isSmallScreen && (
                <div className="fixed top-5 left-4 z-20">
                    <DownloadFab />
                </div>
            )}
            {/* Logo only on medium and up */}
            {!isSmallScreen && (
                <img
                    src="/Logo.png"
                    alt="Logo"
                    className="fixed top-4 right-8 z-10 h-12 w-auto object-contain"
                />
            )}
            <div className="flex flex-col items-center justify-center min-h-screen px-2">
                <div className="text-center mb-6">
                    <div className="font-bold text-3xl sm:text-4xl">{examData.title}</div>
                    <div className="text-gray-300 text-lg sm:text-xl">{examData.subtitle}</div>
                </div>
                <div className="mb-6 w-full max-w-2xl bg-black/60 rounded-lg p-6 shadow-xl">
                    <div className="text-lg sm:text-xl mb-4 font-semibold">
                        <span>{current + 1}. {q.statement}</span>
                    </div>
                    <div className="space-y-2">
                        {ALT_LETTERS.filter(l => q.alternatives[l]).map((letter) =>
                            <label
                                key={letter}
                                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                                    answers[current] === letter
                                        ? "bg-green-800/40 border-2 border-green-300"
                                        : "hover:bg-green-950/40"
                                }`}
                            >
                                <input
                                    type="radio"
                                    checked={answers[current] === letter}
                                    onChange={() => selectAnswer(letter)}
                                    className="w-5 h-5 mr-3 accent-green-400"
                                />
                                <span className="font-bold text-gray-300 mr-3 text-lg">{letter}</span>
                                <span className="text-white text-base">{q.alternatives[letter]}</span>
                            </label>
                        )}
                    </div>
                </div>
                <button
                    disabled={answers[current] == null}
                    onClick={nextQuestion}
                    className={`px-8 py-3 text-xl font-bold rounded-lg mt-2 transition-all ${
                        answers[current] == null
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-green-400 text-black hover:bg-green-300"
                    }`}
                >
                    {current < examData.questions.length - 1 ? "Next Question" : "Finish & View Result"}
                </button>
                <div className="h-8" />
                <div className="w-full max-w-md mt-6">
                    <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="bg-green-300 h-full rounded-full transition-all duration-300"
                            style={{ width: `${((current + 1) / examData.questions.length) * 100}%` }}
                        />
                    </div>
                    <div className="text-gray-400 text-center text-sm mt-1">
                        Question {current + 1} / {examData.questions.length}
                    </div>
                </div>
            </div>
        </main>
    );
}

// Download button for medium+ screens, full button with text
function DownloadButton() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/EXAM-BETA-001.pdf';
        link.download = 'EXAM-BETA-001.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2 bg-green-500 text-black font-bold rounded-lg shadow-lg hover:bg-green-400 transition-all text-lg"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6"/>
            </svg>
            Download PDF
        </button>
    );
}

// Floating Action Button for download, icon only, mobile only
function DownloadFab() {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/EXAM-BETA-001.pdf';
        link.download = 'EXAM-BETA-001.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            onClick={handleDownload}
            aria-label="Download PDF"
            className="w-12 h-12 bg-green-500 rounded-full shadow-lg flex items-center justify-center hover:bg-green-400 active:bg-green-600 transition-all focus:outline-none"
        >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-6-6m6 6l6-6"/>
            </svg>
        </button>
    );
}

function BackButton() {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-5 py-2 bg-gray-900/70 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transition-all text-lg"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
        </button>
    );
}

function ResultSheet({
                         examData,
                         answerKey,
                         answers,
                         isSmallScreen
                     }: {
    examData: ExamData,
    answerKey: AnswerKeyData,
    answers: (string | null)[],
    isSmallScreen: boolean
}) {
    const correctMap: Record<number, string> = {};
    answerKey.answers.forEach(a => { correctMap[a.id] = a.correct; });

    const total = examData.questions.length;
    const right = examData.questions.reduce((sum, q, idx) => (
        answers[idx] === correctMap[q.id] ? sum + 1 : sum
    ), 0);
    const percent = Math.round((right / total) * 100);

    return (
        <div className="font-sans bg-gradient-radial from-green-900 via-black to-black min-h-screen text-white relative flex flex-col min-w-0">
            {/* Download button - only show if not small screen */}
            {!isSmallScreen && (
                <div className="absolute top-6 left-6 z-20">
                    <DownloadButton />
                </div>
            )}
            {/* Download button - only show on small screen */}
            {isSmallScreen && (
                <div className="fixed top-5 left-4 z-20">
                    <DownloadFab />
                </div>
            )}
            {/* Logo only on medium and up */}
            {!isSmallScreen && (
                <img
                    src="/Logo.png"
                    alt="Logo"
                    className="fixed top-4 right-8 h-12 w-auto object-contain z-10"
                />
            )}
            <div className="absolute top-6 right-6 z-20">
                <BackButton />
            </div>
            <div className="flex flex-col md:flex-row w-full min-h-screen">
                {/* Left: Summary and user answers */}
                <div className="flex flex-col md:w-1/4 w-full md:items-end items-center p-6 pt-24 md:pt-20">
                    <div className="text-center md:text-right">
                        <div className="font-bold text-3xl mb-1">{examData.title}</div>
                        <div className="text-gray-400 text-xl mb-3">{examData.subtitle}</div>
                        <div className="mt-2 text-2xl font-bold text-green-300">
                            {right} out of {total} ({percent}%)
                        </div>
                    </div>
                    <div className="mt-8 w-full max-w-xs mx-auto">
                        <div className="text-lg font-bold mb-2">Your answers:</div>
                        <ol className="list-decimal list-inside text-base text-gray-100 grid grid-cols-3 gap-1">
                            {answers.map((ans, i) => (
                                <li key={i} className="">
                                    {ans ?? <span className="text-red-400">-</span>}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                {/* Center: Beautiful Answer Key */}
                <div className="flex-grow flex items-center justify-center py-8 px-2">
                    <div>
                        <div className="font-bold text-3xl text-center mb-4">Answer Key</div>
                        <div className="bg-black/50 rounded-2xl shadow-2xl p-4 sm:p-8">
                            <div
                                className="
                                    grid gap-4
                                    grid-cols-2
                                    sm:grid-cols-3
                                    md:grid-cols-4
                                    lg:grid-cols-5
                                "
                            >
                                {examData.questions.map((q, idx) => {
                                    const user = answers[idx];
                                    const correct = correctMap[q.id];
                                    return (
                                        <div key={idx} className="flex flex-col items-center text-sm font-mono">
                                            <div className="font-bold text-green-200 text-base mb-1">{idx + 1}</div>
                                            {ALT_LETTERS.filter(l => q.alternatives[l]).map((letter, i) => {
                                                const isCorrect = correct === letter;
                                                const isUser = user === letter;
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`
                                                            flex items-center gap-2 mb-1 group
                                                        `}
                                                    >
                                                        <span className="w-5 inline-block text-center font-bold">{letter}</span>
                                                        <span
                                                            className={`
                                                                border-2 border-gray-600
                                                                rounded-full w-5 h-5 flex items-center justify-center
                                                                mr-2
                                                                transition-colors
                                                                ${isCorrect ? 'border-green-400' : ''}
                                                                ${isUser ? (isCorrect ? 'bg-green-400 border-green-400 text-black' : 'bg-red-400 border-red-400 text-black') : ''}
                                                                group-hover:bg-green-800/60 group-hover:border-green-400
                                                            `}
                                                        >
                                                        </span>
                                                        {isCorrect && (
                                                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                                                            </svg>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/4 w-full"></div>
            </div>
        </div>
    );
}