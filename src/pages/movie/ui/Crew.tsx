import { useNavigate } from "react-router";
import { Error } from "../../../components/ui/Error";
import { Loading } from "../../../components/ui/Loading";
import { Person } from "../../../components/ui/Person";
import { useMovieCredits } from "../../../hooks/use_credits";

interface CrewProps {
    movieId: number;
}

export function Crew({ movieId }: CrewProps) {
    const navigate = useNavigate();

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

    const seeMore = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(`/movie/${movieId}/crew`);
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
                        <Person key={`${c.name}-${c.job || ""}`} name={c.name || "Unknown"} imgPath={c.profile_path} description={c.job} />
                    ))}
                    {hintCrew && (
                        <div className="relative">
                            <div className="blur-sm select-none pointer-events-none">
                                <Person key={`${hintCrew.name}-${hintCrew.job || ""}`} name={hintCrew.name || "Unknown"} imgPath={hintCrew.profile_path} description={hintCrew.job} />
                            </div>
                            <a href={`/movie/${movieId}/crew`} onClick={seeMore}>
                                <div className="absolute top-1/2 left-1/2 -translate-1/2 cursor-pointer flex gap-1 items-center">
                                    <span className="font-semibold">See more</span>
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z">
                                        </path>
                                    </svg>
                                </div>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
