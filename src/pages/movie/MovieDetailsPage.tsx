import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getMovieDetails } from "../../api/movie/details";
import Error from "../../components/ui/Error";
import Loading from "../../components/ui/Loading";
import { useEffect, useMemo } from "react";
import { useLanguages } from "../../hooks/use_languages";

export function MovieDetailsPage() {
    const { id } = useParams();

    const movieId: number | null = id && !isNaN(Number(id)) ? Number(id) : null;

    const { data, error, isLoading } = useQuery({
        queryKey: ["movieDetailsQuery", movieId],
        queryFn: () => getMovieDetails(movieId!),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: movieId !== null,
    });

    const languagesQuery = useLanguages();
    const languagesValues: Map<string, string> = new Map([...(languagesQuery.data?.map(language => [language.iso_639_1, language.english_name] as const) ?? [])]);

    const releaseYear = useMemo(() => {
        return data?.release_date ? new Date(data.release_date).getFullYear() : null;
    }, [data?.release_date]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!movieId) {
        return <Error message="Unknown movie" />
    }

    if (error) {
        return <Error message={error.message} />
    }
    if (isLoading) {
        return <Loading />
    }
    if (!data) {
        return <Error message="No data returned" />
    }

    const formatDate = (d: string) => {
        return new Date(d).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    }

    const formatCurrency = (value: number | undefined) => {
        if (!value) return "N/A";
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
    };

    const formatRuntime = (minutes: number | undefined) => {
        if (!minutes) return "N/A";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 7.5) return "text-green-500";
        if (rating >= 5) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div>
            {/* Backdrop */}
            <div className="relative h-90 overflow-hidden">
                {
                    data.backdrop_path && (
                        <>
                            <img
                                src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                                alt={data.title}
                                className="w-full h-full object-cover opacity-30"
                            />
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background-secondary" />
                        </>
                    )
                }
            </div>

            {/* Main Content */}
            <div className="px-4 -mt-80 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        {/* Most important info */}
                        <div className="flex flex-wrap gap-8">
                            {/* Poster */}
                            <div className="shrink-0">
                                <div className="w-48 h-72 rounded-lg overflow-hidden shadow-2xl border border-background-tertiary">
                                    {data.poster_path ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
                                            alt={data.title}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-background-primary">
                                            <img className="object-cover grayscale opacity-30" src="/sad_logo.png" alt={data.title} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Header Info */}
                            <div className="flex-1">
                                <div className="mb-4">
                                    <div className="flex gap-2 mb-1 sm:mb-2">
                                        <span className="text-3xl sm:text-5xl font-bold">{data.title}</span>
                                        <span className="text-3xl font-semibold">{releaseYear && `(${releaseYear})`}</span>
                                    </div>
                                    {data.tagline && <p className="text-xl text-foreground-secondary italic">{data.tagline}</p>}
                                </div>

                                {/* At a glance info */}
                                <div className="flex items-center gap-6 mb-6">
                                    {data.vote_average !== undefined && (
                                        <div className="flex items-center gap-2">
                                            <div className={`text-4xl font-bold ${getRatingColor(data.vote_average)}`}>
                                                {data.vote_average.toFixed(1)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-foreground-secondary">/ 10</span>
                                                <span className="text-xs text-foreground-secondary">
                                                    {data.vote_count ? data.vote_count.toLocaleString() : "0"} votes
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {
                                        data.runtime ? (
                                            <div className="text-lg text-foreground-secondary">
                                                <span className="text-foreground-primary font-semibold">{formatRuntime(data.runtime)}</span>
                                            </div>
                                        ) : (<></>)
                                    }
                                </div>

                                {/* Genres */}
                                {data.genres && data.genres.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {data.genres.map((genre) => (
                                            <span
                                                key={genre.id}
                                                className="px-3 py-1 bg-primary text-sm rounded-full"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Overview */}
                        {data.overview && (
                            <div className="my-5">
                                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                                <p className="text-foreground-secondary leading-relaxed max-w-4xl">
                                    {data.overview}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Side info */}
                    <div className="w-full max-w-150 lg:w-auto lg:mt-45">
                        {/* Collection */}
                        {
                            data.belongs_to_collection && (
                                <div className="relative h-20 my-2 bg-background-secondary border-2 border-background-tertiary rounded-md">
                                    <span className="absolute z-5 top-1/2 -translate-y-1/2 text-xl p-2 font-semibold">{data.belongs_to_collection.name}</span>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${data.belongs_to_collection.backdrop_path}`}
                                        className="w-full h-full object-cover opacity-40"
                                    />
                                </div>
                            )
                        }

                        {/* Details table */}
                        <div className="bg-background-secondary/50 border-2 border-background-tertiary rounded-md divide-y-2 divide-background-tertiary">
                            <div className="flex gap-6 px-6 py-2">
                                {data.imdb_id && (
                                    <a
                                        href={`https://www.imdb.com/title/${data.imdb_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img className="w-10" src="/imdb_logo.png" />
                                    </a>
                                )}
                                <a
                                    href={`https://www.themoviedb.org/movie/${data.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img className="w-10" src="/tmdb_logo.svg" />
                                </a>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Status</span>
                                <span>{data.status}</span>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Release Date</span>
                                <span>{data.release_date ? formatDate(data.release_date) : "-"}</span>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Budget</span>
                                <span>{data.budget ? formatCurrency(data.budget) : "-"}</span>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Revenue</span>
                                <span>{data.revenue ? formatCurrency(data.revenue) : "-"}</span>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Original Language</span>
                                <span>
                                    {
                                        data.original_language ? (
                                            languagesValues.get(data.original_language) || data.original_language.toUpperCase()
                                        ) : (
                                            "-"
                                        )
                                    }
                                </span>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Spoken Languages</span>
                                <div className="text-right">
                                    {
                                        data.spoken_languages ? (
                                            data.spoken_languages.map(language => <p key={language.iso_639_1}>{language.english_name}</p>)
                                        ) : (
                                            <span>-</span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Production Countries</span>
                                <div className="text-right">
                                    {
                                        data.production_countries ? (
                                            data.production_countries.map(country => <p key={country.iso_3166_1}>{country.name}</p>)
                                        ) : (
                                            <span>-</span>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Studios</span>
                                <div className="text-right">
                                    {
                                        data.production_companies ? (
                                            data.production_companies.map(company => <p key={company.id}>{company.name}</p>)
                                        ) : (
                                            <span>-</span>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
