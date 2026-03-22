import { useQuery } from "@tanstack/react-query";
import type { MovieDetails, ReleaseDate } from "../../../api/models";
import { getMovieReleaseDates } from "../../../api/movie/release_dates";
import Loading from "../../../components/ui/Loading";
import Error from "../../../components/ui/Error";
import { useLanguages } from "../../../hooks/use_languages";

interface DetailsTableProps {
    movieDetails: MovieDetails;
}

export function DetailsTable({ movieDetails }: DetailsTableProps) {
    const movieReleaseDatesQuery = useQuery({
        queryKey: ["movieReleaseDatesQuery", movieDetails.id],
        queryFn: () => getMovieReleaseDates(movieDetails.id),
        staleTime: 5 * 60 * 1000,
        retry: false,
    });
    const releaseDates: Array<ReleaseDate> = movieReleaseDatesQuery.data?.results.find(releaseDateResult => releaseDateResult.iso_3166_1 === "US")?.release_dates || [];

    const languagesQuery = useLanguages();
    const languagesValues: Map<string, string> = new Map([...(languagesQuery.data?.map(language => [language.iso_639_1, language.english_name] as const) ?? [])]);

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

    return (
        <div className="bg-background-secondary/50 border-2 border-background-tertiary rounded-md divide-y-2 divide-background-tertiary">
            <div className="flex gap-6 px-6 py-2">
                {movieDetails.imdb_id && (
                    <a
                        href={`https://www.imdb.com/title/${movieDetails.imdb_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img className="w-10" src="/imdb_logo.png" />
                    </a>
                )}
                <a
                    href={`https://www.themoviedb.org/movie/${movieDetails.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img className="w-10" src="/tmdb_logo.svg" />
                </a>
            </div>
            <div className="flex gap-4 justify-between px-4 py-2">
                <span className="font-semibold">Status</span>
                <span>{movieDetails.status}</span>
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
                <span>{movieDetails.budget ? formatCurrency(movieDetails.budget) : "-"}</span>
            </div>
            <div className="flex gap-4 justify-between px-4 py-2">
                <span className="font-semibold">Revenue</span>
                <span>{movieDetails.revenue ? formatCurrency(movieDetails.revenue) : "-"}</span>
            </div>
            <div className="flex gap-4 justify-between px-4 py-2">
                <span className="font-semibold">Original Language</span>
                <span>
                    {
                        movieDetails.original_language ? (
                            languagesValues.get(movieDetails.original_language) || movieDetails.original_language.toUpperCase()
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
                        movieDetails.spoken_languages ? (
                            movieDetails.spoken_languages.map(language => <p key={language.iso_639_1}>{language.english_name}</p>)
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
                        movieDetails.production_countries ? (
                            movieDetails.production_countries.map(country => <p key={country.iso_3166_1}>{country.name}</p>)
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
                        movieDetails.production_companies ? (
                            movieDetails.production_companies.map(company => <p key={company.id}>{company.name}</p>)
                        ) : (
                            <span>-</span>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
