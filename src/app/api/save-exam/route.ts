import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Results = {
    M1: number;
    M2: number;
    M3: number;
    M4: number;
};

function classify(percent: number): keyof Results {
    if (percent <= 25) return "M1";
    if (percent <= 50) return "M2";
    if (percent <= 75) return "M3";
    return "M4";
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const percent = Number(body.percent);

        if (isNaN(percent) || percent < 0 || percent > 100) {
            return NextResponse.json({ error: "Invalid percent" }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), "public", "results.json");
        let data: Results = { M1: 0, M2: 0, M3: 0, M4: 0 };

        try {
            const file = await fs.readFile(filePath, "utf8");
            data = JSON.parse(file) as Results;
        } catch (e: unknown) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (e.code !== "ENOENT") {
                return NextResponse.json({ error: "Failed to read results file" }, { status: 500 });
            }
        }

        const key = classify(percent);
        data[key] += 1;

        try {
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e: unknown) {
            return NextResponse.json({ error: "Failed to write results file" }, { status: 500 });
        }

        return NextResponse.json({ ok: true, data });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
