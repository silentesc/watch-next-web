import { useInfiniteQuery } from "@tanstack/react-query";
import { searchCollection } from "../api/search/collection";

export function useSearchCollection(category: string, text: string) {
    return useInfiniteQuery({
        queryKey: ["search", category, text],
        queryFn: ({ pageParam }) => searchCollection(text, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!text && category === "collections",
        retry: false,
    });
}
