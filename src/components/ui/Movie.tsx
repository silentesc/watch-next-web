import { useMemo } from "react";
import type { MovieOverview } from "../../api/models";

interface MovieProps {
    movie: MovieOverview,
}

export function Movie({ movie }: MovieProps) {
    const movieTitle = useMemo(() => 
        movie.title ? (movie.title.length > 30 ? movie.title.substring(0, 30) + "..." : movie.title) : "",
    [movie.title]);
    
    const movieReleaseDate = useMemo(() => 
        movie.release_date ? movie.release_date.toString() : "",
    [movie.release_date]);

    return (
        <div className="relative min-w-35 max-w-45 bg-background-primary shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-background-tertiary rounded-md">
            {/* Label */}
            <div className="absolute top-1 left-1 bg-blue-600/80 px-2 py-1 rounded text-xs font-semibold z-10">
                MOVIE
            </div>

            {/* Poster */}
            <div className="aspect-2/3">
                {
                    movie.poster_path ? (
                        <img className="rounded-t-md w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <img className="rounded-t-md object-cover grayscale opacity-30" src="/sad_logo.png" alt={movie.title} />
                        </div>
                    )
                }
            </div>

            {/* Info */}
            <div className="flex flex-col text-center p-1">
                <span title={movieTitle}>{movieTitle}</span>
                <span title={movieReleaseDate} className="opacity-75">{movieReleaseDate.split("-")[0]}</span>
            </div>
        </div>
    );
}
