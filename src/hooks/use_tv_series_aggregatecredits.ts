import { useQuery } from "@tanstack/react-query";
import { getTvSeriesAggregateCredits } from "../api/tv_series/aggregate_credits";

export function useTvSeriesAggregateCredits(seriesId: number) {
    return useQuery({
        queryKey: ["tvSeriesAggregateCreditsQuery", seriesId],
        queryFn: () => getTvSeriesAggregateCredits(seriesId),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: !!seriesId
    });
}
