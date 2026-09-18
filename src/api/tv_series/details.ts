import { api } from "../client";
import { error2userMessage } from "../errors";
import type { TvSeriesDetails } from "../models";

export async function getTvSeriesDetails(tvSeriesId: number): Promise<TvSeriesDetails> {
    try {
        const response = await api.get<TvSeriesDetails>(`tv/${tvSeriesId}`);
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
