import { Loading } from "../../../components/ui/Loading";
import { Error } from "../../../components/ui/Error";
import type { MovieOverview } from "../../../api/models";
import { Movie } from "../../../components/ui/Movie";
import { useNavigate } from "react-router";
import { useMovieRecommendations } from "../../../hooks/use_movie_recommendations";

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
    const shownMovies = allMovies.slice(0, allMovies.length - 1);
    const lastMovie = allMovies[allMovies.length - 1];

    if (allMovies.length === 0) {
        return <></>;
    }

    const seeMore = () => {
        navigate(`/movie/${movieId}/recommendations`);
    }

    return (
        <div className="my-5 flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Recommendations</h2>
            <div className="flex gap-2 overflow-scroll">
                {shownMovies.map(m => <Movie key={m.id} movie={m} />)}
                {lastMovie && (
                    <div className="relative">
                        <div className="blur-sm pointer-events-none">
                            <Movie movie={lastMovie} />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer flex flex-col gap-1 items-center" onClick={seeMore}>
                            <span className="font-semibold text-nowrap">See more</span>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z">
                                </path>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
