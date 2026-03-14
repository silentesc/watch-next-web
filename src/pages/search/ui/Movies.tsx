import { useQuery } from "@tanstack/react-query";
import { search_movie } from "../../../api/search/movie";
import { Movie } from "../../../components/ui/Movie";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";
import { SortBy } from "../../../components/ui/SortBy";
import { useEffect, useState, type JSX } from "react";

interface MoviesProps {
    searchText: string;
}

export function Movies({ searchText }: MoviesProps) {
    const sortByValues = new Map([
        ["popularity", "Popularity"],
        ["release_date", "Release Date"],
        ["original_title", "Original Title"],
        ["vote_average", "Vote Average"],
        ["vote_count", "Vote Count"],
    ]);

    const { data, error, isLoading } = useQuery({
        queryKey: ["searchMovie", searchText],
        queryFn: () => search_movie(searchText),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: false,
        enabled: !!searchText,
    });

    const [currentSortBy, setCurrentSortBy] = useState(Array.from(sortByValues.keys())[0]);
    const [moviesElements, setMoviesElements] = useState<JSX.Element | JSX.Element[]>((<></>));

    useEffect(() => {
        if (isLoading) return;
        if (!data) return;
        if (error) return;

        loadData();
    }, [data]);

    const onSortByChange = (sortBy: string) => {
        if (isLoading) return;
        if (!data) return;
        if (error) return;

        setCurrentSortBy(sortBy);
        loadData(sortBy);
    }

    const loadData = (sortByOverride?: string) => {
        if (isLoading) return;
        if (!data) return;
        if (error) return;

        const sortByKey = (sortByOverride ? sortByOverride : currentSortBy).split(".")[0];
        const isAsc = (sortByOverride ? sortByOverride : currentSortBy).endsWith(".asc");

        switch (sortByKey) {
            case "popularity":
                setMoviesElements((data.results.sort((a, b) => {
                    return isAsc ? a.popularity - b.popularity : b.popularity - a.popularity;
                }).map((movie) => <Movie key={movie.id} movie={movie} />)))
                break;
            case "release_date":
                setMoviesElements((data.results.sort((a, b) => {
                    if (a.release_date === b.release_date) {
                        return 0;
                    }
                    return isAsc ? (a.release_date > b.release_date ? 1 : -1) : a.release_date < b.release_date ? 1 : -1;
                }).map((movie) => <Movie key={movie.id} movie={movie} />)));
                break;
            case "original_title":
                setMoviesElements((data.results.sort((a, b) => {
                    if (a.original_title === b.original_title) {
                        return 0;
                    }
                    return isAsc ? (a.original_title > b.original_title ? 1 : -1) : a.original_title < b.original_title ? 1 : -1;
                }).map((movie) => <Movie key={movie.id} movie={movie} />)));
                break;
            case "vote_average":
                setMoviesElements((data.results.sort((a, b) => {
                    return isAsc ? a.vote_average - b.vote_average : b.vote_average - a.vote_average;
                }).map((movie) => <Movie key={movie.id} movie={movie} />)))
                break;
            case "vote_count":
                setMoviesElements((data.results.sort((a, b) => {
                    return isAsc ? a.vote_count - b.vote_count : b.vote_count - a.vote_count;
                }).map((movie) => <Movie key={movie.id} movie={movie} />)))
                break;
        }
    };

    return (
        <>
            {/* Bar */}
            <div className="my-2 flex justify-between">
                <span className="text-2xl">Movies</span>
                <SortBy sortByValues={sortByValues} onChange={onSortByChange} alignedRight />
            </div>

            {/* Error */}
            {error && <Error message={error.message} />}

            {/* Loading */}
            {isLoading && <Loading />}

            {/* Content */}
            <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(9rem,2fr))] justify-items-center">
                {moviesElements}
            </div>
        </>
    );
}
