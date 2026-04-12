import { useMemo } from "react";
import type { CollectionOverview } from "../../api/models";
import { useNavigate } from "react-router";

interface CollectionProps {
    collection: CollectionOverview,
}

export function Collection({ collection }: CollectionProps) {
    const navigate = useNavigate();

    const movieTitle = useMemo(() => {
        return collection.name ? (collection.name.length > 30 ? collection.name.substring(0, 30) + "..." : collection.name) : "";
    }, [collection.name]);

    const onPosterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(`/collection/${collection.id}`);
    };

    return (
        <div className="relative min-w-35 max-w-45 bg-background-primary shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-background-tertiary rounded-md">
            {/* Label */}
            <div className="absolute top-1 left-1 bg-green-600/80 px-2 py-1 rounded text-xs font-semibold z-10">
                COLLECTION
            </div>

            {/* Poster */}
            <div className="aspect-2/3 cursor-pointer">
                <a href={`/collection/${collection.id}`} onClick={onPosterClick}>
                    {
                        collection.poster_path ? (
                            <img className="rounded-t-md w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w185${collection.poster_path}`} alt={collection.name} />
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <img className="rounded-t-md object-cover grayscale opacity-30" src="/sad_logo.png" alt={collection.name} />
                            </div>
                        )
                    }
                </a>
            </div>

            {/* Info */}
            <div className="flex flex-col text-center p-1">
                <span title={movieTitle}>{movieTitle}</span>
            </div>
        </div>
    );
}
