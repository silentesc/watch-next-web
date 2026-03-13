import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Dropdown } from "./Dropdown";

interface SearchbarProps {
    categories: Map<string, string>,
    onSearch: (searchCategory: string, searchText: string) => void,
}

export function Searchbar({ categories, onSearch }: SearchbarProps) {
    const firstCategoryKey = Array.from(categories.keys())[0];

    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategory] = useState(categories.get(firstCategoryKey) || firstCategoryKey);

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!searchText) {
            return;
        }
        onSearch(searchCategory, searchText);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="sm:flex sm:gap-1">
                <div className="flex gap-1 w-full">
                    <Dropdown title={searchCategory} values={categories} onSelect={value => setSearchCategory(value)} />
                    <Input type="text" placeholder="Search" onChange={e => setSearchText(e.target.value)} />
                </div>
                <div className="sm:w-35 mt-1 sm:mt-0">
                    <Button value="Search" type="submit" />
                </div>
            </div>
        </form>
    );
}
