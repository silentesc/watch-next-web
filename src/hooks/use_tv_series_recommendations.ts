import { useInfiniteQuery } from "@tanstack/react-query";
import { getTvSeriesRecommendations } from "../api/tv_series/recommendations";

export function useTvSeriesRecommendations(tvSeriesId: number) {
    return useInfiniteQuery({
        queryKey: ["tvSeriesRecommendations", tvSeriesId],
        queryFn: ({ pageParam }) => getTvSeriesRecommendations(tvSeriesId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}
