import { Searchbar } from "../../components/ui/Searchbar";
import { useState } from "react";
import { Movies } from "./ui/Movies";

export function SearchPage() {
    const values = new Map([
        ["all", "All"],
        ["movies", "Movies"],
        ["tv_shows", "TV Shows"],
        ["people", "People"],
    ]);

    const [searchCategory, setSearchCategory] = useState(Array.from(values.keys())[0])
    const [searchText, setSearchText] = useState("");

    const onSearch = (searchCategory: string, searchText: string) => {
        setSearchCategory(searchCategory)
        setSearchText(searchText);
    }

    const renderContent = () => {
        if (!searchText) return <span className="text-2xl">Search something...</span>;

        switch (searchCategory) {
            case "all": return <p>Not implemented yet</p>;
            case "movies": return <Movies searchText={searchText} />;
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
