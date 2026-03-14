import { useEffect, useState } from "react";
import { Dropdown } from "../../../components/ui/Dropdown";
import Button from "../../../components/ui/Button";

interface SortByProps {
    onChange: (sortBy: string) => void;
}

export function SortBy({ onChange }: SortByProps) {
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const sortByValues = new Map([
        ["popularity", "Popularity"],
        ["revenue", "Revenue"],
        ["primary_release_date", "Release Date"],
        ["vote_average", "Vote Average"],
        ["vote_count", "Vote Count"],
        ["original_title", "Original Title"],
        ["title", "Title"],
    ]);

    const [sortBy, setSortBy] = useState("popularity");
    const [isAsc, setIsAsc] = useState(false);

    useEffect(() => {
        if (isInitialLoad) {
            setIsInitialLoad(false);
            return;
        }
        onChange(`${sortBy}${isAsc ? ".asc" : ".desc"}`);
    }, [sortBy, isAsc]);

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
            <Dropdown title={sortByValues.get(sortBy) || sortBy} values={sortByValues} onSelect={value => setSortBy(value)} />
        </div>
    );
}
