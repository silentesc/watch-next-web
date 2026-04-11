import { api } from "../client";
import { error2userMessage } from "../errors";
import type { MovieOverview } from "../models";

export interface TrendingMovieResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<MovieOverview>;
}

export async function getTrendingMovies(timeWindow: "day" | "week", page?: number): Promise<TrendingMovieResponse> {
    try {
        const response = await api.get<TrendingMovieResponse>(`/trending/movie/${timeWindow}`, { params: { page } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
