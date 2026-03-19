import { Input } from "./Input";
import { Button } from "./Button";
import { Dropdown } from "./Dropdown";

interface SearchbarProps {
    category?: string;
    text?: string;
    categories: Map<string, string>;
    onSearch: () => void;
    onCategoryChange: (category: string) => void;
    onTextChange: (text: string) => void;
}

export function Searchbar({ category, text = "", categories, onSearch, onCategoryChange, onTextChange }: SearchbarProps) {
    if (!category) category = Array.from(categories.keys())[0];

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text) {
            return;
        }
        onSearch();
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="sm:flex sm:gap-1">
                <div className="flex gap-1 w-full">
                    <Dropdown title={categories.get(category) || category} values={categories} onSelect={key => onCategoryChange(key)} />
                    <Input type="text" value={text} placeholder="Search" onChange={e => onTextChange(e.target.value)} />
                </div>
                <div className="sm:w-35 mt-1 sm:mt-0">
                    <Button value="Search" type="submit" />
                </div>
            </div>
        </form>
    );
}
