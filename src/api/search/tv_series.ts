import { api } from "../client";
import { error2userMessage } from "../errors";
import type { TvSeriesOverview } from "../models";

export interface SearchTvSeriesResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<TvSeriesOverview>;
}

export async function searchTvSeries(query: string, page?: number): Promise<SearchTvSeriesResponse> {
    try {
        const response = await api.get<SearchTvSeriesResponse>("/search/tv", { params: { query, page } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
