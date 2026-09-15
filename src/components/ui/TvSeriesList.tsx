import { type InfiniteData, type UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Error } from "./Error";
import { Loading } from "./Loading";
import type { TvSeriesOverview } from "../../api/models";
import { TvSeries } from "./TvSeries";

export interface InfiniteDataTemplate {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<TvSeriesOverview>;
}

interface TvSeriesListProps {
    infiniteQuery: UseInfiniteQueryResult<InfiniteData<InfiniteDataTemplate, unknown>, Error>;
}

export function TvSeriesList({ infiniteQuery }: TvSeriesListProps) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const allTvSeries: Array<TvSeriesOverview> = [...new Map(infiniteQuery.data?.pages.flatMap(page => page.results).map(tvSeries => [tvSeries.id, tvSeries]) ?? []).values()];

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
                {allTvSeries.map((tvSeries) => (
                    <TvSeries key={tvSeries.id} tvSeries={tvSeries} />
                ))}
            </div>

            {/* Target element for the observer */}
            <div ref={bottomRef} className="h-10 w-full">
                {(infiniteQuery.isLoading || infiniteQuery.isFetchingNextPage) && <Loading />}
            </div>
        </>
    );
}
