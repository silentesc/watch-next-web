import { useInfiniteQuery } from "@tanstack/react-query";
import { getSimilarTvSeries } from "../api/tv_series/similar";

export function useSimilarTvSeries(tvSeriesId: number) {
    return useInfiniteQuery({
        queryKey: ["similarTvSeries", tvSeriesId],
        queryFn: ({ pageParam }) => getSimilarTvSeries(tvSeriesId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}
