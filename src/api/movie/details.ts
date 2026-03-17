import { api } from "../client";
import { error2userMessage } from "../errors";
import type { MovieDetails } from "../models";

export async function search_movie(movie_id: number): Promise<MovieDetails> {
    try {
        const response = await api.get<MovieDetails>(`movie/${movie_id}`);
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
