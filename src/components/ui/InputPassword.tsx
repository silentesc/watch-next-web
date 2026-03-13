import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}

function InputPassword({ placeholder = "", required = false, onChange = () => { }, ...props }: InputProps) {
    const [inputType, setInputType] = useState("password");

    return (
        <div className="relative">
            <input
                type={inputType}
                required={required}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border-background-tertiary border-2 p-2 outline-none bg-background-secondary"
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

export default InputPassword;
