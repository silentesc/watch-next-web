import { useState } from "react";
import type { TvSeriesDetails } from "../../../api/models";
import { Button } from "../../../components/ui/Button";
import { TvSeason } from "../../../components/ui/TvSeason";

interface SeasonsProps {
    tvSeriesDetails: TvSeriesDetails;
}

export function Seasons({ tvSeriesDetails }: SeasonsProps) {
    const id = tvSeriesDetails.id;
    const seasons = tvSeriesDetails.seasons;

    if (!id) {
        return null;
    }
    if (!seasons?.length) {
        return null;
    }

    const [isExpanded, setIsExpanded] = useState(seasons.length <= 1 ? true : false);

    const orderedSeasons = [...seasons].reverse();
    const visibleSeasons = isExpanded ? orderedSeasons : orderedSeasons.slice(0, 1);

    return (
        <section className="my-4">
            <div className="py-3">
                <span className="text-2xl font-bold tracking-tight">Seasons</span>
            </div>
            <div className="flex flex-col gap-3">
                {visibleSeasons.map((season, index) => (
                    <div
                        key={season.id}
                        className={
                            !isExpanded && index === 0 && seasons.length > 1
                                ? "mask-[linear-gradient(to_bottom,black_45%,transparent_100%)]"
                                : undefined
                        }
                    >
                        <TvSeason tvSeriesId={id} tvSeason={season} canExpandEpisodes={isExpanded} />
                    </div>
                ))}
            </div>
            <div className="text-center">
                {orderedSeasons.length > 1 && (
                    <Button
                        value={isExpanded ? "Show less" : "Show more"}
                        onClick={() => setIsExpanded(expanded => !expanded)}
                        className="mt-3 cursor-pointer"
                    />
                )}
            </div>
        </section>
    );
}
