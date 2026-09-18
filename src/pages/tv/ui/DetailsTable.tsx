import type { TvSeriesDetails } from "../../../api/models";
import { useLanguages } from "../../../hooks/use_languages";
import { formatDate } from "../../../shared/dateFormatter";

interface DetailsTableProps {
    tvSeriesDetails: TvSeriesDetails;
}

export function DetailsTable({ tvSeriesDetails }: DetailsTableProps) {
    const languagesQuery = useLanguages();
    const languagesValues: Map<string, string> = new Map([...(languagesQuery.data?.map(language => [language.iso_639_1, language.english_name] as const) ?? [])]);

    const formatAvgRuntime = (minutes: Array<number>) => {
        if (minutes.length <= 0) return "N/A";

        const avgMinutes = minutes.reduce((acc, curr) => acc + curr, 0) / minutes.length
        return `${avgMinutes}m`;
    };

    return (
        <div className="bg-background-secondary/50 border-2 border-background-tertiary rounded-md divide-y-2 divide-background-tertiary">
            <div className="flex gap-6 px-6 py-2">
                <a
                    href={`https://www.themoviedb.org/tv/${tvSeriesDetails.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img className="w-10" src="/tmdb_logo.svg" />
                </a>
            </div>
            <div className="flex gap-4 justify-between px-4 py-2">
                <span className="font-semibold">Status</span>
                <span>{tvSeriesDetails.status}</span>
            </div>
            <div className="flex gap-4 justify-between px-4 py-2">
                <span className="font-semibold">First Air Date</span>
                <span>
                    {tvSeriesDetails.first_air_date ? formatDate(tvSeriesDetails.first_air_date) : "-"}
                </span>
            </div>
            <div className="flex gap-4 justify-between px-4 py-2">
                <span className="font-semibold">Last Air Date</span>
                <span>
                    {tvSeriesDetails.last_air_date ? formatDate(tvSeriesDetails.last_air_date) : "-"}
                </span>
            </div>
            <div className="flex gap-4 justify-between px-4 py-2">
                <span className="font-semibold">Avg Episode Runtime</span>
                <span>
                    {tvSeriesDetails.episode_run_time ? formatAvgRuntime(tvSeriesDetails.episode_run_time) : "-"}
                </span>
            </div>
            <div className="flex gap-4 justify-between px-4 py-2">
                <span className="font-semibold">Original Language</span>
                <span>
                    {
                        tvSeriesDetails.original_language ? (
                            languagesValues.get(tvSeriesDetails.original_language) || tvSeriesDetails.original_language.toUpperCase()
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
                        tvSeriesDetails.spoken_languages ? (
                            tvSeriesDetails.spoken_languages.map(language => <p key={language.iso_639_1}>{language.english_name}</p>)
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
                        tvSeriesDetails.production_countries ? (
                            tvSeriesDetails.production_countries.map(country => <p key={country.iso_3166_1}>{country.name}</p>)
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
                        tvSeriesDetails.production_companies ? (
                            tvSeriesDetails.production_companies.map(company => <p key={company.id}>{company.name}</p>)
                        ) : (
                            <span>-</span>
                        )
                    }
                </div>
            </div>
            <div className="flex gap-4 justify-between px-4 py-2">
                <span className="font-semibold">Networks</span>
                <div className="text-right">
                    {
                        tvSeriesDetails.networks ? (
                            tvSeriesDetails.networks.map(network => <p key={network.id}>{network.name}</p>)
                        ) : (
                            <span>-</span>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
