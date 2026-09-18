import { useNavigate } from "react-router";
import { Error } from "../../../components/ui/Error";
import { Loading } from "../../../components/ui/Loading";
import { Person } from "../../../components/ui/Person";
import { useTvSeriesAggregateCredits } from "../../../hooks/use_tv_series_aggregatecredits";
import type { AggregateCast } from "../../../api/models";

interface AggregateCastProps {
    tvSeriesId: number;
}

export const getRolesString = (cast: AggregateCast) => {
    if (!cast.roles) {
        return "";
    }
    return cast.roles.map(r => r.character).filter(c => c).join(", ");
}

export function AggregateCast({ tvSeriesId }: AggregateCastProps) {
    const navigate = useNavigate();

    const tvSeriesAggregateCreditsQuery = useTvSeriesAggregateCredits(tvSeriesId);

    if (tvSeriesAggregateCreditsQuery.error) {
        return <Error message={tvSeriesAggregateCreditsQuery.error.message} />;
    }
    if (tvSeriesAggregateCreditsQuery.isLoading) {
        return <Loading />;
    }
    if (!tvSeriesAggregateCreditsQuery.data) {
        return <Error message="No data returned" />;
    }

    const seeMore = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(`/tv/${tvSeriesId}/aggregate_cast`);
    }

    const cast = tvSeriesAggregateCreditsQuery.data.cast;
    const topCast = cast.slice(0, 9);
    const hintCast = cast.length >= 9 ? cast[9] : undefined;

    if (cast.length === 0) {
        return <></>;
    }

    return (
        <div className="my-5 flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Cast</h2>
            <div className="flex flex-col gap-3 bg-background-secondary rounded-lg">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
                    {topCast.map((c) => (
                        <Person key={`${c.name}-${getRolesString(c)}`} name={c.name || "Unknown"} imgPath={c.profile_path} description={getRolesString(c)} />
                    ))}
                    {hintCast && (
                        <div className="relative">
                            <div className="blur-sm select-none pointer-events-none">
                                <Person key={`${hintCast.name}-${getRolesString(hintCast)}`} name={hintCast.name || "Unknown"} imgPath={hintCast.profile_path} description={getRolesString(hintCast)} />
                            </div>
                            <a href={`/tv/${tvSeriesId}/aggregate_cast`} onClick={seeMore}>
                                <div className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer flex gap-1 items-center">
                                    <span className="font-semibold">See more</span>
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z">
                                        </path>
                                    </svg>
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
