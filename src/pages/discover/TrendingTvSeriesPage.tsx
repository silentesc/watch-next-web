import { useNavigate, useParams } from "react-router";
import { Dropdown } from "../../components/ui/Dropdown";
import { Error } from "../../components/ui/Error";
import { useTrendingTvSeries } from "../../hooks/use_trending_tv_series";
import { TvSeriesList } from "../../components/ui/TvSeriesList";

export function TrendingTvSeriesPage() {
    const navigate = useNavigate();

    const timeWindowValues = new Map([
        ["day", "Day"],
        ["week", "Week"],
    ]);

    const { timeWindow } = useParams();

    if (!timeWindow) {
        return <Error message="Unspecified time window" />
    }
    if (timeWindow !== "day" && timeWindow !== "week") {
        return <Error message="Time window must be 'day' or 'week'" />
    }

    const trendingTvSeriesInfiniteQuery = useTrendingTvSeries((timeWindow));

    const onTimeWindowSelect = (key: string) => {
        navigate(`/discover/trending/tv/${key}`);
    }

    return (
        <>
            {/* Bar */}
            <div className="flex justify-end mb-5">
                <div className="flex gap-2">
                    <Dropdown
                        title={timeWindowValues.get(timeWindow) || "day"}
                        values={timeWindowValues}
                        onSelect={onTimeWindowSelect}
                        alignedRight
                    />
                </div>
            </div>

            {/* TV Series */}
            <TvSeriesList infiniteQuery={trendingTvSeriesInfiniteQuery} />
        </>
    );
}
