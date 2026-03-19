import { Searchbar } from "../../components/ui/Searchbar";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { search_movie } from "../../api/search/movie";
import { MovieList } from "../../components/ui/MovieList";
import { useSearchParams } from "react-router";

export function SearchPage() {
    const [queryParams, setQueryParams] = useSearchParams();

    const values = new Map([
        ["all", "All"],
        ["movies", "Movies"],
        ["tv_shows", "TV Shows"],
        ["people", "People"],
    ]);

    const [searchCategory, setSearchCategory] = useState(queryParams.get("category") || Array.from(values.keys())[0]);
    const [searchText, setSearchText] = useState(queryParams.get("query") || "");
    const [debouncedCategory, setDebouncedCategory] = useState(queryParams.get("category") || Array.from(values.keys())[0]);
    const [debouncedText, setDebouncedText] = useState(queryParams.get("query") || "");

    const searchMovieInfiniteQuery = useInfiniteQuery({
        queryKey: ["searchMovie", debouncedCategory, debouncedText],
        queryFn: ({ pageParam }) => search_movie(debouncedText, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!debouncedText && debouncedCategory === "movies",
        retry: false,
    });

    const onSearch = () => {
        setQueryParams({ category: searchCategory, query: searchText });
        setDebouncedCategory(searchCategory)
        setDebouncedText(searchText);
    }

    const renderContent = () => {
        if (!debouncedText) return <span className="text-2xl">Search something...</span>;

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
                <Searchbar
                    category={searchCategory}
                    text={searchText}
                    categories={values}
                    onSearch={onSearch}
                    onCategoryChange={(category) => setSearchCategory(category)}
                    onTextChange={(text) => setSearchText(text)}
                />
            </div>

            {/* Display category */}
            {renderContent()}
        </>
    );
}
