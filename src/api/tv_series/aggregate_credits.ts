import { api } from "../client";
import { error2userMessage } from "../errors";
import type { AggregateCast, AggregateCrew } from "../models";

export interface CreditsResponse {
    id: number;
    cast: Array<AggregateCast>;
    crew: Array<AggregateCrew>;
}

export async function getTvSeriesAggregateCredits(seriesId: number): Promise<CreditsResponse> {
    try {
        const response = await api.get<CreditsResponse>(`tv/${seriesId}/aggregate_credits`);
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
