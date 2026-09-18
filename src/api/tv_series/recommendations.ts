import { api } from "../client";
import { error2userMessage } from "../errors";
import type { TvSeriesOverview } from "../models";

export interface TvSeriesRecommendationsResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<TvSeriesOverview>;
}

export async function getTvSeriesRecommendations(tvSeriesId: number, page?: number, language?: string): Promise<TvSeriesRecommendationsResponse> {
    try {
        const response = await api.get<TvSeriesRecommendationsResponse>(`tv/${tvSeriesId}/recommendations`, { params: { page, language } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
