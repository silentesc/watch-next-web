import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../api/movie/details";

export function useMovieDetails(movieId: number | null) {
    return useQuery({
        queryKey: ["movieDetailsQuery", movieId],
        queryFn: () => getMovieDetails(movieId!),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: movieId !== null,
    });
}
