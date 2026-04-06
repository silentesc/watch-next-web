interface PersonProps {
    imgPath?: string;
    name: string;
    description?: string;
}

function Avatar({ name, src }: { name: string; src?: string }) {
    const initials = name.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase();
    return (
        <div className="shrink-0 w-12 h-12 rounded-full bg-background-tertiary flex items-center justify-center text-sm font-medium text-foreground-primary overflow-hidden">
            {src ? <img src={src} alt={name} className="w-full h-full object-cover" /> : initials}
        </div>
    );
}

export function Person({ imgPath, name, description }: PersonProps) {
    return (
        <div className="flex items-center gap-3 p-2 bg-background-primary rounded-md">
            <Avatar name={name} src={imgPath ? `https://image.tmdb.org/t/p/w92${imgPath}` : undefined} />
            <div>
                <p className="text-sm font-medium text-foreground-primary">{name}</p>
                <span className="text-xs text-foreground-secondary">{description || ""}</span>
            </div>
        </div>
    );
}
