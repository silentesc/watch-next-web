import type { Movie } from "../../api/models";

interface MovieProps {
    movie: Movie,
}

export function Movie({ movie }: MovieProps) {
    return (
        <div className="min-w-35 max-w-45 bg-background-primary shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-background-tertiary rounded-md">
            <div className="aspect-2/3">
                {
                    movie.poster_path ? (
                        <img className="rounded-t-md w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.original_title} />
                    ) : (
                        <div className="h-full flex items-center justify-center">
                            <img className="rounded-t-md object-cover grayscale opacity-30" src="/sad_logo.png" alt={movie.original_title} />
                        </div>
                    )
                }
            </div>
            <div className="flex flex-col text-center p-1">
                <span title={movie.original_title}>
                    {movie.original_title.length > 30
                        ? movie.original_title.substring(0, 30) + '...'
                        : movie.original_title}
                </span>
                <span title={movie.release_date} className="opacity-75">{movie.release_date.split("-")[0]}</span>
            </div>
        </div>
    );
}
