import { useMemo } from "react";
import type { TvSeasonOverview } from "../../api/models";

interface TvSeasonProps {
    tvSeason: TvSeasonOverview,
}

export function TvSeason({ tvSeason }: TvSeasonProps) {
    const name = useMemo(() => {
        return tvSeason.name ? (tvSeason.name.length > 30 ? tvSeason.name.substring(0, 30) + "..." : tvSeason.name) : "";
    }, [tvSeason.name]);
    const airDate = useMemo(() => {
        return tvSeason.air_date ? tvSeason.air_date.toString() : "";
    }, [tvSeason.air_date]);
    const voteAverage = useMemo(() => {
        return tvSeason.vote_average ? tvSeason.vote_average.toFixed(1) : "";
    }, [tvSeason.vote_average]);

    const getRatingColor = (rating: number) => {
        if (rating >= 7.5) return "text-green-500";
        if (rating >= 5) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div className="relative flex bg-background-primary shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-background-tertiary rounded-md">
            {/* Poster */}
            <div className="w-23 aspect-2/3">
                {
                    tvSeason.poster_path ? (
                        <img className="rounded-l-md w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w92${tvSeason.poster_path}`} alt={tvSeason.name} />
                    ) : (
                        <div className="flex w-full h-full items-center justify-center">
                            <img className="w-full h-full rounded-l-md object-contain grayscale opacity-30" src="/sad_logo.png" alt={tvSeason.name} />
                        </div>
                    )
                }
            </div>

            {/* Info */}
            <div className="flex flex-col pt-2 pl-4">
                <span className="text-xl">
                    {name + " "}
                    <span className="opacity-75 text-lg">({airDate.split("-")[0]})</span>
                </span>
                {
                    tvSeason.episode_count ? (
                        <span className="opacity-75">{tvSeason.episode_count} episodes</span>
                    ) : (<></>)
                }
                {
                    voteAverage ? (
                        <div className="flex gap-1 items-center">
                            <span className={`opacity-75 ${getRatingColor(tvSeason.vote_average || 0)}`}>{voteAverage}</span>
                            <span className="opacity-75">/ 10</span>
                        </div>
                    ) : (<></>)
                }
            </div>
        </div>
    );
}
