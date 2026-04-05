import { useState } from "react";
import { Error } from "../../../components/ui/Error";
import { Loading } from "../../../components/ui/Loading";
import { useMovieCredits } from "../../../hooks/use_credits";

interface CrewProps {
    movieId: number;
}

function Avatar({ name, src }: { name: string; src?: string }) {
    const initials = name.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
    return (
        <div className="shrink-0 w-12 h-12 rounded-full bg-background-tertiary flex items-center justify-center text-sm font-medium text-foreground-primary overflow-hidden">
            {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
        </div>
    );
}

export function Crew({ movieId }: CrewProps) {
    const movieCreditsQuery = useMovieCredits(movieId);
    const [showAll, setShowAll] = useState(false);

    if (movieCreditsQuery.error) {
        return <Error message={movieCreditsQuery.error.message} />;
    }
    if (movieCreditsQuery.isLoading) {
        return (
            <div className="space-y-2" aria-busy>
                <Loading />
            </div>
        );
    }
    if (!movieCreditsQuery.data) {
        return <Error message="No data returned" />;
    }

    const crew = movieCreditsQuery.data.crew;

    return (
        <div className="my-5 flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Crew</h2>
                <span className="cursor-pointer" onClick={() => setShowAll(!showAll)}>{showAll ? "Show less" : `Show all ${crew.length}`}</span>
            </div>
            <div className="flex flex-col gap-3 bg-background-secondary rounded-lg">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
                    {crew.slice(0, showAll ? crew.length : 6).map((c) => (
                        <div key={`${c.name}-${c.job || ""}`} className="flex items-center gap-3 p-2 bg-background-primary rounded-md">
                            <Avatar name={c.name || "Unknown"} src={c.profile_path ? `https://image.tmdb.org/t/p/w92${c.profile_path}` : undefined} />
                            <div>
                                <p className="text-sm font-medium text-foreground-primary">{c.name}</p>
                                <span className="text-xs text-foreground-secondary">{c.job || ""}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
