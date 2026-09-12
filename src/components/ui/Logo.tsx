interface LogoProps {
    width?: number;
    height?: number;
}

export function Logo({ width = 64, height = 64 }: LogoProps) {
    return (
        <img src="/logo.png" alt="Logo" style={{ width: `${width}px`, height: `${height}px` }} />
    );
}
