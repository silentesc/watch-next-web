import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getMovieDetails } from "../../api/movie/details";
import { Error } from "../../components/ui/Error";
import { Loading } from "../../components/ui/Loading";
import { Collection } from "./ui/Collection";
import { DetailsTable } from "./ui/DetailsTable";
import { Overview } from "./ui/Overview";
import { QuickInfo } from "./ui/QuickInfo";
import { Poster } from "./ui/Poster";
import { Crew } from "./ui/Crew";
import { Cast } from "./ui/Cast";
import { Recommendations } from "./ui/Recommendations";
import { Similar } from "./ui/Similar";

export function MovieDetailsPage() {
    const { id } = useParams();

    const movieId: number | null = id && !isNaN(Number(id)) ? Number(id) : null;

    const movieDetailsQuery = useQuery({
        queryKey: ["movieDetailsQuery", movieId],
        queryFn: () => getMovieDetails(movieId!),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: movieId !== null,
    });

    if (!movieId) {
        return <Error message="Unknown movie" />
    }

    if (movieDetailsQuery.error) {
        return <Error message={movieDetailsQuery.error.message} />
    }
    if (movieDetailsQuery.isLoading) {
        return <Loading />
    }
    if (!movieDetailsQuery.data) {
        return <Error message="No data returned" />
    }

    return (
        <>
            {/* Backdrop */}
            <div className="relative h-90 overflow-hidden">
                {
                    movieDetailsQuery.data.backdrop_path && (
                        <>
                            <img
                                src={`https://image.tmdb.org/t/p/original${movieDetailsQuery.data.backdrop_path}`}
                                alt={movieDetailsQuery.data.title}
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
                            <Poster movieDetails={movieDetailsQuery.data} />

                            <div className="w-full">
                                <QuickInfo movieDetails={movieDetailsQuery.data} />
                            </div>
                        </div>

                        <div className="my-5">
                            <Overview movieDetails={movieDetailsQuery.data} />
                        </div>

                        {/* Side info as normal page content on small screens */}
                        <div className="lg:hidden">
                            <div className="my-2">
                                <Collection movieDetails={movieDetailsQuery.data} />
                            </div>
                            <DetailsTable movieDetails={movieDetailsQuery.data} />
                        </div>

                        <Cast movieId={movieId} />
                        <Crew movieId={movieId} />
                    </div>

                    {/* Side info on the side */}
                    <div className="hidden lg:block lg:w-auto lg:mt-55">
                        <div className="my-2">
                            <Collection movieDetails={movieDetailsQuery.data} />
                        </div>
                        <DetailsTable movieDetails={movieDetailsQuery.data} />
                    </div>
                </div>

                <Recommendations movieId={movieId} />
                <Similar movieId={movieId} />
            </div>
        </>
    );
}
