import { useQuery } from "@tanstack/react-query";
import { getTvSeriesDetails } from "../api/tv_series/details";

export function useTvSeriesDetails(tvSeriesId: number | null) {
    return useQuery({
        queryKey: ["tvSeriesDetailsQuery", tvSeriesId],
        queryFn: () => getTvSeriesDetails(tvSeriesId!),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: tvSeriesId !== null,
    });
}
