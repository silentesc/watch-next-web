import { Loading } from "../../../components/ui/Loading";
import { Error } from "../../../components/ui/Error";
import type { TvSeriesOverview } from "../../../api/models";
import { useNavigate } from "react-router";
import { TvSeriesListVertical } from "../../../components/ui/TvSeriesListVertical";
import { useSimilarTvSeries } from "../../../hooks/use_similar_tv_series";

interface SimilarProps {
    tvSeriesId: number;
}

export function Similar({ tvSeriesId }: SimilarProps) {
    const navigate = useNavigate();

    const similarTvSeriesQuery = useSimilarTvSeries(tvSeriesId);

    if (similarTvSeriesQuery.error) {
        return <Error message={similarTvSeriesQuery.error.message} />;
    }
    if (similarTvSeriesQuery.isLoading) {
        return <Loading />;
    }
    if (!similarTvSeriesQuery.data) {
        return <Error message="No data returned" />;
    }

    const allTvSeries: Array<TvSeriesOverview> = similarTvSeriesQuery.data.pages[0].results;

    if (allTvSeries.length === 0) {
        return <></>;
    }

    const seeMore = () => {
        navigate(`/tv/${tvSeriesId}/similar`);
    }

    return (
        <div className="my-5 flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Similar</h2>
            <TvSeriesListVertical tvSeries={allTvSeries} seeMoreLinkHint={`/tv/${tvSeriesId}/similar`} onSeeMoreClick={seeMore} />
        </div>
    );
}
