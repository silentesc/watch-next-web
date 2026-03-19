import { Searchbar } from "../../components/ui/Searchbar";
import { useInfiniteQuery } from "@tanstack/react-query";
import { search_movie } from "../../api/search/movie";
import { MovieList } from "../../components/ui/MovieList";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export function SearchPage() {
    const [queryParams, setQueryParams] = useSearchParams();

    const values = new Map([
        ["all", "All"],
        ["movies", "Movies"],
        ["tv_shows", "TV Shows"],
        ["people", "People"],
    ]);

    const category = queryParams.get("category") || "";
    const text = queryParams.get("query") || "";
    let [tmpCategory, setTmpCategory] = useState(category);
    let [tmpText, setTmpText] = useState(text);

    const searchMovieInfiniteQuery = useInfiniteQuery({
        queryKey: ["searchMovie", category, text],
        queryFn: ({ pageParam }) => search_movie(text, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
        staleTime: 5 * 60 * 1000, // 5 minutes
        enabled: !!text && category === "movies",
        retry: false,
    });

    const onSearch = () => {
        setQueryParams({ category: tmpCategory, query: tmpText });
    }

    useEffect(() => {
        setTmpCategory(category);
        setTmpText(text);
    }, [category, text]);

    const renderContent = () => {
        if (!text) return <span className="text-2xl">Search something...</span>;

        switch (tmpCategory) {
            case "all": return <p>Not implemented yet</p>;
            case "movies": return <MovieList infiniteQuery={searchMovieInfiniteQuery} />;
            case "tv_shows": return <p>Not implemented yet</p>;
            case "people": return <p>Not implemented yet</p>;
            default: return <span className="text-2xl">Category {tmpCategory} not found</span>;
        }
    };

    return (
        <>
            {/* Search Bar */}
            <div className="mb-5">
                <Searchbar
                    category={tmpCategory}
                    text={tmpText}
                    categories={values}
                    onSearch={onSearch}
                    onCategoryChange={(category) => setTmpCategory(category)}
                    onTextChange={(text) => setTmpText(text)}
                />
            </div>

            {/* Display category */}
            {renderContent()}
        </>
    );
}
