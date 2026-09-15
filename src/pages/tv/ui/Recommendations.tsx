import { Loading } from "../../../components/ui/Loading";
import { Error } from "../../../components/ui/Error";
import type { TvSeriesOverview } from "../../../api/models";
import { useNavigate } from "react-router";
import { useTvSeriesRecommendations } from "../../../hooks/use_tv_series_recommendations";
import { TvSeriesListVertical } from "../../../components/ui/TvSeriesListVertical";

interface RecommendationsProps {
    tvSeriesId: number;
}

export function Recommendations({ tvSeriesId }: RecommendationsProps) {
    const navigate = useNavigate();

    const tvSeriesRecommendationsQuery = useTvSeriesRecommendations(tvSeriesId);

    if (tvSeriesRecommendationsQuery.error) {
        return <Error message={tvSeriesRecommendationsQuery.error.message} />;
    }
    if (tvSeriesRecommendationsQuery.isLoading) {
        return <Loading />;
    }
    if (!tvSeriesRecommendationsQuery.data) {
        return <Error message="No data returned" />;
    }

    const allTvSeries: Array<TvSeriesOverview> = tvSeriesRecommendationsQuery.data.pages[0].results;

    if (allTvSeries.length === 0) {
        return <></>;
    }

    const seeMore = () => {
        navigate(`/tv/${tvSeriesId}/recommendations`);
    }

    return (
        <div className="my-5 flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Recommendations</h2>
            <TvSeriesListVertical tvSeries={allTvSeries} seeMoreLinkHint={`/tv/${tvSeriesId}/recommendations`} onSeeMoreClick={seeMore} />
        </div>
    );
}
