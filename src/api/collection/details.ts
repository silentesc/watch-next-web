import { api } from "../client";
import { error2userMessage } from "../errors";
import type { CollectionDetails } from "../models";

export async function getCollectionDetails(collection_id: number): Promise<CollectionDetails> {
    try {
        const response = await api.get<CollectionDetails>(`collection/${collection_id}`);
        return response.data;
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
