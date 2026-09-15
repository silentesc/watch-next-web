import { api } from "../client";
import { error2userMessage } from "../errors";
import type { TvSeriesOverview } from "../models";

export interface TrendingTvSeriesResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<TvSeriesOverview>;
}

export async function getTrendingTvSeries(timeWindow: "day" | "week", page?: number): Promise<TrendingTvSeriesResponse> {
    try {
        const response = await api.get<TrendingTvSeriesResponse>(`/trending/tv/${timeWindow}`, { params: { page } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
