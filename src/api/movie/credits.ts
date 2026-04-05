import { api } from "../client";
import { error2userMessage } from "../errors";
import type { Cast, Crew } from "../models";

export interface CreditsResponse {
    id: number;
    cast: Array<Cast>;
    crew: Array<Crew>;
}

export async function getMovieCredits(movie_id: number): Promise<CreditsResponse> {
    try {
        const response = await api.get<CreditsResponse>(`movie/${movie_id}/credits`);
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
