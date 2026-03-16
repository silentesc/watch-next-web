import { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Input from "./Input";

interface DatePickerProps {
    defaultValue?: string;
    placeholder?: string;
    onChange: (date: Date | undefined) => void;
    alignedRight?: boolean;
    handleRelative?: boolean;
    topClassName?: string;
}

export interface DatePickerHandle {
    reset: () => void;
}

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function formatDate(year: number, month: number, day: number) {
    return `${year}-${(month + 1).toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

function parseIsoDate(value: string) {
    if (!ISO_DATE_REGEX.test(value)) return null;
    const [yearStr, monthStr, dayStr] = value.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr) - 1;
    const day = Number(dayStr);
    const date = new Date(year, month, day);
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month ||
        date.getDate() !== day
    ) {
        return null;
    }
    return date;
}

function isValidIsoDate(value: string) {
    return parseIsoDate(value) !== null;
}

export const DatePicker = forwardRef<DatePickerHandle, DatePickerProps>(
    ({ defaultValue = "", placeholder = "", onChange, alignedRight = false, handleRelative = true, topClassName = "top-12" }, ref) => {
        const datePickerRef = useRef<HTMLDivElement>(null);

        const [value, setValue] = useState(defaultValue);
        const [isOpen, setIsOpen] = useState(false);
        const [viewDate, setViewDate] = useState(() => {
            const parsed = parseIsoDate(defaultValue);
            return parsed ?? new Date();
        });

        useImperativeHandle(ref, () => ({
            reset: () => handleClear(),
        }));

        const today = useMemo(() => {
            const now = new Date();
            return formatDate(now.getFullYear(), now.getMonth(), now.getDate());
        }, []);

        const selectedDate = useMemo(() => {
            const parsed = parseIsoDate(value);
            return parsed ? formatDate(parsed.getFullYear(), parsed.getMonth(), parsed.getDate()) : null;
        }, [value]);

        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const firstDayMondayStart = (firstDay + 6) % 7;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const calendarDays = Array.from({ length: 42 }, (_, i) => {
            const day = i - firstDayMondayStart + 1;
            return day > 0 && day <= daysInMonth ? day : null;
        });

        const commitValue = (newValue: string) => {
            setValue(newValue);
            if (isValidIsoDate(newValue)) {
                onChange(parseIsoDate(newValue) || undefined);
            }
        };

        const handleDatePicked = (day: number) => {
            const dateStr = formatDate(year, month, day);
            commitValue(dateStr);
            setViewDate(new Date(year, month, day));
            setIsOpen(false);
        };

        const handleClear = () => {
            setValue("");
            onChange(undefined);
        };

        const handleSelectToday = () => {
            const parsed = parseIsoDate(today);
            if (!parsed) return;
            setViewDate(parsed);
            commitValue(today);
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;
            setValue(newValue);
            if (isValidIsoDate(newValue)) {
                onChange(parseIsoDate(newValue) || undefined);
            }
        };

        const handleInputBlur = () => {
            if (isValidIsoDate(value)) {
                const parsed = parseIsoDate(value);
                if (parsed) {
                    setViewDate(parsed);
                }
            }
        };

        const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && isValidIsoDate(value)) {
                const parsed = parseIsoDate(value);
                if (parsed) {
                    setViewDate(parsed);
                }
            }
        };

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            };
            if (isOpen) document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, [isOpen]);

        return (
            <div className={`${handleRelative && "relative"} w-full`} ref={datePickerRef}>
                <Input
                    value={value}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    onClick={() => setIsOpen((prev) => !prev)}
                    placeholder={placeholder}
                />

                {isOpen && (
                    <div className={`absolute ${topClassName} z-20 w-full min-w-70 max-w-120 bg-background-secondary border-2 border-background-tertiary p-3 shadow-xl ${alignedRight && "right-0"}`}>
                        <div className="flex justify-between items-center mb-3">
                            <div className="flex gap-2">
                                <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="rounded p-1 hover:bg-background-tertiary" type="button">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="rounded p-1 hover:bg-background-tertiary" type="button">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                            <span className="font-bold">{viewDate.toLocaleString("default", { month: "long", year: "numeric" })}</span>
                            <div className="flex gap-2">
                                <button onClick={handleSelectToday} className="rounded px-1 py-1 text-xs font-semibold hover:bg-background-tertiary" type="button">Today</button>
                                <button onClick={handleClear} className="rounded px-1 py-1 text-xs font-semibold hover:bg-background-tertiary" type="button">Clear</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs opacity-50 mb-2 font-bold">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d}>{d}</div>)}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((day, i) => {
                                if (!day) return <div key={i} />;
                                const dayStr = formatDate(year, month, day);
                                const isToday = dayStr === today;
                                const isSelected = dayStr === selectedDate;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleDatePicked(day)}
                                        className={`p-1.5 text-sm rounded border hover:bg-background-tertiary ${isSelected && "bg-primary text-white"} ${isToday ? "border-primary" : "border-transparent"}`}
                                        type="button"
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    }
);
