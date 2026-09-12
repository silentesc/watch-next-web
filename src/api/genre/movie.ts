import { api } from "../client";
import { error2userMessage } from "../errors";
import type { Genre } from "../models";


export interface MovieGenresResponse {
    genres: Array<Genre>;
}


export async function getMovieGenres(language_iso_639_1: string): Promise<MovieGenresResponse> {
    try {
        const response = await api.get<MovieGenresResponse>("/genre/movie/list", { params: { "language": language_iso_639_1 } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
