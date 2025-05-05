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
                const weightedSum =
                    chartData[0].value * 0.125 +
                    chartData[1].value * 0.375 +
                    chartData[2].value * 0.625 +
                    chartData[3].value * 0.875;

                setAvg((weightedSum / total) * 100);
            });

        // GSAP parallax effect
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

    return (
        <motion.div
            className="min-h-screen text-white flex flex-col md:flex-row items-center justify-around p-10 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            {/* Left Side */}
            <div className="max-w-lg z-20 parallax">
                <h1 className="text-5xl font-extrabold">
                    Make a Test Exam <br />
                    <span className="text-gray-400 text-2xl font-bold">It’s free</span>
                </h1>
                <p className="mt-6 text-sm font-semibold">60 Minutes - 40 Questions</p>
                <div className="h-6 bg-red-600 rounded-full w-full mt-2" />
                <button className="mt-8 bg-red-600 px-10 py-5 rounded-md text-white font-bold text-xl hover:bg-red-700 transition">
                    I’m Ready!
                </button>
            </div>

            {/* Right Side */}
            <motion.div
                className="mt-10 md:mt-0 z-20 parallax"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <h2 className="text-lg font-semibold text-gray-300">Statistics</h2>
                <h3 className="text-2xl font-bold mb-4">Exam Results</h3>
                <div className="flex flex-col md:flex-row items-center">
                    <ResponsiveContainer width={250} height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={4}
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute text-center text-white ml-20">
                        <p className="text-3xl font-bold">{avg.toFixed(1)}%</p>
                        <p className="text-sm text-gray-400">Average range</p>
                    </div>
                    <ul className="ml-10 text-sm">
                        {data.map((entry, index) => (
                            <li key={index} className="flex items-center mb-2">
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
        </motion.div>
    );
}
