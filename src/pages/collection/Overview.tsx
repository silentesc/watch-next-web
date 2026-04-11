import type { CollectionDetails } from "../../api/models";

interface OverviewProps {
    collectionDetails: CollectionDetails;
}

export function Overview({ collectionDetails }: OverviewProps) {
    return (
        <>
            {
                collectionDetails.overview && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Overview</h2>
                        <p className="text-foreground-secondary leading-relaxed">
                            {collectionDetails.overview}
                        </p>
                    </>
                )
            }
        </>
    );
}
