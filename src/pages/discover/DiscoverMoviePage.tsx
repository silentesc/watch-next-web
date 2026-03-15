import { useState } from "react";
import Button from "../../components/ui/Button";
import { Filters } from "./ui/Filters";
import { SortBy } from "../../components/ui/SortBy";
import { useInfiniteQuery } from "@tanstack/react-query";
import { discover_movie } from "../../api/discover/movie";
import { MovieList } from "../../components/ui/MovieList";

export function DiscoverMoviePage() {
    const sortByValues = new Map([
        ["popularity", "Popularity"],
        ["revenue", "Revenue"],
        ["primary_release_date", "Release Date"],
        ["vote_average", "Vote Average"],
        ["vote_count", "Vote Count"],
        ["original_title", "Original Title"],
        ["title", "Title"],
    ]);

    const [currentSortBy, setCurrentSortBy] = useState("popularity.desc");
    const [currentFilters, setCurrentFilters] = useState<Filters>({} as Filters);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const discoverMovieInfiniteQuery = useInfiniteQuery({
        queryKey: ["discoverMovie", currentSortBy, currentFilters],
        queryFn: ({ pageParam }) => discover_movie({
            page: pageParam,
            primary_release_date_gte: currentFilters.releaseDateFrom,
            primary_release_date_lte: currentFilters.releaseDateTo,
            sort_by: currentSortBy,
            vote_average_gte: currentFilters.tmdbRatingFrom,
            vote_average_lte: currentFilters.tmdbRatingTo,
            vote_count_gte: currentFilters.tmdbVoteCountFrom,
            vote_count_lte: currentFilters.tmdbVoteCountTo,
            with_genres: currentFilters.withGenres,
            without_genres: currentFilters.withoutGenres,
            with_runtime_gte: currentFilters.runtimeFrom,
            with_runtime_lte: currentFilters.runtimeTo,
        }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const onFiltersChange = (filters: Filters) => {
        console.log(filters);
        setIsFiltersOpen(false);
        setCurrentFilters(filters);
    };

    const onSortByChange = (sortBy: string) => {
        setCurrentSortBy(sortBy);
    };

    return (
        <>
            {/* Bar */}
            <div className="flex flex-wrap justify-between mb-5">
                <div>
                    <span className="text-2xl">Discover Movies</span>
                </div>
                <div className="flex gap-2 mt-1 sm:mt-0">
                    <SortBy sortByValues={sortByValues} onChange={onSortByChange} alignedRight descDefault />
                    <Button value="Filters" onClick={() => setIsFiltersOpen(!isFiltersOpen)} />
                </div>
            </div>

            {/* Filters */}
            <Filters isOpen={isFiltersOpen} onFiltersChange={onFiltersChange} onClose={() => setIsFiltersOpen(false)} />

            {/* Movies */}
            <MovieList infiniteQuery={discoverMovieInfiniteQuery} />
        </>
    );
}
