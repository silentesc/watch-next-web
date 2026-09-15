import type { TvSeriesDetails } from "../../../api/models";

interface OverviewProps {
    tvSeriesDetails: TvSeriesDetails;
}

export function Overview({ tvSeriesDetails }: OverviewProps) {
    return (
        <>
            {
                tvSeriesDetails.overview && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-foreground-secondary leading-relaxed max-w-4xl">
                            {tvSeriesDetails.overview}
                        </p>
                    </>
                )
            }
        </>
    );
}
