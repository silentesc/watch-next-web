import { useState, useMemo } from "react";
import { Button } from "../../components/ui/Button";
import { MovieFilters } from "./ui/MovieFilters";
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
        ["title", "Title"],
    ]);

    const [currentSortBy, setCurrentSortBy] = useState("popularity");
    const [isAsc, setIsAsc] = useState(false);
    const [currentFilters, setCurrentFilters] = useState<MovieFilters>({} as MovieFilters);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    // Memoize the filters to ensure stable object reference for queryKey
    const memoizedFilters = useMemo(() => currentFilters, [
        currentFilters.releaseDateFrom,
        currentFilters.releaseDateTo,
        currentFilters.runtimeFrom,
        currentFilters.runtimeTo,
        currentFilters.tmdbRatingFrom,
        currentFilters.tmdbRatingTo,
        currentFilters.tmdbVoteCountFrom,
        currentFilters.tmdbVoteCountTo,
        currentFilters.withGenres,
        currentFilters.withoutGenres,
        currentFilters.originalLanguage,
    ]);

    const discoverMovieInfiniteQuery = useInfiniteQuery({
        queryKey: ["discoverMovie", currentSortBy, isAsc, memoizedFilters],
        queryFn: ({ pageParam }) => discover_movie({
            page: pageParam,
            primary_release_date_gte: memoizedFilters.releaseDateFrom,
            primary_release_date_lte: memoizedFilters.releaseDateTo,
            sort_by: `${currentSortBy}${isAsc ? ".asc" : ".desc"}`,
            vote_average_gte: memoizedFilters.tmdbRatingFrom,
            vote_average_lte: memoizedFilters.tmdbRatingTo,
            vote_count_gte: memoizedFilters.tmdbVoteCountFrom,
            vote_count_lte: memoizedFilters.tmdbVoteCountTo,
            with_genres: memoizedFilters.withGenres,
            without_genres: memoizedFilters.withoutGenres,
            with_runtime_gte: memoizedFilters.runtimeFrom,
            with_runtime_lte: memoizedFilters.runtimeTo,
            with_original_language: memoizedFilters.originalLanguage,
        }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });

    const onFiltersChange = (filters: MovieFilters) => {
        setIsFiltersOpen(false);
        setCurrentFilters(filters);
    };

    return (
        <>
            {/* Bar */}
            <div className="flex justify-end mb-5">
                <div className="flex gap-2">
                    <SortBy
                        sortByKey={currentSortBy}
                        isAsc={isAsc} sortByValues={sortByValues}
                        onSortByChange={sortBy => setCurrentSortBy(sortBy)}
                        onAscChange={isAsc => setIsAsc(isAsc)}
                        alignedRight descDefault
                    />
                    <Button value="Filters" onClick={() => setIsFiltersOpen(!isFiltersOpen)} />
                </div>
            </div>

            {/* Filters */}
            <MovieFilters isOpen={isFiltersOpen} onFiltersChange={onFiltersChange} onClose={() => setIsFiltersOpen(false)} />

            {/* Movies */}
            <MovieList infiniteQuery={discoverMovieInfiniteQuery} />
        </>
    );
}
