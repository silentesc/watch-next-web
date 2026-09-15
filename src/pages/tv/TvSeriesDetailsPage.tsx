import { useParams } from "react-router";
import { Error } from "../../components/ui/Error";
import { Loading } from "../../components/ui/Loading";
import { DetailsTable } from "./ui/DetailsTable";
import { Overview } from "./ui/Overview";
import { QuickInfo } from "./ui/QuickInfo";
import { Poster } from "./ui/Poster";
import { Recommendations } from "./ui/Recommendations";
import { Similar } from "./ui/Similar";
import { useTvSeriesDetails } from "../../hooks/use_tv_series_details";
import { Seasons } from "./ui/Seasons";

export function TvSeriesDetailsPage() {
    const { id } = useParams();

    const tvSeriesId: number | null = id && !isNaN(Number(id)) ? Number(id) : null;

    const tvSeriesDetailsQuery = useTvSeriesDetails(tvSeriesId);

    if (!tvSeriesId) {
        return <Error message="Unknown tv series" />
    }

    if (tvSeriesDetailsQuery.error) {
        return <Error message={tvSeriesDetailsQuery.error.message} />
    }
    if (tvSeriesDetailsQuery.isLoading) {
        return <Loading />
    }
    if (!tvSeriesDetailsQuery.data) {
        return <Error message="No data returned" />
    }

    return (
        <>
            {/* Backdrop */}
            <div className="relative h-90 overflow-hidden">
                {
                    tvSeriesDetailsQuery.data.backdrop_path && (
                        <>
                            <img
                                src={`https://image.tmdb.org/t/p/original${tvSeriesDetailsQuery.data.backdrop_path}`}
                                alt={tvSeriesDetailsQuery.data.name}
                                className="w-full h-full object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background-secondary" />
                        </>
                    )
                }
            </div>

            {/* Main Content */}
            <div className="px-4 -mt-80 relative z-10">
                <div className="flex flex-wrap gap-8">
                    <div className="flex-1">
                        {/* Most important info */}
                        <div className="flex flex-wrap gap-8 justify-center text-center sm:text-left sm:flex-nowrap">
                            <Poster tvSeriesDetails={tvSeriesDetailsQuery.data} />

                            <div className="w-full">
                                <QuickInfo tvSeriesDetails={tvSeriesDetailsQuery.data} />
                            </div>
                        </div>

                        <div className="my-5">
                            <Overview tvSeriesDetails={tvSeriesDetailsQuery.data} />
                        </div>

                        {/* Side info as normal page content on small screens */}
                        <div className="lg:hidden">
                            <DetailsTable tvSeriesDetails={tvSeriesDetailsQuery.data} />
                        </div>
                        <Seasons tvSeriesDetails={tvSeriesDetailsQuery.data} />
                    </div>

                    {/* Side info on the side */}
                    <div className="hidden lg:block lg:w-auto lg:mt-55">
                        <DetailsTable tvSeriesDetails={tvSeriesDetailsQuery.data} />
                    </div>
                </div>

                <Recommendations tvSeriesId={tvSeriesId} />
                <Similar tvSeriesId={tvSeriesId} />
            </div>
        </>
    );
}
