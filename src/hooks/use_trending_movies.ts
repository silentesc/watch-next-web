import { useInfiniteQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "../api/trending/movie";

export function useTrendingMovies(timeWindow: "day" | "week") {
    return useInfiniteQuery({
        queryKey: ["trendingMovieInfiniteQuery", timeWindow],
        queryFn: ({ pageParam }) => getTrendingMovies(timeWindow, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}
