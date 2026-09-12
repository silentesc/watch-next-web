import { api } from "../client";
import { error2userMessage } from "../errors";
import type { CollectionOverview } from "../models";

export interface SearchCollectionResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<CollectionOverview>;
}

export async function searchCollection(query: string, page?: number): Promise<SearchCollectionResponse> {
    try {
        const response = await api.get<SearchCollectionResponse>("/search/collection", { params: { query, page } });
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
