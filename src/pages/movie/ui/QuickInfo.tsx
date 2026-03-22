import { useMemo } from "react";
import type { MovieDetails } from "../../../api/models";

interface QuickInfo {
    movieDetails: MovieDetails;
}

export function QuickInfo({ movieDetails }: QuickInfo) {
    const releaseYear = useMemo(() => {
        return movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : null;
    }, [movieDetails.release_date]);

    const formatRuntime = (minutes: number | undefined) => {
        if (!minutes) return "N/A";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 7.5) return "text-green-500";
        if (rating >= 5) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <>
            <div className="mb-4 flex flex-col gap-1">
                {/* Title */}
                <span className="text-3xl sm:text-5xl font-bold">
                    {movieDetails.title}
                    <span className="text-3xl font-semibold">{releaseYear && ` (${releaseYear})`}</span>
                </span>
                {/* Tagline */}
                {movieDetails.tagline && <p className="text-xl text-foreground-secondary italic">{movieDetails.tagline}</p>}
            </div>

            {/* At a glance */}
            <div className="flex items-center gap-6 mb-6 justify-center sm:justify-start">
                {movieDetails.vote_average !== undefined && (
                    <div className="flex items-center gap-2">
                        <div className={`text-4xl font-bold ${getRatingColor(movieDetails.vote_average)}`}>
                            {movieDetails.vote_average.toFixed(1)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-foreground-secondary">/ 10</span>
                            <span className="text-xs text-foreground-secondary">
                                {movieDetails.vote_count ? movieDetails.vote_count.toLocaleString() : "0"} votes
                            </span>
                        </div>
                    </div>
                )}

                {
                    movieDetails.runtime ? (
                        <div className="text-lg text-foreground-secondary">
                            <span className="text-foreground-primary font-semibold">{formatRuntime(movieDetails.runtime)}</span>
                        </div>
                    ) : (<></>)
                }
            </div>

            {/* Genres */}
            <div>
                {movieDetails.genres && movieDetails.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
                        {movieDetails.genres.map((genre) => (
                            <span
                                key={genre.id}
                                className="px-3 py-1 bg-primary text-sm rounded-full"
                            >
                                {genre.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
