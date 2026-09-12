import { useNavigate, useParams } from "react-router";
import { useMovieCredits } from "../../hooks/use_credits";
import { Error } from "../../components/ui/Error";
import { Loading } from "../../components/ui/Loading";
import { Person } from "../../components/ui/Person";
import { useMovieDetails } from "../../hooks/use_movie_details";

export function CrewPage() {
    const navigate = useNavigate();

    const { id } = useParams();

    const movieId: number | null = id && !isNaN(Number(id)) ? Number(id) : null;

    if (!movieId) {
        return <Error message="Unknown movie" />
    }

    const movieDetailsQuery = useMovieDetails(movieId);
    const creditsQuery = useMovieCredits(movieId);

    if (movieDetailsQuery.error) {
        return <Error message={movieDetailsQuery.error.message} />
    }
    if (movieDetailsQuery.isLoading) {
        return <Loading />
    }
    if (!movieDetailsQuery.data) {
        return <Error message="No data returned" />
    }

    if (creditsQuery.error) {
        return <Error message={creditsQuery.error.message} />
    }
    if (creditsQuery.isLoading) {
        return <Loading />
    }
    if (!creditsQuery.data) {
        return <Error message="No data returned" />
    }

    const movieDetails = movieDetailsQuery.data;
    const crew = creditsQuery.data.crew;

    const backToMovie = () => {
        navigate(`/movie/${movieDetails.id}`);
    }

    return (
        <div className="flex flex-col gap-3">
            {/* Back button */}
            <div className="my-3 flex gap-1 items-center cursor-pointer" onClick={backToMovie}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 rotate-180">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z">
                    </path>
                </svg>
                <span className="text-lg text-nowrap">Back to {movieDetails.title}</span>
            </div>
            <h2 className="text-2xl font-bold">Crew</h2>
            <div className="flex flex-col gap-3 bg-background-secondary rounded-lg">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
                    {crew.map((c) => <Person key={`${c.name}-${c.job || ""}`} name={c.name || "Unknown"} imgPath={c.profile_path} description={c.job} />)}
                </div>
            </div>
        </div>
    );
}
