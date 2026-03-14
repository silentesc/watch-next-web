import { api } from "../client";
import { error2userMessage } from "../errors";
import type { Movie } from "../models";

export interface SearchMovieResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<Movie>;
}

export async function search_movie(query: string, page: number = 1): Promise<SearchMovieResponse> {
    try {
        const response = await api.get<SearchMovieResponse>("/search/movie", { params: { query, page } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
