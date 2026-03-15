import { useState } from "react";
import Button from "../../components/ui/Button";
import { Filters } from "./ui/Filters";
import { SortBy } from "../../components/ui/SortBy";

export function DiscoverPage() {
    const sortByValues = new Map([
        ["popularity", "Popularity"],
        ["revenue", "Revenue"],
        ["primary_release_date", "Release Date"],
        ["vote_average", "Vote Average"],
        ["vote_count", "Vote Count"],
        ["original_title", "Original Title"],
        ["title", "Title"],
    ]);

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const onFiltersChange = (filters: Filters) => {
        setIsFiltersOpen(false);
        console.log(filters);
    };

    const onSortByChange = (sortBy: string) => {
        console.log(sortBy);
    };

    return (
        <>
            {/* Bar */}
            <div className="flex flex-wrap justify-between mb-5">
                <div>
                    <span className="text-4xl">Discover</span>
                </div>
                <div className="flex gap-2 mt-1 sm:mt-0">
                    <SortBy sortByValues={sortByValues} onChange={onSortByChange} alignedRight descDefault />
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
