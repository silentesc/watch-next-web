import { useEffect, useMemo, useState } from "react";
import type { TvSeasonOverview } from "../../api/models";
import { useTvSeasonDetails } from "../../hooks/use_tv_season_details";
import { Error } from "./Error";
import { Loading } from "./Loading";
import { TvEpisode } from "./TvEpisode";
import { getRatingColor, getRatingString } from "../../shared/ratingUtils";

interface TvSeasonProps {
    tvSeriesId: number,
    tvSeason: TvSeasonOverview,
    canExpandEpisodes: boolean,
}

export function TvSeason({ tvSeriesId, tvSeason, canExpandEpisodes }: TvSeasonProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const name = useMemo(() => {
        return tvSeason.name ? (tvSeason.name.length > 30 ? tvSeason.name.substring(0, 30) + "..." : tvSeason.name) : "";
    }, [tvSeason.name]);
    const airDate = useMemo(() => {
        return tvSeason.air_date ? tvSeason.air_date.toString() : "";
    }, [tvSeason.air_date]);

    const tvSeasonDetailsQuery = useTvSeasonDetails(
        tvSeriesId,
        isExpanded ? (tvSeason.season_number ?? null) : null,
    );

    const toggleExpanded = () => setIsExpanded(expanded => !expanded);

    useEffect(() => {
        if (!canExpandEpisodes && isExpanded) {
            setIsExpanded(false);
        }
    }, [canExpandEpisodes, isExpanded]);

    return (
        <div className="relative overflow-hidden bg-background-primary shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-background-tertiary rounded-md">
            <div
                className={`flex items-stretch ${canExpandEpisodes ? "cursor-pointer transition-colors hover:bg-background-secondary/60" : ""}`}
                onClick={canExpandEpisodes ? toggleExpanded : undefined}
            >
                <div className="w-23 aspect-2/3">
                    {
                        tvSeason.poster_path ? (
                            <img className="rounded-l-md w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w300${tvSeason.poster_path}`} alt={tvSeason.name} />
                        ) : (
                            <div className="flex w-full h-full items-center justify-center">
                                <img className="w-full h-full rounded-l-md object-contain grayscale opacity-30" src="/sad_logo.png" alt={tvSeason.name} />
                            </div>
                        )
                    }
                </div>

                <div className="flex flex-1 flex-col p-4">
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
                        tvSeason.vote_average ? (
                            <div className="flex gap-1 items-center">
                                <span className={`opacity-75 ${getRatingColor(tvSeason.vote_average || 0)}`}>{getRatingString(tvSeason.vote_average)}</span>
                                <span className="opacity-75">/ 10</span>
                            </div>
                        ) : (<></>)
                    }
                </div>

                {canExpandEpisodes && (
                    <div className="flex items-center gap-2 px-4 text-sm opacity-75">
                        <span
                            aria-hidden="true"
                            className={`mb-1 h-2 w-2 rotate-45 border-b border-r border-current transition-transform ${isExpanded ? "rotate-225" : ""}`}
                        />
                    </div>
                )}
            </div>

            {isExpanded && (
                <div id={`season-${tvSeason.id}-episodes`} className="border-t border-background-tertiary px-4">
                    {tvSeasonDetailsQuery.error ? (
                        <Error message={tvSeasonDetailsQuery.error.message} />
                    ) : tvSeasonDetailsQuery.isLoading ? (
                        <Loading />
                    ) : tvSeasonDetailsQuery.data?.episodes?.length ? (
                        <ol className="divide-y divide-background-tertiary">
                            {tvSeasonDetailsQuery.data.episodes.map(episode => (
                                <TvEpisode key={episode.id} episode={episode} />
                            )).reverse()}
                        </ol>
                    ) : (
                        <Error message="No episodes returned" />
                    )}
                </div>
            )}
        </div>
    );
}
