import { useState } from "react";
import Button from "../../components/ui/Button";
import { Dropdown } from "../../components/ui/Dropdown";
import { Filters } from "./ui/Filters";

export function DiscoverPage() {
    const sortByValues = new Map([
        ["original_title.asc", "Original Title Ascending"],
        ["original_title.desc", "Original Title Descending"],
        ["popularity.asc", "Popularity Ascending"],
        ["popularity.desc", "Popularity Descending"],
        ["revenue.asc", "Revenue Ascending"],
        ["revenue.desc", "Revenue Descending"],
        ["primary_release_date.asc", "Release Date Ascending"],
        ["primary_release_date.desc", "Release Date Descending"],
        ["title.asc", "Title Ascending"],
        ["title.desc", "Title Descending"],
        ["vote_average.asc", "Rating Ascending"],
        ["vote_average.desc", "Rating Descending"],
        ["vote_count.asc", "Vote Count Ascending"],
        ["vote_count.desc", "Vote Count Descending"],
    ]);

    const [sortBy, setSortBy] = useState("popularity.desc");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const onFiltersChange = (filters: Filters) => {
        setIsFiltersOpen(false);
        console.log(filters);
    };

    return (
        <>
            {/* Bar */}
            <div className="flex flex-wrap justify-between mb-5">
                <div>
                    <span className="text-4xl">Discover</span>
                </div>
                <div className="flex gap-2 mt-1 sm:mt-0">
                    <Dropdown title={sortByValues.get(sortBy) || sortBy} values={sortByValues} onSelect={value => setSortBy(value)} />
                    <Button value="Filters" onClick={() => setIsFiltersOpen(!isFiltersOpen)} />
                </div>
            </div>

            {/* Content */}
            <h1>Content</h1>

            {/* Filters */}
            <Filters isOpen={isFiltersOpen} onFiltersChange={onFiltersChange} onClose={() => setIsFiltersOpen(false)} />
        </>
    );
}
