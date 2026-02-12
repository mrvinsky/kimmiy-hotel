'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isWithinInterval,
    parseISO,
    startOfDay,
    isBefore,
    isAfter
} from 'date-fns';
import { srLatn, zhCN, enUS } from 'date-fns/locale';

interface CalendarProps {
    bookedDates: { from: string; to: string }[];
    onSelectRange: (start: Date | null, end: Date | null) => void;
    checkIn: Date | null;
    checkOut: Date | null;
}

export function Calendar({ bookedDates, onSelectRange, checkIn, checkOut }: CalendarProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    const { language, t } = useLanguage();

    const getLocale = () => {
        switch (language) {
            case 'SR': return srLatn;
            case 'ZH': return zhCN;
            default: return enUS;
        }
    };

    const locale = getLocale();

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Grid alignment (European standard: Monday start? Or International Sunday?)
    // Let's adapt dynamically or stick to Sunday for standard ease
    const startDay = monthStart.getDay();
    const emptyDays = Array.from({ length: startDay });

    const isDateBooked = (date: Date) => {
        return bookedDates.some(booking => {
            // "to" date in booking is usually check-out day, which IS available for check-in
            // so we should consider [from, to) interval logic or just block full days
            // Let's block full days for simplicity first, or refine:
            // If booking is 10-12, 10 is booked, 11 is booked, 12 is checkout (available for checkin)

            const start = startOfDay(parseISO(booking.from));
            const end = startOfDay(parseISO(booking.to));

            // Check if date is within [start, end)
            // But date-fns isWithinInterval is inclusive [start, end]
            // We want to allow check-in on checkout day. 
            // So date is booked if: date >= start AND date < end

            return (isSameDay(date, start) || isAfter(date, start)) && isBefore(date, end);
        });
    };

    const isDateDisabled = (date: Date) => {
        return isBefore(date, startOfDay(new Date()));
    };

    const handleDateClick = (date: Date) => {
        if (isDateDisabled(date) || isDateBooked(date)) return;

        if (!checkIn || (checkIn && checkOut)) {
            onSelectRange(date, null);
        } else {
            // Completing selection
            if (isBefore(date, checkIn)) {
                onSelectRange(date, null);
            } else {
                // Check for overlap
                const range = eachDayOfInterval({ start: checkIn, end: date });
                // We can allow the LAST day to be a check-in day of another booking? 
                // No, if I book 10-15, and 12-13 is booked, that's invalid.
                const hasOverlap = range.some(d => isDateBooked(d));

                if (hasOverlap) {
                    alert(t.booking?.unavailable || "Selected dates are not available");
                    return;
                }

                onSelectRange(checkIn, date);
            }
        }
    };

    // Check if a date is within the currently selected range
    const isInRange = (date: Date) => {
        if (checkIn && checkOut) {
            // For visualization, exclude the checkout date from the "solid" range? 
            // Or keep inclusive. Conventionally inclusive highlight looks better.
            return isWithinInterval(date, { start: checkIn, end: checkOut });
        }
        return false;
    };

    return (
        <div className="p-6 bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-100 dark:border-zinc-700 shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={(e) => { e.preventDefault(); setCurrentMonth(subMonths(currentMonth, 1)); }}
                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition-colors"
                >
                    <ChevronLeft size={20} className="text-zinc-600 dark:text-zinc-300" />
                </button>
                <h3 className="text-xl font-playfair font-bold text-zinc-900 dark:text-white capitalize">
                    {format(currentMonth, 'MMMM yyyy', { locale })}
                </h3>
                <button
                    onClick={(e) => { e.preventDefault(); setCurrentMonth(addMonths(currentMonth, 1)); }}
                    className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition-colors"
                >
                    <ChevronRight size={20} className="text-zinc-600 dark:text-zinc-300" />
                </button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-y-4 gap-x-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="h-8 flex items-center justify-center text-xs font-bold text-zinc-400 uppercase tracking-wider">
                        {day}
                    </div>
                ))}

                {emptyDays.map((_, i) => <div key={`empty-${i}`} />)}

                {daysInMonth.map((date) => {
                    const isBooked = isDateBooked(date);
                    const isDisabled = isDateDisabled(date);

                    const isCheckIn = checkIn && isSameDay(date, checkIn);
                    const isCheckOut = checkOut && isSameDay(date, checkOut);
                    const isSelected = isCheckIn || isCheckOut;
                    const inRange = isInRange(date);

                    return (
                        <button
                            key={date.toString()}
                            onClick={(e) => { e.preventDefault(); handleDateClick(date); }}
                            disabled={isDisabled || isBooked}
                            className={`
                                h-10 w-full rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all relative
                                ${isDisabled ? 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed' : ''}
                                ${!isDisabled && !isBooked && !isSelected && !inRange ? 'hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300' : ''}
                                ${isBooked ? 'text-zinc-300 dark:text-zinc-600 cursor-not-allowed opacity-50 decoration-zinc-300 line-through' : ''}
                                ${inRange && !isSelected ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300' : ''}
                                ${isSelected ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-md transform scale-105 z-10' : ''}
                            `}
                        >
                            {format(date, 'd')}
                            {isBooked && !isDisabled && <span className="w-1 h-1 bg-red-400 rounded-full mt-1"></span>}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-700 flex items-center justify-center gap-6 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white"></div>
                    <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400 opacity-50"></div>
                    <span>Booked</span>
                </div>
            </div>
        </div>
    );
}
