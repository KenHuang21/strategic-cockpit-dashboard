import { TrendingUp } from "lucide-react";

interface RWAFocusCardProps {
    rwaTvl: number;
    usdtDominance: number;
}

export function RWAFocusCard({ rwaTvl, usdtDominance }: RWAFocusCardProps) {
    return (
        <div className="rounded-lg bg-slate-800/30 p-6 h-full flex flex-col gap-6">
            {/* USDT Dominance - Top */}
            <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">
                    USDT Dominance
                </p>
                <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-bold text-white">
                        {usdtDominance.toFixed(2)}%
                    </p>
                    <TrendingUp className="w-4 h-4 text-slate-500" />
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* RWA Onchain Value - Bottom */}
            <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400 mb-3">
                    RWA Onchain Value
                </p>
                <p className="text-4xl font-bold text-white mb-1">
                    ${(rwaTvl / 1_000_000_000).toFixed(1)}B
                </p>
                <p className="text-xs text-slate-500">129 protocols tracked</p>
            </div>
        </div>
    );
}
