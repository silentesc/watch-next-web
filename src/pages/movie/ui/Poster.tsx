import type { MovieDetails } from "../../../api/models";

interface PosterProps {
    movieDetails: MovieDetails;
}

export function Poster({ movieDetails }: PosterProps) {
    return (
        <div className="w-48 h-72 rounded-lg overflow-hidden shadow-2xl border border-background-tertiary shrink-0">
            {movieDetails.poster_path ? (
                <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
                    alt={movieDetails.title}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-background-primary">
                    <img className="object-cover grayscale opacity-30" src="/sad_logo.png" alt={movieDetails.title} />
                </div>
            )}
        </div>
    );
}
