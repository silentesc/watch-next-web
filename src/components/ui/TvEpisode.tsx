import type { TvEpisodeDetails } from "../../api/models";
import { formatDate } from "../../shared/dateFormatter";
import { getRatingColor, getRatingString } from "../../shared/ratingUtils";

interface TvEpisodeProps {
    episode: TvEpisodeDetails,
}

export function TvEpisode({ episode }: TvEpisodeProps) {
    return (
        <li className="flex flex-col gap-3 py-4 first:pt-3 last:pb-3 sm:flex-row">
            <div className="aspect-video w-35">
                {episode.still_path ? (
                    <div className="flex w-full h-full items-center justify-center">
                        <img
                            className="w-full h-full object-contain sm:w-28"
                            src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
                            alt={episode.name}
                        />
                    </div>
                ) : (
                    <div className="flex w-full h-full items-center justify-center">
                        <img className="w-full h-full rounded-l-md object-contain  grayscale opacity-30" src="/sad_logo.png" alt={episode.name} />
                    </div>
                )
                }
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-lg">
                        {episode.episode_number + ". "}
                        {episode.name}
                    </span>
                    {episode.air_date && (
                        <span className="opacity-75">
                            {`(${formatDate(episode.air_date, "medium")})`}
                        </span>
                    )}
                </div>

                {(episode.runtime || episode.vote_average) && (
                    <div className="mt-2 flex flex-wrap items-center gap-x-2 opacity-75">
                        {episode.runtime && (
                            <span>{episode.runtime} min</span>
                        )}
                        {episode.runtime && episode.vote_average && <span aria-hidden="true">•</span>}
                        {episode.vote_average && (
                            <span>
                                <span className={getRatingColor(episode.vote_average)}>
                                    {getRatingString(episode.vote_average)}
                                </span>
                                <span> / 10</span>
                            </span>
                        )}
                    </div>
                )}

                {episode.overview && (
                    <p className="mt-3 opacity-75">{episode.overview}</p>
                )}
            </div>
        </li>
    );
}
