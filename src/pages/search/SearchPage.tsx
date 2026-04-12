import { Searchbar } from "../../components/ui/Searchbar";
import { MovieList } from "../../components/ui/MovieList";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { useSearchMovie } from "../../hooks/use_search_movie";
import { CollectionList } from "../../components/ui/CollectionList";
import { useSearchCollection } from "../../hooks/use_search_collection";

export function SearchPage() {
    const [queryParams, setQueryParams] = useSearchParams();

    const values = new Map([
        ["movies", "Movies"],
        ["collections", "Collections"],
    ]);

    const category = queryParams.get("category") || "";
    const text = queryParams.get("query") || "";
    let [tmpCategory, setTmpCategory] = useState(category);
    let [tmpText, setTmpText] = useState(text);

    const searchMovieInfiniteQuery = useSearchMovie(category, text);
    const searchCollectionInfiniteQuery = useSearchCollection(category, text);

    const onSearch = () => {
        setQueryParams({ category: tmpCategory, query: tmpText });
    }

    useEffect(() => {
        setTmpCategory(category);
        setTmpText(text);
    }, [category, text]);

    const renderContent = () => {
        if (!text) return <span className="text-2xl">Search something...</span>;

        switch (category) {
            case "movies": return <MovieList infiniteQuery={searchMovieInfiniteQuery} />;
            case "collections": return <CollectionList infiniteQuery={searchCollectionInfiniteQuery} />;
            default: return <span className="text-2xl">Category {category} not found</span>;
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
