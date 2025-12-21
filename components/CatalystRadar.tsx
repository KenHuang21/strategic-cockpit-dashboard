'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface CalendarEvent {
    id: string;
    date: string;
    time: string;
    name: string;
    impact: 'High' | 'Medium';
    forecast: string | null;
    actual: string | null;
    previous: string | null;
    status: 'upcoming' | 'completed';
    notification_sent_12h: boolean;
    notification_sent_release: boolean;
}

interface CalendarData {
    updated_at: string;
    events: CalendarEvent[];
}

interface WeekGroup {
    label: string;
    events: CalendarEvent[];
}

export default function CatalystRadar() {
    const [data, setData] = useState<CalendarData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCalendarData();
        // Refresh every 15 minutes
        const interval = setInterval(fetchCalendarData, 15 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchCalendarData = async () => {
        try {
            const response = await fetch('/calendar_data.json');
            const json = await response.json();
            setData(json);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch calendar data:', error);
            setLoading(false);
        }
    };

    const groupEventsByWeek = (events: CalendarEvent[]): WeekGroup[] => {
        const now = new Date();
        const groups: WeekGroup[] = [
            { label: 'This Week', events: [] },
            { label: 'Next Week', events: [] },
            { label: 'Week 3', events: [] },
            { label: 'Week 4', events: [] },
        ];

        events.forEach((event) => {
            const eventDate = new Date(event.date);
            const daysDiff = Math.floor((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff < 7) {
                groups[0].events.push(event);
            } else if (daysDiff < 14) {
                groups[1].events.push(event);
            } else if (daysDiff < 21) {
                groups[2].events.push(event);
            } else if (daysDiff < 28) {
                groups[3].events.push(event);
            }
        });

        return groups.filter((group) => group.events.length > 0);
    };

    const formatDate = (dateStr: string, timeStr: string): string => {
        try {
            // Data from investing.com API is already in SGT timezone (timeZone: 8)
            // No conversion needed - just format for display
            const [hours, minutes] = timeStr.split(':').map(Number);
            const date = new Date(dateStr);
            date.setHours(hours, minutes, 0, 0);

            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const dayName = days[date.getDay()];
            const day = date.getDate();
            const month = months[date.getMonth()];
            const sgtHours = date.getHours().toString().padStart(2, '0');
            const sgtMinutes = date.getMinutes().toString().padStart(2, '0');

            return `${dayName} ${day} ${month}, ${sgtHours}:${sgtMinutes} SGT`;
        } catch {
            return `${dateStr} ${timeStr}`;
        }
    };

    const calculateDeviation = (actual: string | null, forecast: string | null): { value: number; pct: number } | null => {
        if (!actual || !forecast) return null;

        try {
            // Simple parsing - remove K, M, B suffixes and %
            const parseValue = (str: string): number => {
                let val = str.replace(/[,%]/g, '');
                if (val.includes('K')) return parseFloat(val.replace('K', '')) * 1000;
                if (val.includes('M')) return parseFloat(val.replace('M', '')) * 1000000;
                if (val.includes('B')) return parseFloat(val.replace('B', '')) * 1000000000;
                return parseFloat(val);
            };

            const actualVal = parseValue(actual);
            const forecastVal = parseValue(forecast);
            const deviation = actualVal - forecastVal;
            const pct = forecastVal !== 0 ? (deviation / forecastVal) * 100 : 0;

            return { value: deviation, pct };
        } catch {
            return null;
        }
    };

    if (loading) {
        return (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-slate-500">Loading catalyst radar...</div>
                </div>
            </div>
        );
    }

    if (!data || data.events.length === 0) {
        return (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-slate-100">Monthly Radar (+4 Weeks)</h3>
                </div>
                <div className="flex items-center justify-center h-32">
                    <div className="text-slate-500 text-sm">No upcoming events</div>
                </div>
            </div>
        );
    }

    const weekGroups = groupEventsByWeek(data.events);

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-slate-100">Monthly Radar (+4 Weeks)</h3>
                </div>
                <div className="text-xs text-slate-500">
                    Updated: {new Date(data.updated_at).toLocaleString()}
                </div>
            </div>

            {/* Timeline View */}
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {weekGroups.map((group, groupIdx) => (
                    <div key={groupIdx}>
                        {/* Week Label */}
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 sticky top-0 bg-slate-900/90 py-2 backdrop-blur-sm">
                            {group.label}
                        </div>

                        {/* Events */}
                        <div className="space-y-2">
                            {group.events.map((event) => {
                                const deviation = calculateDeviation(event.actual, event.forecast);
                                const isBeat = deviation && deviation.value > 0;
                                const isMiss = deviation && deviation.value < 0;

                                return (
                                    <div
                                        key={event.id}
                                        className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 hover:bg-slate-800/50 transition-colors"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Left: Date & Time */}
                                            <div className="flex-shrink-0 w-32">
                                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{formatDate(event.date, event.time)}</span>
                                                </div>
                                            </div>

                                            {/* Center: Name & Impact */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    {event.impact === 'High' ? (
                                                        <div className="w-2 h-2 rounded-full bg-red-500" title="High Impact" />
                                                    ) : (
                                                        <div className="w-2 h-2 rounded-full bg-yellow-500" title="Medium Impact" />
                                                    )}
                                                    <h4 className="text-sm font-medium text-slate-200 truncate">
                                                        {event.name}
                                                    </h4>
                                                </div>

                                                {/* Right: Data Display */}
                                                <div className="mt-2">
                                                    {event.status === 'completed' && event.actual ? (
                                                        <div className="flex items-center gap-4 text-xs">
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-slate-400">Act:</span>
                                                                <span
                                                                    className={`font-semibold ${isBeat
                                                                        ? 'text-emerald-400'
                                                                        : isMiss
                                                                            ? 'text-red-400'
                                                                            : 'text-slate-300'
                                                                        }`}
                                                                >
                                                                    {event.actual}
                                                                </span>
                                                                {deviation && Math.abs(deviation.pct) > 5 && (
                                                                    <span className="ml-1">
                                                                        {isBeat ? (
                                                                            <TrendingUp className="w-3 h-3 text-emerald-400 inline" />
                                                                        ) : (
                                                                            <TrendingDown className="w-3 h-3 text-red-400 inline" />
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <span className="text-slate-400">Frc:</span>
                                                                <span className="text-slate-300">{event.forecast || 'N/A'}</span>
                                                            </div>
                                                            {deviation && (
                                                                <div className="flex items-center gap-1">
                                                                    <span className="text-slate-400">Dev:</span>
                                                                    <span
                                                                        className={`font-mono ${isBeat ? 'text-emerald-400' : 'text-red-400'
                                                                            }`}
                                                                    >
                                                                        {deviation.pct > 0 ? '+' : ''}
                                                                        {deviation.pct.toFixed(1)}%
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <AlertCircle className="w-3 h-3 text-blue-400" />
                                                            <span className="text-slate-400">Forecast:</span>
                                                            <span className="text-slate-300 font-medium">
                                                                {event.forecast || 'N/A'}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(30 41 59);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(71 85 105);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(100 116 139);
        }
      `}</style>
        </div>
    );
}
