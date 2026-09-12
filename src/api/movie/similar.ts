import { api } from "../client";
import { error2userMessage } from "../errors";
import type { MovieOverview, ReleaseDate } from "../models";

export interface ReleaseDateResult {
    iso_3166_1: string;
    release_dates: Array<ReleaseDate>;
}

export interface SimilarMoviesResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<MovieOverview>;
}

export async function getSimilarMovies(movie_id: number, page?: number, language?: string): Promise<SimilarMoviesResponse> {
    try {
        const response = await api.get<SimilarMoviesResponse>(`movie/${movie_id}/similar`, { params: { page, language } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
