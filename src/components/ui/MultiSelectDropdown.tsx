import { useMemo } from "react";
import { Dropdown } from "./Dropdown";

interface MultiSelectDropdownProps {
    placeholder: string;
    selectedKeys: Array<string>;
    values: Map<string, string>;
    onSelect: (key: string) => void;
    onDeselect: (key: string) => void;
    alignedRight?: boolean;
}

export function MultiSelectDropdown({ placeholder, selectedKeys, values, onSelect, onDeselect, alignedRight = false }: MultiSelectDropdownProps) {
    const renderTitle = (keys: string[]) => {
        if (keys.length === 0) {
            return <span className="opacity-50">{placeholder}</span>
        }

        return (
            <div className="flex flex-wrap gap-1">
                {
                    [...keys].map(key => (
                        <div key={key} className="flex items-center gap-2 px-2 py-1 bg-background-primary rounded-md border-2 border-background-tertiary">
                            <span className="text-sm">{values.get(key)}</span>
                            <span onClick={() => removeSelected(key)} className="p-1 text-gray-300 hover:text-error hover:bg-error/30 rounded transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </span>
                        </div>
                    ))
                }
            </div>
        );
    }

    const title = useMemo(() => {
        return renderTitle(selectedKeys);
    }, [selectedKeys, values]);

    const innerValues = useMemo(() => {
        const map = new Map(values);
        selectedKeys.forEach(k => map.delete(k));
        return map;
    }, [values, selectedKeys]);

    const onDropdownValueSelect = (key: string) => {
        onSelect(key);
    }

    const removeSelected = (key: string) => {
        onDeselect(key)
    }

    return (
        <Dropdown title={title} values={innerValues} onSelect={onDropdownValueSelect} alignedRight={alignedRight} />
    );
};
