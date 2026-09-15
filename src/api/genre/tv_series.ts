import { api } from "../client";
import { error2userMessage } from "../errors";
import type { Genre } from "../models";


export interface TvSeriesGenresResponse {
    genres: Array<Genre>;
}


export async function getTvSeriesGenres(language_iso_639_1: string): Promise<TvSeriesGenresResponse> {
    try {
        const response = await api.get<TvSeriesGenresResponse>("/genre/tv/list", { params: { "language": language_iso_639_1 } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
