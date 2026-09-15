import { useQuery } from "@tanstack/react-query";
import { getTvSeasonDetails } from "../api/tv_shows/details";

export function useTvSeasonDetails(tvSeriesId: number | null, seasonNumber: number | null) {
    return useQuery({
        queryKey: ["tvSeasonDetailsQuery", tvSeriesId, seasonNumber],
        queryFn: () => getTvSeasonDetails(tvSeriesId!, seasonNumber!),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: tvSeriesId !== null && seasonNumber !== null,
    });
}
