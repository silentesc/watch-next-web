import { useQuery } from "@tanstack/react-query";
import { getMovieGenres } from "../api/genre/movie";

export function useGenreMovie(language_iso_639_1: string = "en") {
    return useQuery({
        queryKey: ["genreMovie", language_iso_639_1],
        queryFn: () => getMovieGenres(language_iso_639_1),
        staleTime: Infinity,
        retry: false,
    });
}
