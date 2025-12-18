import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Format currency with B/T/M suffixes
 */
export function formatCurrency(value: number): string {
    if (value >= 1_000_000_000_000) {
        return `$${(value / 1_000_000_000_000).toFixed(2)}T`
    }
    if (value >= 1_000_000_000) {
        return `$${(value / 1_000_000_000).toFixed(2)}B`
    }
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(2)}M`
    }
    return `$${value.toLocaleString()}`
}

/**
 * Calculate if macro environment is bearish
 */
export function isMacroBearish(us10y: number, usdtDominance: number): boolean {
    return us10y > 4.5 || usdtDominance > 6.5
}
