import { api } from "../client";
import { error2userMessage } from "../errors";
import type { TvSeriesOverview } from "../models";

export interface DiscoverTvSeriesRequest {
    page?: number;
    first_air_date_gte?: Date;
    first_air_date_lte?: Date;
    sort_by?: string;
    vote_average_gte?: number;
    vote_average_lte?: number;
    vote_count_gte?: number;
    vote_count_lte?: number;
    with_status?: string;
    with_genres?: string;
    without_genres?: string;
    with_origin_country?: string;
    with_original_language?: string;
    with_runtime_gte?: number;
    with_runtime_lte?: number;
}

export interface DiscoverTvSeriesResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<TvSeriesOverview>;
}

export async function discoverTvSeries(
    {
        page = undefined,
        first_air_date_gte = undefined,
        first_air_date_lte = undefined,
        sort_by = undefined,
        vote_average_gte = undefined,
        vote_average_lte = undefined,
        vote_count_gte = undefined,
        vote_count_lte = undefined,
        with_status = undefined,
        with_genres = undefined,
        without_genres = undefined,
        with_origin_country = undefined,
        with_original_language = undefined,
        with_runtime_gte = undefined,
        with_runtime_lte = undefined,
    }: DiscoverTvSeriesRequest
): Promise<DiscoverTvSeriesResponse> {
    try {
        const response = await api.get<DiscoverTvSeriesResponse>(
            "/discover/tv",
            {
                params: {
                    "page": page,
                    "first_air_date.gte": first_air_date_gte,
                    "first_air_date.lte": first_air_date_lte,
                    "sort_by": sort_by,
                    "vote_average.gte": vote_average_gte,
                    "vote_average.lte": vote_average_lte,
                    "vote_count.gte": vote_count_gte,
                    "vote_count.lte": vote_count_lte,
                    "with_status": with_status,
                    "with_genres": with_genres,
                    "without_genres": without_genres,
                    "with_origin_country": with_origin_country,
                    "with_original_language": with_original_language,
                    "with_runtime.gte": with_runtime_gte,
                    "with_runtime.lte": with_runtime_lte,
                }
            }
        );
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
