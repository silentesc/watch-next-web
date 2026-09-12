import { useNavigate } from "react-router";
import type { MovieDetails } from "../../../api/models";
import { Button } from "../../../components/ui/Button";

interface CollectionProps {
    movieDetails: MovieDetails;
}

export function Collection({ movieDetails }: CollectionProps) {
    const navigate = useNavigate();

    const viewCollection = () => {
        navigate(`/collection/${movieDetails.belongs_to_collection!.id}`);
    }

    return (
        <>
            {
                movieDetails.belongs_to_collection && (
                    <div className="relative h-20 bg-background-secondary border-2 border-background-tertiary rounded-md">
                        <span className="absolute z-5 top-1/2 -translate-y-1/2 left-3 text-xl font-semibold">{movieDetails.belongs_to_collection.name}</span>
                        <div className="absolute z-5 top-1/2 -translate-y-1/2 end-3">
                            <Button value="View" onClick={viewCollection} />
                        </div>
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
