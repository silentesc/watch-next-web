interface LogoProps {
    width?: number;
    height?: number;
}

function Logo({ width = 14, height = 14}: LogoProps) {
    return (
        <img src="/logo.svg" alt="Logo" className={`w-${width} h-${height}`} />
    );
}

export default Logo;
