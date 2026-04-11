import { Error } from "../../components/ui/Error";
import { Loading } from "../../components/ui/Loading";
import { MovieListVertical } from "../../components/ui/MovieListVertical";
import { useNavigate } from "react-router";
import { useDiscoverMovies } from "../../hooks/use_discover_movies";

export function DiscoverPage() {
    const navigate = useNavigate();

    const discoverMovieQuery = useDiscoverMovies({ sort_by: "popularity.desc" });

    const discoverMovies = () => {
        navigate("movie");
    }

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="my-3 flex gap-1 items-center cursor-pointer w-max" onClick={discoverMovies}>
                    <span className="text-2xl font-bold">Popular Movies</span>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z">
                        </path>
                    </svg>
                </div>

                {/* Check for stuff */}
                {
                    discoverMovieQuery.error
                        ? <Error message={discoverMovieQuery.error.message} />
                        : discoverMovieQuery.isLoading
                            ? <Loading />
                            : !discoverMovieQuery.data
                                ? <Error message="No data returned" />
                                : <MovieListVertical movies={discoverMovieQuery.data.pages[0].results} onSeeMoreClick={discoverMovies} />
                }
            </div>
        </>
    );
}
