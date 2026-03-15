import { Searchbar } from "../../components/ui/Searchbar";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { search_movie } from "../../api/search/movie";
import { MovieList } from "../../components/ui/MovieList";

export function SearchPage() {
    const values = new Map([
        ["all", "All"],
        ["movies", "Movies"],
        ["tv_shows", "TV Shows"],
        ["people", "People"],
    ]);

    const [searchCategory, setSearchCategory] = useState(Array.from(values.keys())[0])
    const [searchText, setSearchText] = useState("");

    const searchMovieInfiniteQuery = useInfiniteQuery({
        queryKey: ["searchMovie", searchText],
        queryFn: ({ pageParam }) => search_movie(searchText, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!searchText,
    });

    const onSearch = (searchCategory: string, searchText: string) => {
        setSearchCategory(searchCategory)
        setSearchText(searchText);
    }

    const renderContent = () => {
        if (!searchText) return <span className="text-2xl">Search something...</span>;

        switch (searchCategory) {
            case "all": return <p>Not implemented yet</p>;
            case "movies": return <MovieList infiniteQuery={searchMovieInfiniteQuery} />;
            case "tv_shows": return <p>Not implemented yet</p>;
            case "people": return <p>Not implemented yet</p>;
            default: return <span className="text-2xl">Category {searchCategory} not found</span>;
        }
    };

    return (
        <>
            {/* Search Bar */}
            <div className="mb-5">
                <Searchbar categories={values} onSearch={onSearch} />
            </div>

            {/* Display category */}
            {renderContent()}
        </>
    );
}
