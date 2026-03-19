import { useState } from "react";
import { Input, type InputProps } from "./Input";

interface InputPasswordProps extends Omit<InputProps, "type"> {
    placeholder?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}

export function InputPassword({ placeholder = "", required = false, onChange = () => { }, ...props }: InputPasswordProps) {
    const [inputType, setInputType] = useState<"text" | "password">("password");

    return (
        <div className="relative">
            <Input
                type={inputType}
                required={required}
                placeholder={placeholder}
                onChange={onChange}
                {...props}
            />
            <span
                onClick={() => setInputType(inputType === "password" ? "text" : "password")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer bg-background-secondary p-1 text-sm text-gray-300 hover:text-gray-400"
            >
                {inputType === "password" ? "Show" : "Hide"}
            </span>
        </div>
    )
}
