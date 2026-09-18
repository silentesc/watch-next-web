import { useMemo } from "react";
import type { TvSeriesDetails } from "../../../api/models";

interface QuickInfo {
    tvSeriesDetails: TvSeriesDetails;
}

export function QuickInfo({ tvSeriesDetails }: QuickInfo) {
    const firstAirDate = useMemo(() => {
        return tvSeriesDetails.first_air_date ? new Date(tvSeriesDetails.first_air_date).getFullYear() : null;
    }, [tvSeriesDetails.first_air_date]);

    const getRatingColor = (rating: number) => {
        if (rating >= 7.5) return "text-green-500";
        if (rating >= 5) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <>
            <div className="mb-4 flex flex-col gap-1">
                {/* Name */}
                <span className="text-3xl sm:text-5xl font-bold">
                    {tvSeriesDetails.name}
                    <span className="text-3xl font-semibold">{firstAirDate && ` (${firstAirDate})`}</span>
                </span>
                {/* Tagline */}
                {tvSeriesDetails.tagline && <p className="text-xl text-foreground-secondary italic">{tvSeriesDetails.tagline}</p>}
            </div>

            {/* At a glance */}
            <div className="flex items-center gap-6 mb-6 justify-center sm:justify-start">
                {tvSeriesDetails.vote_average !== undefined && (
                    <div className="flex items-center gap-2">
                        <div className={`text-4xl font-bold ${getRatingColor(tvSeriesDetails.vote_average)}`}>
                            {tvSeriesDetails.vote_average.toFixed(1)}
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-sm text-foreground-secondary">/ 10</span>
                            <span className="text-xs text-foreground-secondary">
                                {tvSeriesDetails.vote_count ? tvSeriesDetails.vote_count.toLocaleString() : "0"} votes
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Genres */}
            <div>
                {tvSeriesDetails.genres && tvSeriesDetails.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6 justify-center sm:justify-start">
                        {tvSeriesDetails.genres.map((genre) => (
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
