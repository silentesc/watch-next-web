import { useInfiniteQuery } from "@tanstack/react-query";
import { search_movie } from "../../../api/search/movie";
import { Movie } from "../../../components/ui/Movie";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";
import { useEffect, useRef } from "react";

interface MoviesProps {
    searchText: string;
}

export function Movies({ searchText }: MoviesProps) {
    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["searchMovie", searchText],
        queryFn: ({ pageParam }) => search_movie(searchText, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        enabled: !!searchText,
    });

    const observerRef = useRef<IntersectionObserver | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, {
            // Trigger fetch next before actually hitting bottom
            rootMargin: "400px"
        });

        if (bottomRef.current) observerRef.current.observe(bottomRef.current);

        return () => observerRef.current?.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allMovies = data?.pages.flatMap(page => page.results) ?? [];

    if (error) return <Error message={error.message} />;

    return (
        <>
            <div className="my-2">
                <span className="text-2xl">Movies</span>
            </div>

            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(9rem,2fr))] justify-items-center">
                {allMovies.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                ))}
            </div>

            {/* Target element for the observer */}
            <div ref={bottomRef} className="h-10 w-full">
                {(isLoading || isFetchingNextPage) && <Loading />}
            </div>
        </>
    );
}
