import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { Dropdown } from "./Dropdown";

interface MultiSelectDropdownProps {
    placeholder: string;
    values: Map<string, string>;
    onSelect: (keys: string[]) => void;
    alignedRight?: boolean;
}

export interface MultiSelectDropdownHandle {
    reset: () => void;
}

export const MultiSelectDropdown = forwardRef<MultiSelectDropdownHandle, MultiSelectDropdownProps>(
    ({ placeholder, values, onSelect, alignedRight = false }, ref) => {
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

        const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
        const [title, setTitle] = useState(renderTitle(selectedKeys));
        const innerValues = useMemo(() => {
            const map = new Map(values);
            selectedKeys.forEach(k => map.delete(k));
            return map;
        }, [values, selectedKeys]);

        useImperativeHandle(ref, () => ({
            reset: () => {
                setSelectedKeys([]);
            },
        }));

        const onDropdownValueSelect = (value: string) => {
            setSelectedKeys(prev => [...prev, value]);
        }

        const removeSelected = (key: string) => {
            setSelectedKeys(prev => prev.filter(k => k !== key));
        }

        useEffect(() => {
            setTitle(renderTitle(selectedKeys));
            onSelect(selectedKeys);
        }, [selectedKeys]);

        return (
            <Dropdown title={title} values={innerValues} onSelect={onDropdownValueSelect} alignedRight={alignedRight} />
        );
    }
);
