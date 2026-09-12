import { useQuery } from "@tanstack/react-query";
import { getCollectionDetails } from "../api/collection/details";

export function useCollectionDetails(collectionId: number) {
    return useQuery({
        queryKey: ["collectionDetailsQuery", collectionId],
        queryFn: () => getCollectionDetails(collectionId),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: !!collectionId
    });
}
