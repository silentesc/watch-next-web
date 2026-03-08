interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
    value: string | React.ReactElement;
    type?: "button" | "submit" | "reset";
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ value, type = "button", onClick = () => { }, ...props }: ButtonProps) {
    return (
        <>
            <button onClick={onClick} type={type} className="w-full border-background-tertiary border-2 p-2 outline-none bg-background-secondary hover:bg-background-tertiary hover:cursor-pointer" {...props}>
                {value}
            </button>
        </>
    )
}

export default Button;
