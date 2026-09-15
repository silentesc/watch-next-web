import { useState, useMemo } from "react";
import { Button } from "../../components/ui/Button";
import { SortBy } from "../../components/ui/SortBy";
import { useSearchParams } from "react-router";
import { getTvSeriesFiltersFromParams, setTvSeriesParamsFromFilters } from "./utils";
import { useDiscoverTvSeries } from "../../hooks/use_discover_tv_series";
import { TvSeriesFilters } from "./ui/TvSeriesFilters";
import { TvSeriesList } from "../../components/ui/TvSeriesList";

export function DiscoverTvSeriesPage() {
    const sortByValues = new Map([
        ["popularity", "Popularity"],
        ["first_air_date", "First Air Date"],
        ["vote_average", "Vote Average"],
        ["vote_count", "Vote Count"],
        ["name", "Name"],
    ]);

    const [queryParams, setQueryParams] = useSearchParams();

    const currentSortBy = queryParams.get("sortBy")?.split(".")[0] || "popularity";
    const isAsc = queryParams.get("sortBy")?.endsWith(".asc") || false;
    const currentFilters = getTvSeriesFiltersFromParams(queryParams);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    // Memoize the filters to ensure stable object reference for queryKey
    const memoizedFilters = useMemo(() => currentFilters, [
        currentFilters.firstAirDateFrom,
        currentFilters.firstAirDateTo,
        currentFilters.runtimeFrom,
        currentFilters.runtimeTo,
        currentFilters.tmdbRatingFrom,
        currentFilters.tmdbRatingTo,
        currentFilters.tmdbVoteCountFrom,
        currentFilters.tmdbVoteCountTo,
        currentFilters.withStatus,
        currentFilters.withGenres,
        currentFilters.withoutGenres,
        currentFilters.originalLanguage,
    ]);

    const discoverTvSeriesInfiniteQuery = useDiscoverTvSeries({
        first_air_date_gte: memoizedFilters.firstAirDateFrom,
        first_air_date_lte: memoizedFilters.firstAirDateTo,
        sort_by: `${currentSortBy}${isAsc ? ".asc" : ".desc"}`,
        vote_average_gte: memoizedFilters.tmdbRatingFrom,
        vote_average_lte: memoizedFilters.tmdbRatingTo,
        vote_count_gte: memoizedFilters.tmdbVoteCountFrom,
        vote_count_lte: memoizedFilters.tmdbVoteCountTo,
        with_genres: memoizedFilters.withGenres,
        with_status: memoizedFilters.withStatus,
        without_genres: memoizedFilters.withoutGenres,
        with_runtime_gte: memoizedFilters.runtimeFrom,
        with_runtime_lte: memoizedFilters.runtimeTo,
        with_original_language: memoizedFilters.originalLanguage,
    });

    const onFiltersChange = (filters: TvSeriesFilters) => {
        setTvSeriesParamsFromFilters(filters, `${currentSortBy}${isAsc ? ".asc" : ".desc"}`, setQueryParams);
        setIsFiltersOpen(false);
    };

    const onSortByChange = (sortBy: string) => {
        setTvSeriesParamsFromFilters(memoizedFilters, `${sortBy}${isAsc ? ".asc" : ".desc"}`, setQueryParams);
    }

    const onAscChange = (isAsc: boolean) => {
        setTvSeriesParamsFromFilters(memoizedFilters, `${currentSortBy}${isAsc ? ".asc" : ".desc"}`, setQueryParams);
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
            <TvSeriesFilters isOpen={isFiltersOpen} filters={memoizedFilters} onFiltersChange={onFiltersChange} onClose={() => setIsFiltersOpen(false)} />

            {/* TV Series */}
            <TvSeriesList infiniteQuery={discoverTvSeriesInfiniteQuery} />
        </>
    );
}
