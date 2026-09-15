import type { TvSeriesOverview } from "../../api/models";
import { TvSeries } from "./TvSeries";

interface TvSeriesListVerticalProps {
    tvSeries: Array<TvSeriesOverview>;
    seeMoreLinkHint: string;
    onSeeMoreClick: () => void;
}

export function TvSeriesListVertical({ tvSeries, seeMoreLinkHint, onSeeMoreClick }: TvSeriesListVerticalProps) {
    const shownTvSeries = tvSeries.slice(0, tvSeries.length - 1);
    const lastTvSeries = tvSeries[tvSeries.length - 1];

    const onClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onSeeMoreClick();
    }

    return (
        <div className="flex gap-2 overflow-scroll">
            {shownTvSeries.map(m => <TvSeries key={m.id} tvSeries={m} />)}
            {lastTvSeries && (
                <div className="relative">
                    <div className="blur-sm pointer-events-none">
                        <TvSeries tvSeries={lastTvSeries} />
                    </div>
                    <a href={seeMoreLinkHint} onClick={onClick}>
                        <div className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer flex flex-col gap-1 items-center">
                            <span className="font-semibold text-nowrap">See more</span>
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z">
                                </path>
                            </svg>
                        </div>
                    </a>
                </div>
            )}
        </div>
    );
}
