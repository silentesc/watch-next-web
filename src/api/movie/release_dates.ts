import { api } from "../client";
import { error2userMessage } from "../errors";
import type { ReleaseDate } from "../models";

export interface MovieReleaseDatesResponse {
    id: number;
    results: Array<ReleaseDate>;
}

export async function getMovieReleaseDates(movie_id: number): Promise<MovieReleaseDatesResponse> {
    try {
        const response = await api.get<MovieReleaseDatesResponse>(`movie/${movie_id}/release_dates`);
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
