interface InputTextProps {
    type?: "date" | "datetime-local" | "time" | "email" | "number" | "password" | "search" | "tel" | "text" | "url";
    placeholder?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
}

function InputText({ type = "text", placeholder = "", required = false, onChange = () => { }, ...props }: InputTextProps) {
    return (
        <>
            <input
                type={type}
                required={required}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full border-background-tertiary border-2 p-2 outline-none bg-background-secondary"
                {...props}
            />

        </>
    )
}

export default InputText;
