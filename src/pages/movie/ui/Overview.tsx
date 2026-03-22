import type { MovieDetails } from "../../../api/models";

interface OverviewProps {
    movieDetails: MovieDetails;
}

export function Overview({ movieDetails }: OverviewProps) {
    return (
        <>
            {
                movieDetails.overview && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-foreground-secondary leading-relaxed max-w-4xl">
                            {movieDetails.overview}
                        </p>
                    </>
                )
            }
        </>
    );
}
