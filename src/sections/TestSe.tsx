import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const COLORS = ["#FF4C4C", "#FFA500", "#FFD700", "#4CAF50"];

const LABELS = {
    M1: "0% to 25%",
    M2: "25%+ to 50%",
    M3: "50%+ to 75%",
    M4: "75% to 100%"
};

type DataType = {
    name: string;
    value: number;
};

export default function MakeTestExam() {
    const [data, setData] = useState<DataType[]>([]);
    const [avg, setAvg] = useState<number>(0);
    const [totalTests, setTotalTests] = useState<number>(0);

    useEffect(() => {
        fetch("/results.json")
            .then((res) => res.json())
            .then((results) => {
                const chartData: DataType[] = Object.entries(results).map(
                    ([key, value]) => ({
                        name: key,
                        value: Number(value)
                    })
                );
                setData(chartData);

                const total = chartData.reduce((sum, curr) => sum + curr.value, 0);
                setTotalTests(total);

                const weightedSum =
                    chartData[0]?.value * 0.125 +
                    chartData[1]?.value * 0.375 +
                    chartData[2]?.value * 0.625 +
                    chartData[3]?.value * 0.875;

                setAvg(total > 0 ? (weightedSum / total) * 100 : 0);
            });

        gsap.to(".parallax", {
            y: -50,
            scrollTrigger: {
                trigger: ".parallax",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });
    }, []);

    // Function to handle button click and redirect to /exam
    const handleReadyClick = () => {
        window.location.href = "/exam";
    };

    return (
        <motion.div
            id="test-se"
            className="min-h-screen flex flex-col md:flex-row items-center justify-around p-4 sm:p-8 md:p-10 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Left Side */}
            <div className="w-full max-w-lg z-20 parallax flex flex-col items-center md:items-start">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-center md:text-left">
                    Make a Test Exam <br />
                    <span className="text-lg sm:text-2xl font-bold">It&apos;s free</span>
                </h1>
                <p className="mt-4 sm:mt-6 text-sm font-semibold">60 Minutes - 10 Questions</p>
                <div className="h-4 sm:h-6 bg-red-600 rounded-full w-full mt-2" />
                <button
                    className="mt-6 sm:mt-8 bg-red-600 px-6 sm:px-10 py-3 sm:py-5 rounded-md font-bold text-lg sm:text-xl hover:bg-red-700 transition"
                    onClick={handleReadyClick}
                >
                    I&apos;m Ready!
                </button>
                {/* Chart + Legend for mobile, hidden on md+ */}
                <div className="flex flex-col items-center w-full mt-10 md:hidden">
                    <motion.div
                        className="flex flex-col items-center w-full"
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-base sm:text-lg font-semibold text-black-300">Statistics</h2>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Exam Results</h3>
                        <div
                            className="mb-4 text-lg sm:text-xl font-thin"
                            style={{
                                color: "#fff",
                                textShadow: "0 1px 12px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.10)"
                            }}
                        >
                            Tests taken: {totalTests}
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                            {/* Pie Chart */}
                            <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] flex items-center justify-center mx-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data}
                                            dataKey="value"
                                            innerRadius={60}
                                            outerRadius={90}
                                            paddingAngle={4}
                                        >
                                            {data.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <p className="text-xl sm:text-3xl font-bold">{avg.toFixed(1)}%</p>
                                    <p className="text-xs sm:text-sm">Average range</p>
                                </div>
                            </div>
                            {/* Legend */}
                            <ul className="mt-6 text-xs sm:text-sm text-center">
                                {data.map((entry, index) => (
                                    <li key={index} className="flex items-center justify-center mb-2">
                                        <span
                                            className="inline-block w-3 h-3 rounded-full mr-2"
                                            style={{ backgroundColor: COLORS[index] }}
                                        ></span>
                                        {entry.name} — {LABELS[entry.name as keyof typeof LABELS]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side for md+ */}
            <motion.div
                className="w-full max-w-xl mt-10 md:mt-0 z-20 parallax flex-col items-center hidden md:flex"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-base sm:text-lg font-semibold text-black-300">Statistics</h2>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Exam Results</h3>
                <div
                    className="mb-4 text-lg sm:text-xl font-thin"
                    style={{
                        color: "#fff",
                        textShadow: "0 1px 12px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.10)"
                    }}
                >
                    Tests taken: {totalTests}
                </div>
                <div className="flex flex-col-reverse items-center justify-center sm:flex-row sm:items-center sm:justify-center w-full">
                    {/* Legend */}
                    <ul className="sm:ml-8 mt-6 sm:mt-0 text-xs sm:text-sm text-center sm:text-left">
                        {data.map((entry, index) => (
                            <li key={index} className="flex items-center justify-center sm:justify-start mb-2">
                                <span
                                    className="inline-block w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: COLORS[index] }}
                                ></span>
                                {entry.name} — {LABELS[entry.name as keyof typeof LABELS]}
                            </li>
                        ))}
                    </ul>
                    {/* Pie Chart */}
                    <div className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] flex items-center justify-center mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="value"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={4}
                                >
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <p className="text-xl sm:text-3xl font-bold">{avg.toFixed(1)}%</p>
                            <p className="text-xs sm:text-sm">Average range</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}