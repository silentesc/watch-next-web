import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getMovieDetails } from "../../api/movie/details";
import Error from "../../components/ui/Error";
import Loading from "../../components/ui/Loading";
import { useEffect, useMemo } from "react";
import { useLanguages } from "../../hooks/use_languages";
import { getMovieReleaseDates } from "../../api/movie/release_dates";
import type { ReleaseDate } from "../../api/models";

export function MovieDetailsPage() {
    const { id } = useParams();

    const movieId: number | null = id && !isNaN(Number(id)) ? Number(id) : null;

    const movieDetailsQuery = useQuery({
        queryKey: ["movieDetailsQuery", movieId],
        queryFn: () => getMovieDetails(movieId!),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: movieId !== null,
    });

    const movieReleaseDatesQuery = useQuery({
        queryKey: ["movieReleaseDatesQuery", movieId],
        queryFn: () => getMovieReleaseDates(movieId!),
        staleTime: 5 * 60 * 1000,
        retry: false,
        enabled: movieId !== null,
    });
    const releaseDates: Array<ReleaseDate> = movieReleaseDatesQuery.data?.results.find(releaseDateResult => releaseDateResult.iso_3166_1 === "US")?.release_dates || [];

    const languagesQuery = useLanguages();
    const languagesValues: Map<string, string> = new Map([...(languagesQuery.data?.map(language => [language.iso_639_1, language.english_name] as const) ?? [])]);

    const releaseYear = useMemo(() => {
        return movieDetailsQuery.data?.release_date ? new Date(movieDetailsQuery.data.release_date).getFullYear() : null;
    }, [movieDetailsQuery.data?.release_date]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!movieId) {
        return <Error message="Unknown movie" />
    }

    if (movieDetailsQuery.error) {
        return <Error message={movieDetailsQuery.error.message} />
    }
    if (movieDetailsQuery.isLoading) {
        return <Loading />
    }
    if (!movieDetailsQuery.data) {
        return <Error message="No data returned" />
    }

    const formatReleaseType = (t: number) => {
        switch (t) {
            case 1: return "Premiere";
            case 2: return "Theatrical (limited)";
            case 3: return "Theatrical";
            case 4: return "Digital";
            case 5: return "Physical";
            case 6: return "TV";
        }
    }

    const releaseTypeSvg = (t: number) => {
        switch (t) {
            case 1: return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                    <path d="M12 2l2.5 6L21 9l-5 3.5L17 20l-5-3-5 3 1-7.5L3 9l6.5-1L12 2z" />
                </svg>
            );
            case 2: return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="18" cy="12" r="1" />
                </svg>
            );
            case 3: return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <path d="M7 4v16M17 4v16" />
                    <path d="M4 8h4M4 12h4M4 16h4M20 8h-4M20 12h-4M20 16h-4" />
                </svg>
            );
            case 4: return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            );
            case 5: return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73L13 3a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73L11 21a2 2 0 0 0 2 0l7-3.27A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 11 20.73 6.96" />
                </svg>
            );
            case 6: return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <polyline points="17 2 12 7 7 2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                </svg>
            );
        }
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
                    movieDetailsQuery.data.backdrop_path && (
                        <>
                            <img
                                src={`https://image.tmdb.org/t/p/original${movieDetailsQuery.data.backdrop_path}`}
                                alt={movieDetailsQuery.data.title}
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
                                    {movieDetailsQuery.data.poster_path ? (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={`https://image.tmdb.org/t/p/w342${movieDetailsQuery.data.poster_path}`}
                                            alt={movieDetailsQuery.data.title}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-background-primary">
                                            <img className="object-cover grayscale opacity-30" src="/sad_logo.png" alt={movieDetailsQuery.data.title} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Header Info */}
                            <div className="flex-1">
                                <div className="mb-4">
                                    <span className="text-3xl sm:text-5xl font-bold">
                                        {movieDetailsQuery.data.title}
                                        <span className="text-3xl font-semibold">{releaseYear && ` (${releaseYear})`}</span>
                                    </span>
                                    {movieDetailsQuery.data.tagline && <p className="text-xl text-foreground-secondary italic">{movieDetailsQuery.data.tagline}</p>}
                                </div>

                                {/* At a glance info */}
                                <div className="flex items-center gap-6 mb-6">
                                    {movieDetailsQuery.data.vote_average !== undefined && (
                                        <div className="flex items-center gap-2">
                                            <div className={`text-4xl font-bold ${getRatingColor(movieDetailsQuery.data.vote_average)}`}>
                                                {movieDetailsQuery.data.vote_average.toFixed(1)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm text-foreground-secondary">/ 10</span>
                                                <span className="text-xs text-foreground-secondary">
                                                    {movieDetailsQuery.data.vote_count ? movieDetailsQuery.data.vote_count.toLocaleString() : "0"} votes
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {
                                        movieDetailsQuery.data.runtime ? (
                                            <div className="text-lg text-foreground-secondary">
                                                <span className="text-foreground-primary font-semibold">{formatRuntime(movieDetailsQuery.data.runtime)}</span>
                                            </div>
                                        ) : (<></>)
                                    }
                                </div>

                                {/* Genres */}
                                {movieDetailsQuery.data.genres && movieDetailsQuery.data.genres.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {movieDetailsQuery.data.genres.map((genre) => (
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
                        {movieDetailsQuery.data.overview && (
                            <div className="my-5">
                                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                                <p className="text-foreground-secondary leading-relaxed max-w-4xl">
                                    {movieDetailsQuery.data.overview}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Side info */}
                    <div className="w-full max-w-150 lg:w-auto lg:mt-45">
                        {/* Collection */}
                        {
                            movieDetailsQuery.data.belongs_to_collection && (
                                <div className="relative h-20 my-2 bg-background-secondary border-2 border-background-tertiary rounded-md">
                                    <span className="absolute z-5 top-1/2 -translate-y-1/2 text-xl p-2 font-semibold">{movieDetailsQuery.data.belongs_to_collection.name}</span>
                                    {
                                        movieDetailsQuery.data.belongs_to_collection.backdrop_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movieDetailsQuery.data.belongs_to_collection.backdrop_path}`}
                                                className="w-full h-full object-cover opacity-40"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-background-secondary opacity-40" />
                                        )
                                    }
                                </div>
                            )
                        }

                        {/* Details table */}
                        <div className="bg-background-secondary/50 border-2 border-background-tertiary rounded-md divide-y-2 divide-background-tertiary">
                            <div className="flex gap-6 px-6 py-2">
                                {movieDetailsQuery.data.imdb_id && (
                                    <a
                                        href={`https://www.imdb.com/title/${movieDetailsQuery.data.imdb_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img className="w-10" src="/imdb_logo.png" />
                                    </a>
                                )}
                                <a
                                    href={`https://www.themoviedb.org/movie/${movieDetailsQuery.data.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img className="w-10" src="/tmdb_logo.svg" />
                                </a>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Status</span>
                                <span>{movieDetailsQuery.data.status}</span>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Release Dates</span>
                                <div>
                                    {movieReleaseDatesQuery.isLoading && <Loading />}
                                    {movieReleaseDatesQuery.error && <Error message={movieReleaseDatesQuery.error.message} />}
                                    {
                                        releaseDates ? (
                                            releaseDates.map(releaseDate => {
                                                return (
                                                    <p key={formatDate(releaseDate.release_date)} className="flex items-center gap-2 justify-end">
                                                        <span title={`${formatReleaseType(releaseDate.type)} ${releaseDate.note && `(${releaseDate.note})`}`} className="flex items-center">
                                                            {releaseTypeSvg(releaseDate.type)}
                                                        </span>
                                                        <span className="whitespace-nowrap">
                                                            {formatDate(releaseDate.release_date)}
                                                        </span>
                                                    </p>
                                                )
                                            })
                                        ) : (
                                            "-"
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Budget</span>
                                <span>{movieDetailsQuery.data.budget ? formatCurrency(movieDetailsQuery.data.budget) : "-"}</span>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Revenue</span>
                                <span>{movieDetailsQuery.data.revenue ? formatCurrency(movieDetailsQuery.data.revenue) : "-"}</span>
                            </div>
                            <div className="flex gap-4 justify-between px-4 py-2">
                                <span className="font-semibold">Original Language</span>
                                <span>
                                    {
                                        movieDetailsQuery.data.original_language ? (
                                            languagesValues.get(movieDetailsQuery.data.original_language) || movieDetailsQuery.data.original_language.toUpperCase()
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
                                        movieDetailsQuery.data.spoken_languages ? (
                                            movieDetailsQuery.data.spoken_languages.map(language => <p key={language.iso_639_1}>{language.english_name}</p>)
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
                                        movieDetailsQuery.data.production_countries ? (
                                            movieDetailsQuery.data.production_countries.map(country => <p key={country.iso_3166_1}>{country.name}</p>)
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
                                        movieDetailsQuery.data.production_companies ? (
                                            movieDetailsQuery.data.production_companies.map(company => <p key={company.id}>{company.name}</p>)
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
