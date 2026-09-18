import { api } from "../client";
import { error2userMessage } from "../errors";
import type { TvSeasonDetails } from "../models";

export async function getTvSeasonDetails(tvSeriesId: number, seasonNumber: number): Promise<TvSeasonDetails> {
    try {
        const response = await api.get<TvSeasonDetails>(`tv/${tvSeriesId}/season/${seasonNumber}`);
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
