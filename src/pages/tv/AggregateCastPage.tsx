import { useNavigate, useParams } from "react-router";
import { Error } from "../../components/ui/Error";
import { Loading } from "../../components/ui/Loading";
import { Person } from "../../components/ui/Person";
import { useTvSeriesAggregateCredits } from "../../hooks/use_tv_series_aggregatecredits";
import { useTvSeriesDetails } from "../../hooks/use_tv_series_details";
import { getRolesString } from "./ui/AggregateCast";

export function AggregateCastPage() {
    const navigate = useNavigate();

    const { id } = useParams();

    const tvSeriesId: number | null = id && !isNaN(Number(id)) ? Number(id) : null;

    if (!tvSeriesId) {
        return <Error message="Unknown tv series" />
    }

    const tvSeriesDetailsQuery = useTvSeriesDetails(tvSeriesId);
    const aggregateCreditsQuery = useTvSeriesAggregateCredits(tvSeriesId);

    if (tvSeriesDetailsQuery.error) {
        return <Error message={tvSeriesDetailsQuery.error.message} />
    }
    if (tvSeriesDetailsQuery.isLoading) {
        return <Loading />
    }
    if (!tvSeriesDetailsQuery.data) {
        return <Error message="No data returned" />
    }

    if (aggregateCreditsQuery.error) {
        return <Error message={aggregateCreditsQuery.error.message} />
    }
    if (aggregateCreditsQuery.isLoading) {
        return <Loading />
    }
    if (!aggregateCreditsQuery.data) {
        return <Error message="No data returned" />
    }

    const tvSeriesDetails = tvSeriesDetailsQuery.data;
    const aggregateCast = aggregateCreditsQuery.data.cast;

    const backToTvSeries = () => {
        navigate(`/tv/${tvSeriesDetails.id}`);
    }

    return (
        <div className="flex flex-col gap-3">
            {/* Back button */}
            <div className="my-3 flex gap-1 items-center cursor-pointer" onClick={backToTvSeries}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 rotate-180">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z">
                    </path>
                </svg>
                <span className="text-lg text-nowrap">Back to {tvSeriesDetails.name}</span>
            </div>
            <h2 className="text-2xl font-bold">Cast</h2>
            <div className="flex flex-col gap-3 bg-background-secondary rounded-lg">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
                    {aggregateCast.map((c) => <Person key={`${c.name}-${getRolesString(c)}`} name={c.name || "Unknown"} imgPath={c.profile_path} description={getRolesString(c)} />)}
                </div>
            </div>
        </div>
    );
}
