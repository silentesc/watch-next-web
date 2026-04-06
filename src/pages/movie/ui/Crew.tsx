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

    if (movieCreditsQuery.error) {
        return <Error message={movieCreditsQuery.error.message} />;
    }
    if (movieCreditsQuery.isLoading) {
        return <Loading />;
    }
    if (!movieCreditsQuery.data) {
        return <Error message="No data returned" />;
    }

    const seeMore = () => {

    }

    const crew = movieCreditsQuery.data.crew;
    const topCrew = crew.slice(0, 5);
    const hintCrew = crew.length >= 5 ? crew[5] : undefined;

    if (crew.length === 0) {
        return <></>;
    }

    return (
        <div className="my-5 flex flex-col gap-3">
            <h2 className="text-2xl font-bold">Crew</h2>
            <div className="flex flex-col gap-3 bg-background-secondary rounded-lg">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
                    {topCrew.map((c) => (
                        <div key={`${c.name}-${c.job || ""}`} className="flex items-center gap-3 p-2 bg-background-primary rounded-md">
                            <Avatar name={c.name || "Unknown"} src={c.profile_path ? `https://image.tmdb.org/t/p/w92${c.profile_path}` : undefined} />
                            <div>
                                <p className="text-sm font-medium text-foreground-primary">{c.name}</p>
                                <span className="text-xs text-foreground-secondary">{c.job || ""}</span>
                            </div>
                        </div>
                    ))}
                    {hintCrew && (
                        <div className="relative">
                            <div className="flex items-center gap-3 p-2 bg-background-primary rounded-md blur-sm select-none">
                                <Avatar name={hintCrew.name || "Unknown"} src={hintCrew.profile_path ? `https://image.tmdb.org/t/p/w92${hintCrew.profile_path}` : undefined} />
                                <div>
                                    <p className="text-sm font-medium text-foreground-primary">{hintCrew.name}</p>
                                    <span className="text-xs text-foreground-secondary">{hintCrew.job || ""}</span>
                                </div>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer flex gap-1 items-center">
                                <span className="font-semibold" onClick={seeMore}>See more</span>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
