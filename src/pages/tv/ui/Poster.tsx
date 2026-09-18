import type { TvSeriesDetails } from "../../../api/models";

interface PosterProps {
    tvSeriesDetails: TvSeriesDetails;
}

export function Poster({ tvSeriesDetails }: PosterProps) {
    return (
        <div className="w-48 h-72 rounded-lg overflow-hidden shadow-2xl border border-background-tertiary shrink-0">
            {tvSeriesDetails.poster_path ? (
                <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w300${tvSeriesDetails.poster_path}`}
                    alt={tvSeriesDetails.name}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-background-primary">
                    <img className="object-cover grayscale opacity-30" src="/sad_logo.png" alt={tvSeriesDetails.name} />
                </div>
            )}
        </div>
    );
}
