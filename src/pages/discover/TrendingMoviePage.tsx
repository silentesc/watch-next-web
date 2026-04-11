import { MovieList } from "../../components/ui/MovieList";
import { useNavigate, useParams } from "react-router";
import { useTrendingMovies } from "../../hooks/use_trending_movies";
import { Dropdown } from "../../components/ui/Dropdown";
import { Error } from "../../components/ui/Error";

export function TrendingMoviePage() {
    const navigate = useNavigate();

    const timeWindowValues = new Map([
        ["day", "Day"],
        ["week", "Week"],
    ]);

    const { timeWindow } = useParams();

    if (!timeWindow) {
        return <Error message="Unspecified time window" />
    }
    if (timeWindow !== "day" && timeWindow !== "week") {
        return <Error message="Time window must be 'day' or 'week'" />
    }

    const trendingMovieInfiniteQuery = useTrendingMovies((timeWindow));

    const onTimeWindowSelect = (key: string) => {
        navigate(`/discover/trending/movie/${key}`);
    }

    return (
        <>
            {/* Bar */}
            <div className="flex justify-end mb-5">
                <div className="flex gap-2">
                    <Dropdown
                        title={timeWindowValues.get(timeWindow) || "day"}
                        values={timeWindowValues}
                        onSelect={onTimeWindowSelect}
                        alignedRight
                    />
                </div>
            </div>

            {/* Movies */}
            <MovieList infiniteQuery={trendingMovieInfiniteQuery} />
        </>
    );
}
