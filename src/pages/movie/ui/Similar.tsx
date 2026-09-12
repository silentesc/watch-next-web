import { Loading } from "../../../components/ui/Loading";
import { Error } from "../../../components/ui/Error";
import type { MovieOverview } from "../../../api/models";
import { useSimilarMovies } from "../../../hooks/use_similar_movies";
import { useNavigate } from "react-router";
import { MovieListVertical } from "../../../components/ui/MovieListVertical";

interface SimilarProps {
    movieId: number;
}

export function Similar({ movieId }: SimilarProps) {
    const navigate = useNavigate();

    const similarMoviesQuery = useSimilarMovies(movieId);

    if (similarMoviesQuery.error) {
        return <Error message={similarMoviesQuery.error.message} />;
    }
    if (similarMoviesQuery.isLoading) {
        return <Loading />;
    }
    if (!similarMoviesQuery.data) {
        return <Error message="No data returned" />;
    }

    const allMovies: Array<MovieOverview> = similarMoviesQuery.data.pages[0].results;

    if (allMovies.length === 0) {
        return <></>;
    }

    const seeMore = () => {
        navigate(`/movie/${movieId}/similar`);
    }

    return (
        <div className="my-5 flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Similar</h2>
            <MovieListVertical movies={allMovies} seeMoreLinkHint={`/movie/${movieId}/similar`} onSeeMoreClick={seeMore} />
        </div>
    );
}
