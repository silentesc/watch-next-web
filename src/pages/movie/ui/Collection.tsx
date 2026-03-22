import type { MovieDetails } from "../../../api/models";

interface CollectionProps {
    movieDetails: MovieDetails;
}

export function Collection({ movieDetails }: CollectionProps) {
    return (
        <>
            {
                movieDetails.belongs_to_collection && (
                    <div className="relative h-20 bg-background-secondary border-2 border-background-tertiary rounded-md">
                        <span className="absolute z-5 top-1/2 -translate-y-1/2 text-xl p-2 font-semibold">{movieDetails.belongs_to_collection.name}</span>
                        {
                            movieDetails.belongs_to_collection.backdrop_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movieDetails.belongs_to_collection.backdrop_path}`}
                                    className="w-full h-full object-cover opacity-40"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-background-secondary opacity-40" />
                            )
                        }
                    </div>
                )
            }
        </>
    );
}
