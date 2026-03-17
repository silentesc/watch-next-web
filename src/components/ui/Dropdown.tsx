import { useState, useRef, useEffect, type JSX, useCallback, useMemo } from "react";
import Button from "./Button";

interface DropdownProps {
    title: string | React.ReactElement | JSX.Element | JSX.Element[];
    values: Map<string, string>;
    onSelect: (value: string) => void;
    alignedRight?: boolean;
}

export function Dropdown({ title, values, onSelect, alignedRight = false }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const onValueElementClick = (key: string) => {
        onSelect(key);
        setIsOpen(false);
    }

    const valueElements = useMemo(() =>
        Array.from(values.entries()).map(([key, value]) =>
            <p key={key} className="block w-full px-4 py-2 text-md text-left transition-colors cursor-pointer hover:bg-background-tertiary" onClick={() => onValueElementClick(key)}>{value}</p>
        ), [values]);

    // Close dropdown when clicking outside
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, handleClickOutside]);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            {/* Trigger Button */}
            <div>
                <Button
                    value={
                        (
                            <>
                                <div className="flex justify-between items-center">
                                    {
                                        typeof title === "string" ? (
                                            <span className="whitespace-nowrap">{title}</span>
                                        ) : (
                                            title
                                        )
                                    }
                                    <svg className={`w-5 h-5 ml-2 -mr-1  ${isOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </>
                        )
                    }
                    onClick={toggleDropdown}
                />
            </div>

            {/* Dropdown Menu */}
            {
                isOpen && (
                    <div className={`${alignedRight && "right-0"} z-1000 absolute w-56 max-h-100 overflow-scroll mt-2 origin-top-right bg-background-secondary border border-background-tertiary divide-y divide-background-tertiary rounded-md shadow-lg outline-none`}>
                        <>
                            {valueElements}
                        </>
                    </div>
                )
            }
        </div >
    );
}
