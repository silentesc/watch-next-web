import { useInfiniteQuery } from "@tanstack/react-query";
import { getTrendingTvSeries } from "../api/trending/tv_series";

export function useTrendingTvSeries(timeWindow: "day" | "week") {
    return useInfiniteQuery({
        queryKey: ["trendingTvSeriesInfiniteQuery", timeWindow],
        queryFn: ({ pageParam }) => getTrendingTvSeries(timeWindow, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}
