import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../api/movie/recommendations";

export function useMovieRecommendations(movieId: number) {
    return useInfiniteQuery({
        queryKey: ["movieRecommendations", movieId],
        queryFn: ({ pageParam }) => getMovieRecommendations(movieId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}
