export async function POST(request: Request) {
    const body = await request.json();
    const { source } = body;

    if (source !== "DiscordRedirect") {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
            status: 403,
            headers: { "Content-Type": "application/json" },
        });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        return new Response(JSON.stringify({ error: "Webhook URL not configured" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: "Someone accessed DiscordRedirect!",
            }),
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch {
        return new Response(JSON.stringify({ error: "Failed to send webhook" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}