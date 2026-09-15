import { api } from "../client";
import { error2userMessage } from "../errors";
import type { TvSeriesOverview } from "../models";

export interface SimilarTvSeriesResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<TvSeriesOverview>;
}

export async function getSimilarTvSeries(tvSeriesId: number, page?: number, language?: string): Promise<SimilarTvSeriesResponse> {
    try {
        const response = await api.get<SimilarTvSeriesResponse>(`tv/${tvSeriesId}/similar`, { params: { page, language } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
