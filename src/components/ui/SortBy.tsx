import { Button } from "./Button";
import { Dropdown } from "./Dropdown";

interface SortByProps {
    sortByKey: string;
    isAsc: boolean;
    sortByValues: Map<string, string>;
    onSortByChange: (sortBy: string) => void;
    onAscChange: (isAsc: boolean) => void;
    alignedRight?: boolean;
    descDefault?: boolean;
}

export function SortBy({ sortByKey, isAsc, sortByValues, onSortByChange, onAscChange, alignedRight = false }: SortByProps) {
    return (
        <div className="flex">
            <div className="flex space-x-4">
            </div>

            <Button onClick={() => onAscChange(!isAsc)} value={
                <svg
                    className={`w-5 h-5 transition-colors duration-200 ${!isAsc && "rotate-180"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v14m0 0l-4-4m4 4l4-4" />
                </svg>
            } />
            <Dropdown title={sortByValues.get(sortByKey) || sortByKey} values={sortByValues} onSelect={key => onSortByChange(key)} alignedRight={alignedRight} />
        </div>
    );
}
