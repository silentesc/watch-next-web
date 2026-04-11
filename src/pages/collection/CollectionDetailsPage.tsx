import { useParams } from "react-router";
import { Error } from "../../components/ui/Error";
import { Loading } from "../../components/ui/Loading";
import { Movie } from "../../components/ui/Movie";
import { useCollectionDetails } from "../../hooks/use_collection_details";
import { Overview } from "./Overview";
import { QuickInfo } from "./QuickInfo";
import { Poster } from "./Poster";

export function CollectionDetailsPage() {
    const { id } = useParams();

    const collectionId: number | null = id && !isNaN(Number(id)) ? Number(id) : null;

    if (!collectionId) {
        return <Error message="Unknown collection" />
    }

    const collectionDetailsQuery = useCollectionDetails(collectionId);

    if (collectionDetailsQuery.error) {
        return <Error message={collectionDetailsQuery.error.message} />
    }
    if (collectionDetailsQuery.isLoading) {
        return <Loading />
    }
    if (!collectionDetailsQuery.data) {
        return <Error message="No data returned" />
    }

    const collectionDetails = collectionDetailsQuery.data;
    const collectionParts = [...collectionDetails.parts].sort((a, b) => {
        if (!a.release_date || !b.release_date) return 0;
        if (a.release_date === b.release_date) return 0;
        if (a.release_date > b.release_date) return 1;
        return -1
    });

    return (
        <>
            {/* Backdrop */}
            <div className="relative h-90 overflow-hidden">
                {
                    collectionDetails.backdrop_path && (
                        <>
                            <img
                                src={`https://image.tmdb.org/t/p/original${collectionDetails.backdrop_path}`}
                                alt={collectionDetails.name}
                                className="w-full h-full object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background-secondary" />
                        </>
                    )
                }
            </div>

            {/* Main Content */}
            <div className="px-4 -mt-80 relative z-10">
                {/* Most important info */}
                <div className="flex flex-wrap gap-8 justify-center text-center sm:text-left sm:flex-nowrap">
                    <Poster collectionDetails={collectionDetails} />

                    <div className="w-full">
                        <QuickInfo collectionDetails={collectionDetails} />
                    </div>
                </div>

                <div className="my-5">
                    <Overview collectionDetails={collectionDetails} />
                </div>

                {/* Movies */}
                <h2 className="text-2xl font-bold mb-4">Movies</h2>
                <div className="flex flex-col gap-3">
                    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(9rem,2fr))] justify-items-center">
                        {collectionParts.map((movie) => (
                            <Movie key={movie.id} movie={movie} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
