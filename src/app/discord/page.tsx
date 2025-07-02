"use client";

import { useEffect } from "react";

const DiscordRedirect = () => {
    useEffect(() => {
        console.log("Sending webhook to discord...");
        fetch("/api/discord", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ source: "DiscordRedirect" }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Webhook sent successfully!");
                } else {
                    console.log("Failed to send webhook. Status:", response.status);
                }
                return response.json().catch(() => ({}));
            })
            .then((data) => {
                if (data?.error) {
                    console.log("Error sending webhook:", data.error);
                }
            })
            .catch((error) => {
                console.log("Error sending webhook:", error);
            })
            .finally(() => {
                window.location.href = "https://discord.gg/pbbpduZMDu";
            });
    }, []);

    return null;
};

export default DiscordRedirect;
