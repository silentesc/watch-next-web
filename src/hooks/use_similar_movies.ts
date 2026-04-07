import { useInfiniteQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../api/movie/similar";

export function useSimilarMovies(movieId: number) {
    return useInfiniteQuery({
        queryKey: ["similarMovies", movieId],
        queryFn: ({ pageParam }) => getSimilarMovies(movieId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}
