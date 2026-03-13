import { Searchbar } from "../../components/ui/Searchbar";

export function SearchPage() {
    const values = new Map([
        ["all", "All"],
        ["movies", "Movies"],
        ["tv_shows", "TV Shows"],
        ["people", "People"],
    ]);

    const onSearch = (searchCategory: string, searchText: string) => {
        console.log("Seach", searchCategory, searchText);
    }

    return (
        <>
            <Searchbar categories={values} onSearch={onSearch} />
        </>
    );
}
