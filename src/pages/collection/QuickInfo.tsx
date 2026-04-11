import type { CollectionDetails } from "../../api/models";

interface QuickInfo {
    collectionDetails: CollectionDetails;
}

export function QuickInfo({ collectionDetails }: QuickInfo) {
    return (
        <>
            {/* Name */}
            <span className="mb-4 text-3xl sm:text-5xl font-bold">
                {collectionDetails.name}
            </span>

            {/* At a glance */}
            <div className="flex items-center gap-6 mb-6 justify-center sm:justify-start">
                <div className="text-lg text-foreground-secondary">
                    <span className="text-foreground-primary font-semibold">{collectionDetails.parts.length} Movies</span>
                </div>
            </div>
        </>
    );
}
