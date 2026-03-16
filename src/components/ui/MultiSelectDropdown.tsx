import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
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

        const [innerValues, setInnerValues] = useState(() => new Map(values));
        const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
        const [title, setTitle] = useState(renderTitle(selectedKeys));

        useImperativeHandle(ref, () => ({
            reset: () => {
                setSelectedKeys([]);
                setInnerValues(new Map(values));
            },
        }));

        const onDropdownValueSelect = (value: string) => {
            setSelectedKeys(prev => [...prev, value]);
            setInnerValues(prev => {
                const newMap = new Map(prev);
                newMap.delete(value);
                return newMap;
            });
        }

        const removeSelected = (key: string) => {
            setSelectedKeys(prev => prev.filter(k => k !== key));
            setInnerValues(() => {
                const newMap = new Map(values);
                values.forEach((value, mapKey) => {
                    if (mapKey === key || !selectedKeys.some(sk => sk === mapKey)) {
                        newMap.set(mapKey, value);
                    }
                });
                return newMap;
            });
        }

        useEffect(() => {
            setInnerValues(values);
        }, [values]);

        useEffect(() => {
            setTitle(renderTitle(selectedKeys));
            onSelect(selectedKeys);
        }, [selectedKeys]);

        return (
            <Dropdown title={title} values={innerValues} onSelect={onDropdownValueSelect} alignedRight={alignedRight} />
        );
    }
);
