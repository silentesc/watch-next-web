import { useEffect, useState } from "react";
import Button from "./Button";
import { Dropdown } from "./Dropdown";

interface SortByProps {
    sortByValues: Map<string, string>;
    onChange: (sortBy: string) => void;
    alignedRight?: boolean;
    descDefault?: boolean;
}

export function SortBy({ sortByValues, onChange, alignedRight = false, descDefault = false }: SortByProps) {
    const [sortBy, setSortBy] = useState(Array.from(sortByValues.keys())[0]);
    const [isAsc, setIsAsc] = useState(!descDefault);

    useEffect(() => {
        onChange(`${sortBy}${isAsc ? ".asc" : ".desc"}`);
    }, [sortBy, isAsc, onChange]);

    return (
        <div className="flex">
            <div className="flex space-x-4">
            </div>

            <Button onClick={() => setIsAsc(!isAsc)} value={
                <svg
                    className={`w-5 h-5 transition-colors duration-200 ${isAsc ? "" : "rotate-180"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v14m0 0l-4-4m4 4l4-4" />
                </svg>
            } />
            <Dropdown title={sortByValues.get(sortBy) || sortBy} values={sortByValues} onSelect={value => setSortBy(value)} alignedRight={alignedRight} />
        </div>
    );
}
