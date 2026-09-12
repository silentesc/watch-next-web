export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> {
    type?: "date" | "datetime-local" | "time" | "email" | "number" | "password" | "search" | "tel" | "text" | "url" | "number";
    placeholder?: string;
    value?: string | number | readonly string[];
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}

export function Input({ type = "text", placeholder = "", value = "", required = false, onChange = () => { }, ...props }: InputProps) {
    return (
        <input
            value={value}
            type={type}
            required={required}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full border-background-tertiary border-2 p-2 outline-none bg-background-secondary"
            {...props}
        />
    )
}
