import { useInfiniteQuery } from "@tanstack/react-query";
import { searchTvSeries } from "../api/search/tv_series";

export function useSearchTvSeries(category: string, text: string) {
    return useInfiniteQuery({
        queryKey: ["search", category, text],
        queryFn: ({ pageParam }) => searchTvSeries(text, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!text && category === "tv_series",
        retry: false,
    });
}
