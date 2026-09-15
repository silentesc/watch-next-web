import { useInfiniteQuery } from "@tanstack/react-query";
import { discoverTvSeries, type DiscoverTvSeriesRequest } from "../api/discover/tv_series";

export function useDiscoverTvSeries(discoverTvSeriesRequest: DiscoverTvSeriesRequest) {
    return useInfiniteQuery({
        queryKey: ["discoverTvSeriesInfiniteQuery", discoverTvSeriesRequest],
        queryFn: ({ pageParam }) => discoverTvSeries({
            page: pageParam,
            first_air_date_gte: discoverTvSeriesRequest.first_air_date_gte,
            first_air_date_lte: discoverTvSeriesRequest.first_air_date_lte,
            sort_by: discoverTvSeriesRequest.sort_by,
            vote_average_gte: discoverTvSeriesRequest.vote_average_gte,
            vote_average_lte: discoverTvSeriesRequest.vote_average_lte,
            vote_count_gte: discoverTvSeriesRequest.vote_count_gte,
            vote_count_lte: discoverTvSeriesRequest.vote_count_lte,
            with_status: discoverTvSeriesRequest.with_status,
            with_genres: discoverTvSeriesRequest.with_genres,
            without_genres: discoverTvSeriesRequest.without_genres,
            with_runtime_gte: discoverTvSeriesRequest.with_runtime_gte,
            with_runtime_lte: discoverTvSeriesRequest.with_runtime_lte,
            with_original_language: discoverTvSeriesRequest.with_original_language,
        }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}
