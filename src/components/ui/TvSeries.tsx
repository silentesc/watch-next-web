import { useMemo } from "react";
import type { TvSeriesOverview } from "../../api/models";
import { useNavigate } from "react-router";

interface TvSeriesProps {
    tvSeries: TvSeriesOverview,
}

export function TvSeries({ tvSeries }: TvSeriesProps) {
    const navigate = useNavigate();

    const tvSeriesName = useMemo(() => {
        return tvSeries.name ? (tvSeries.name.length > 30 ? tvSeries.name.substring(0, 30) + "..." : tvSeries.name) : "";
    }, [tvSeries.name]);
    const tvSeriesFirstAirDate = useMemo(() => {
        return tvSeries.first_air_date ? tvSeries.first_air_date.toString() : "";
    }, [tvSeries.first_air_date]);

    const onPosterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(`/tv/${tvSeries.id}`);
    };

    return (
        <div className="relative min-w-35 max-w-45 bg-background-primary shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-background-tertiary rounded-md">
            {/* Label */}
            <div className="absolute top-1 left-1 bg-purple-600/80 px-2 py-1 rounded text-xs font-semibold z-10">
                SERIES
            </div>

            {/* Poster */}
            <div className="aspect-2/3 cursor-pointer">
                <a href={`/tv/${tvSeries.id}`} onClick={onPosterClick}>
                    {
                        tvSeries.poster_path ? (
                            <img className="rounded-t-md w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w300${tvSeries.poster_path}`} alt={tvSeries.name} />
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <img className="rounded-t-md object-cover grayscale opacity-30" src="/sad_logo.png" alt={tvSeries.name} />
                            </div>
                        )
                    }
                </a>
            </div>

            {/* Info */}
            <div className="flex flex-col text-center p-1">
                <span title={tvSeriesName}>{tvSeriesName}</span>
                <span title={tvSeriesFirstAirDate} className="opacity-75">{tvSeriesFirstAirDate.split("-")[0]}</span>
            </div>
        </div>
    );
}
