import type { CollectionDetails } from "../../api/models";

interface PosterProps {
    collectionDetails: CollectionDetails;
}

export function Poster({ collectionDetails }: PosterProps) {
    return (
        <div className="w-48 h-72 rounded-lg overflow-hidden shadow-2xl border border-background-tertiary shrink-0">
            {collectionDetails.poster_path ? (
                <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w300${collectionDetails.poster_path}`}
                    alt={collectionDetails.name}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-background-primary">
                    <img className="object-cover grayscale opacity-30" src="/sad_logo.png" alt={collectionDetails.name} />
                </div>
            )}
        </div>
    );
}
