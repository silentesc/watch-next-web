import { useInfiniteQuery } from "@tanstack/react-query";
import { getSimilarMovies } from "../../../api/movie/similar";
import { Loading } from "../../../components/ui/Loading";
import { Error } from "../../../components/ui/Error";
import type { MovieOverview } from "../../../api/models";
import { Movie } from "../../../components/ui/Movie";

interface SimilarProps {
    movieId: number;
}

export function Similar({ movieId }: SimilarProps) {
    const infiniteQuery = useInfiniteQuery({
        queryKey: ["movieSimilar", movieId],
        queryFn: ({ pageParam }) => getSimilarMovies(movieId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
    });

    if (infiniteQuery.error) {
        return <Error message={infiniteQuery.error.message} />;
    }
    if (infiniteQuery.isLoading) {
        return <Loading />;
    }
    if (!infiniteQuery.data) {
        return <Error message="No data returned" />;
    }

    const allMovies: Array<MovieOverview> = [...new Map(infiniteQuery.data?.pages.flatMap(page => page.results).map(movie => [movie.id, movie]) ?? []).values()];

    return (
        <div className="my-5 flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Similar</h2>
            <div className="flex gap-2 justify-between overflow-scroll">
                {allMovies.map(m => <Movie key={m.id} movie={m} />)}
            </div>
        </div>
    );
}
