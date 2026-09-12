import { useInfiniteQuery } from "@tanstack/react-query";
import { search_movie } from "../api/search/movie";

export function useSearchMovie(category: string, text: string) {
    return useInfiniteQuery({
        queryKey: ["search", category, text],
        queryFn: ({ pageParam }) => search_movie(text, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!text && category === "movies",
        retry: false,
    });
}
