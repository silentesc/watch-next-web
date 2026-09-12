interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    value: string | React.ReactElement;
    type?: "button" | "submit" | "reset";
    alignment?: "left" | "center" | "right";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({ value, type = "button", alignment = "center", onClick = () => { }, ...props }: ButtonProps) {
    return (
        <>
            <button
                onClick={onClick}
                type={type}
                className={
                    `w-full border-background-tertiary border-2 p-2 outline-none bg-background-secondary hover:bg-background-tertiary hover:cursor-pointer 
                    ${alignment === "left" && "text-left"}
                    ${alignment === "center" && "text-center"}
                    ${alignment === "right" && "text-right"}`
                }
                {...props}
            >
                {value}
            </button>
        </>
    )
}
