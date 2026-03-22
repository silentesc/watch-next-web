import { type InfiniteData, type UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Error } from "./Error";
import { Movie } from "./Movie";
import { Loading } from "./Loading";
import type { MovieOverview } from "../../api/models";

export interface InfiniteDataTemplate {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<MovieOverview>;
}

interface MovieListProps {
    infiniteQuery: UseInfiniteQueryResult<InfiniteData<InfiniteDataTemplate, unknown>, Error>;
}

export function MovieList({ infiniteQuery }: MovieListProps) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const allMovies: Array<MovieOverview> = [...new Map(infiniteQuery.data?.pages.flatMap(page => page.results).map(movie => [movie.id, movie]) ?? []).values()];

    // Trigger fetch next when hitting bottom
    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && infiniteQuery.hasNextPage && !infiniteQuery.isFetchingNextPage) {
                infiniteQuery.fetchNextPage();
            }
        }, {
            // Trigger fetch next before actually hitting bottom
            rootMargin: "400px"
        });

        if (bottomRef.current) observerRef.current.observe(bottomRef.current);

        return () => observerRef.current?.disconnect();
    }, [infiniteQuery.hasNextPage, infiniteQuery.isFetchingNextPage]);

    if (infiniteQuery.error) return <Error message={infiniteQuery.error.message} />;

    return (
        <>
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(9rem,2fr))] justify-items-center">
                {allMovies.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                ))}
            </div>

            {/* Target element for the observer */}
            <div ref={bottomRef} className="h-10 w-full">
                {(infiniteQuery.isLoading || infiniteQuery.isFetchingNextPage) && <Loading />}
            </div>
        </>
    );
}
