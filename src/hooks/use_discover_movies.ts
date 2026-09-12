import { useInfiniteQuery } from "@tanstack/react-query";
import { discover_movie, type DiscoverMovieRequest } from "../api/discover/movie";

export function useDiscoverMovies(discoverMovieRequest: DiscoverMovieRequest) {
    return useInfiniteQuery({
        queryKey: ["discoverMovieInfiniteQuery", discoverMovieRequest],
        queryFn: ({ pageParam }) => discover_movie({
            page: pageParam,
            primary_release_date_gte: discoverMovieRequest.primary_release_date_gte,
            primary_release_date_lte: discoverMovieRequest.primary_release_date_lte,
            sort_by: discoverMovieRequest.sort_by,
            vote_average_gte: discoverMovieRequest.vote_average_gte,
            vote_average_lte: discoverMovieRequest.vote_average_lte,
            vote_count_gte: discoverMovieRequest.vote_count_gte,
            vote_count_lte: discoverMovieRequest.vote_count_lte,
            with_genres: discoverMovieRequest.with_genres,
            without_genres: discoverMovieRequest.without_genres,
            with_runtime_gte: discoverMovieRequest.with_runtime_gte,
            with_runtime_lte: discoverMovieRequest.with_runtime_lte,
            with_original_language: discoverMovieRequest.with_original_language,
        }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });
}
