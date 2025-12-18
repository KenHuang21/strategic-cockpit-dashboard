"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";

export function RefreshButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [cooldown, setCooldown] = useState(false);

    const handleRefresh = async () => {
        if (isLoading || cooldown) return;

        setIsLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/trigger-update", {
                method: "POST",
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("✓ Update started. Data will refresh in ~2 mins.");
                // Start 60-second cooldown
                setCooldown(true);
                setTimeout(() => {
                    setCooldown(false);
                    setMessage("");
                }, 60000); // 60 seconds
            } else {
                setMessage(`✗ Error: ${data.error || "Failed to trigger update"}`);
                setTimeout(() => setMessage(""), 5000);
            }
        } catch (error) {
            console.error("Error triggering refresh:", error);
            setMessage("✗ Network error. Please try again.");
            setTimeout(() => setMessage(""), 5000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-1">
            <button
                onClick={handleRefresh}
                disabled={isLoading || cooldown}
                className={`
          flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
          ${isLoading || cooldown
                        ? "bg-slate-800/50 text-slate-500 cursor-not-allowed"
                        : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 border border-slate-700/50 hover:border-slate-600"
                    }
        `}
                title={cooldown ? "Please wait 60 seconds between refreshes" : "Trigger manual data update"}
            >
                <RotateCw
                    className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                <span>{isLoading ? "Requesting..." : cooldown ? "Cooldown..." : "Refresh"}</span>
            </button>

            {message && (
                <p className={`text-xs ${message.startsWith("✓") ? "text-emerald-400" : "text-red-400"}`}>
                    {message}
                </p>
            )}
        </div>
    );
}
