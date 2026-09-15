import { api } from "../client";
import { error2userMessage } from "../errors";
import type { MovieOverview } from "../models";

export interface MovieRecommendationsResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<MovieOverview>;
}

export async function getMovieRecommendations(movie_id: number, page?: number, language?: string): Promise<MovieRecommendationsResponse> {
    try {
        const response = await api.get<MovieRecommendationsResponse>(`movie/${movie_id}/recommendations`, { params: { page, language } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
