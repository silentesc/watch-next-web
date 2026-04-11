import { useState, useMemo } from "react";
import { Button } from "../../components/ui/Button";
import { MovieFilters } from "./ui/MovieFilters";
import { SortBy } from "../../components/ui/SortBy";
import { MovieList } from "../../components/ui/MovieList";
import { useSearchParams } from "react-router";
import { getFiltersFromParams, setParamsFromFilters } from "./utils";
import { useDiscoverMovies } from "../../hooks/use_discover_movies";

export function DiscoverMoviePage() {
    const sortByValues = new Map([
        ["popularity", "Popularity"],
        ["revenue", "Revenue"],
        ["primary_release_date", "Release Date"],
        ["vote_average", "Vote Average"],
        ["vote_count", "Vote Count"],
        ["title", "Title"],
    ]);

    const [queryParams, setQueryParams] = useSearchParams();

    const currentSortBy = queryParams.get("sortBy")?.split(".")[0] || "popularity";
    const isAsc = queryParams.get("sortBy")?.endsWith(".asc") || false;
    const currentFilters = getFiltersFromParams(queryParams);
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

    const discoverMovieInfiniteQuery = useDiscoverMovies({
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
    });

    const onFiltersChange = (filters: MovieFilters) => {
        setParamsFromFilters(filters, `${currentSortBy}${isAsc ? ".asc" : ".desc"}`, setQueryParams);
        setIsFiltersOpen(false);
    };

    const onSortByChange = (sortBy: string) => {
        setParamsFromFilters(memoizedFilters, `${sortBy}${isAsc ? ".asc" : ".desc"}`, setQueryParams);
    }

    const onAscChange = (isAsc: boolean) => {
        setParamsFromFilters(memoizedFilters, `${currentSortBy}${isAsc ? ".asc" : ".desc"}`, setQueryParams);
    }

    return (
        <>
            {/* Bar */}
            <div className="flex justify-end mb-5">
                <div className="flex gap-2">
                    <SortBy
                        sortByKey={currentSortBy}
                        isAsc={isAsc} sortByValues={sortByValues}
                        onSortByChange={onSortByChange}
                        onAscChange={onAscChange}
                        alignedRight descDefault
                    />
                    <Button value="Filters" onClick={() => setIsFiltersOpen(!isFiltersOpen)} />
                </div>
            </div>

            {/* Filters */}
            <MovieFilters isOpen={isFiltersOpen} filters={memoizedFilters} onFiltersChange={onFiltersChange} onClose={() => setIsFiltersOpen(false)} />

            {/* Movies */}
            <MovieList infiniteQuery={discoverMovieInfiniteQuery} />
        </>
    );
}
