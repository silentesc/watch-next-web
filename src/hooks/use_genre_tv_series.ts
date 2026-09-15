import { useQuery } from "@tanstack/react-query";
import { getTvSeriesGenres } from "../api/genre/tv_series";

export function useGenreTvSeries(language_iso_639_1: string = "en") {
    return useQuery({
        queryKey: ["genreTvSeries", language_iso_639_1],
        queryFn: () => getTvSeriesGenres(language_iso_639_1),
        staleTime: Infinity,
        retry: false,
    });
}
