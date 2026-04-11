import { Loading } from "../../../components/ui/Loading";
import { Error } from "../../../components/ui/Error";
import type { MovieOverview } from "../../../api/models";
import { useNavigate } from "react-router";
import { useMovieRecommendations } from "../../../hooks/use_movie_recommendations";
import { MovieListVertical } from "../../../components/ui/MovieListVertical";

interface RecommendationsProps {
    movieId: number;
}

export function Recommendations({ movieId }: RecommendationsProps) {
    const navigate = useNavigate();

    const movieRecommendationsQuery = useMovieRecommendations(movieId);

    if (movieRecommendationsQuery.error) {
        return <Error message={movieRecommendationsQuery.error.message} />;
    }
    if (movieRecommendationsQuery.isLoading) {
        return <Loading />;
    }
    if (!movieRecommendationsQuery.data) {
        return <Error message="No data returned" />;
    }

    const allMovies: Array<MovieOverview> = movieRecommendationsQuery.data.pages[0].results;

    if (allMovies.length === 0) {
        return <></>;
    }

    const seeMore = () => {
        navigate(`/movie/${movieId}/recommendations`);
    }

    return (
        <div className="my-5 flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Recommendations</h2>
            <MovieListVertical movies={allMovies} onSeeMoreClick={seeMore} />
        </div>
    );
}
