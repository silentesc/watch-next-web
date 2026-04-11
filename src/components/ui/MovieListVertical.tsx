import type { MovieOverview } from "../../api/models";
import { Movie } from "./Movie";

interface MovieListVerticalProps {
    movies: Array<MovieOverview>;
    onSeeMoreClick: () => void;
}

export function MovieListVertical({ movies, onSeeMoreClick }: MovieListVerticalProps) {
    const shownMovies = movies.slice(0, movies.length - 1);
    const lastMovie = movies[movies.length - 1];

    return (
        <div className="flex gap-2 overflow-scroll">
            {shownMovies.map(m => <Movie key={m.id} movie={m} />)}
            {lastMovie && (
                <div className="relative">
                    <div className="blur-sm pointer-events-none">
                        <Movie movie={lastMovie} />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer flex flex-col gap-1 items-center" onClick={() => onSeeMoreClick()}>
                        <span className="font-semibold text-nowrap">See more</span>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-7">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z">
                            </path>
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
}
