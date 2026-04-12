import { type InfiniteData, type UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Error } from "./Error";
import { Loading } from "./Loading";
import type { CollectionOverview } from "../../api/models";
import { Collection } from "./Collection";

export interface InfiniteDataTemplate {
    page: number;
    total_pages: number;
    total_results: number;
    results: Array<CollectionOverview>;
}

interface CollectionListProps {
    infiniteQuery: UseInfiniteQueryResult<InfiniteData<InfiniteDataTemplate, unknown>, Error>;
}

export function CollectionList({ infiniteQuery }: CollectionListProps) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const allCollections: Array<CollectionOverview> = [...new Map(infiniteQuery.data?.pages.flatMap(page => page.results).map(collection => [collection.id, collection]) ?? []).values()];

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
                {allCollections.map((collection) => (
                    <Collection key={collection.id} collection={collection} />
                ))}
            </div>

            {/* Target element for the observer */}
            <div ref={bottomRef} className="h-10 w-full">
                {(infiniteQuery.isLoading || infiniteQuery.isFetchingNextPage) && <Loading />}
            </div>
        </>
    );
}
