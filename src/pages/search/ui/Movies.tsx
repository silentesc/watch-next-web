import { useQuery } from "@tanstack/react-query";
import { search_movie } from "../../../api/search/movie";
import { Movie } from "../../../components/ui/Movie";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";

interface MoviesProps {
    searchText: string;
}

export function Movies({ searchText }: MoviesProps) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["searchMovie", searchText],
        queryFn: () => search_movie(searchText),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
        enabled: !!searchText,
    });

    const moviesElements = (
        data ? (
            data.results.sort((a, b) => b.popularity - a.popularity).map((movie) => <Movie key={movie.id} movie={movie} />)
        ) : (
            <></>
        )
    )

    return (
        <>
            {/* Error */}
            {error && <Error message={error.message} />}

            {/* Loading */}
            {isLoading && <Loading />}

            {/* Content */}
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] justify-items-center">
                {moviesElements}
            </div>
        </>
    );
}
