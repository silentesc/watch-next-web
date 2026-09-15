import { useState, useEffect, useMemo } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { DatePicker } from "../../../components/ui/DatePicker";
import { useLanguages } from "../../../hooks/use_languages";
import { MultiSelectDropdown } from "../../../components/ui/MultiSelectDropdown";
import { Dropdown } from "../../../components/ui/Dropdown";
import { useGenreTvSeries } from "../../../hooks/use_genre_tv_series";

export interface TvSeriesFilters {
    firstAirDateFrom: Date | undefined,
    firstAirDateTo: Date | undefined,
    runtimeFrom: number | undefined,
    runtimeTo: number | undefined,
    tmdbRatingFrom: number | undefined,
    tmdbRatingTo: number | undefined,
    tmdbVoteCountFrom: number | undefined,
    tmdbVoteCountTo: number | undefined,
    withStatus: string | undefined,
    withGenres: string | undefined,
    withoutGenres: string | undefined,
    originalLanguage: string | undefined,
}

interface FiltersProps {
    isOpen: boolean,
    filters: TvSeriesFilters;
    onFiltersChange: (filters: TvSeriesFilters) => void;
    onClose: () => void;
}

const isFiltersValid = (filters: TvSeriesFilters): boolean => {
    if (filters.firstAirDateFrom && filters.firstAirDateTo && filters.firstAirDateFrom > filters.firstAirDateTo) return false;
    if (filters.runtimeFrom !== undefined && filters.runtimeTo !== undefined && filters.runtimeFrom > filters.runtimeTo) return false;
    if (filters.tmdbRatingFrom !== undefined && filters.tmdbRatingTo !== undefined && filters.tmdbRatingFrom > filters.tmdbRatingTo) return false;
    if (filters.tmdbVoteCountFrom !== undefined && filters.tmdbVoteCountTo !== undefined && filters.tmdbVoteCountFrom > filters.tmdbVoteCountTo) return false;
    return true;
};

export function TvSeriesFilters({ isOpen, filters, onFiltersChange, onClose }: FiltersProps) {
    const [firstAirDateFrom, setFirstAirDateFrom] = useState<Date | undefined>(filters.firstAirDateFrom);
    const [firstAirDateTo, setFirstAirDateTo] = useState<Date | undefined>(filters.firstAirDateTo);
    const [runtimeFrom, setRuntimeFrom] = useState<number | undefined>(filters.runtimeFrom);
    const [runtimeTo, setRuntimeTo] = useState<number | undefined>(filters.runtimeTo);
    const [tmdbRatingFrom, setTmdbRatingFrom] = useState<number | undefined>(filters.tmdbRatingFrom);
    const [tmdbRatingTo, setTmdbRatingTo] = useState<number | undefined>(filters.tmdbRatingTo);
    const [tmdbVoteCountFrom, setTmdbVoteCountFrom] = useState<number | undefined>(filters.tmdbVoteCountFrom);
    const [tmdbVoteCountTo, setTmdbVoteCountTo] = useState<number | undefined>(filters.tmdbVoteCountTo);
    const [withStatus, setWithStatus] = useState<Array<string>>(filters.withGenres?.split(",") || []);
    const [withGenres, setWithGenres] = useState<Array<string>>(filters.withGenres?.split(",") || []);
    const [withoutGenres, setWithoutGenres] = useState<Array<string>>(filters.withoutGenres?.split(",") || []);
    const [originalLanguage, setOriginalLanguage] = useState<string>(filters.originalLanguage || "*");

    const languages = useLanguages();
    const languagesValues: Map<string, string> = new Map([
        ["*", "All Languages"] as const,
        ...(languages.data?.sort((a, b) => {
            if (a.english_name === b.english_name) return 0;
            if (a.english_name > b.english_name) return 1;
            return -1;
        }).map(language => [language.iso_639_1, language.english_name] as const) ?? [])
    ]);

    const genres = useGenreTvSeries();
    const genresValues: Map<string, string> = useMemo(() => {
        return new Map(genres.data?.genres.map(genre => [genre.id.toString(), genre.name]));
    }, [genres.data]);

    const statusesValues: Map<string, string> = new Map([
        ["0", "Returning Series"],
        ["1", "Planned"],
        ["2", "In Production"],
        ["3", "Ended"],
        ["4", "Canceled"],
        ["5", "Pilot"],
    ])

    const resetFilters = () => {
        setFirstAirDateFrom(undefined);
        setFirstAirDateTo(undefined);
        setRuntimeFrom(undefined);
        setRuntimeTo(undefined);
        setTmdbRatingFrom(undefined);
        setTmdbRatingTo(undefined);
        setTmdbVoteCountFrom(undefined);
        setTmdbVoteCountTo(undefined);
        setWithStatus([]);
        setWithGenres([]);
        setWithoutGenres([]);
        setOriginalLanguage("*");
    }

    const applyFilters = () => {
        const filters: TvSeriesFilters = {
            firstAirDateFrom,
            firstAirDateTo,
            runtimeFrom,
            runtimeTo,
            tmdbRatingFrom,
            tmdbRatingTo,
            tmdbVoteCountFrom,
            tmdbVoteCountTo,
            withStatus: withStatus.join(","),
            withGenres: withGenres.join(","),
            withoutGenres: withoutGenres.join(","),
            originalLanguage,
        };

        if (!isFiltersValid(filters)) {
            return;
        }

        if (filters.originalLanguage === "*") filters.originalLanguage = undefined;

        onFiltersChange(filters);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 flex justify-end z-1000 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

            <div onClick={() => onClose()} className="absolute w-full h-full bg-background-secondary/50">
            </div>

            {/* Filters */}
            <div className={`m-2 p-5 max-w-115 bg-background-primary flex flex-col gap-6 overflow-scroll transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex">
                    <div className="m-auto">
                    </div>
                    {/* x button */}
                    <svg onClick={() => onClose()} className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <div className="flex gap-1">
                    <Button value="Apply Filters" onClick={applyFilters} />
                    <Button value="Reset Filters" onClick={resetFilters} />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">First Air Date</span>
                    <div className="relative flex gap-1">
                        <div className="flex flex-col w-full">
                            From
                            <DatePicker value={firstAirDateFrom} placeholder="YYYY-MM-DD" onChange={date => setFirstAirDateFrom(date || undefined)} handleRelative={false} topClassName="top-18" />
                        </div>
                        <div className="flex flex-col w-full">
                            To
                            <DatePicker value={firstAirDateTo} placeholder="YYYY-MM-DD" onChange={date => setFirstAirDateTo(date || undefined)} alignedRight handleRelative={false} topClassName="top-18" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">Runtime</span>
                    <div className="flex gap-1">
                        <div className="flex flex-col">
                            From
                            <Input type="number" placeholder="45" value={runtimeFrom} onChange={e => setRuntimeFrom(e.target.valueAsNumber || undefined)} />
                        </div>
                        <div className="flex flex-col">
                            To
                            <Input type="number" placeholder="180" value={runtimeTo} onChange={e => setRuntimeTo(e.target.valueAsNumber || undefined)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">TMDB Rating</span>
                    <div className="flex gap-1">
                        <div className="flex flex-col">
                            From
                            <Input type="number" placeholder="6.5" value={tmdbRatingFrom} onChange={e => setTmdbRatingFrom(e.target.valueAsNumber || undefined)} />
                        </div>
                        <div className="flex flex-col">
                            To
                            <Input type="number" placeholder="9.5" value={tmdbRatingTo} onChange={e => setTmdbRatingTo(e.target.valueAsNumber || undefined)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">TMDB Vote Count</span>
                    <div className="flex gap-1">
                        <div className="flex flex-col">
                            From
                            <Input type="number" placeholder="100" value={tmdbVoteCountFrom} onChange={e => setTmdbVoteCountFrom(e.target.valueAsNumber || undefined)} />
                        </div>
                        <div className="flex flex-col">
                            To
                            <Input type="number" placeholder="100000" value={tmdbVoteCountTo} onChange={e => setTmdbVoteCountTo(e.target.valueAsNumber || undefined)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">With Status</span>
                    <MultiSelectDropdown
                        placeholder="Select statuses..."
                        selectedKeys={withStatus}
                        values={statusesValues}
                        onSelect={(key: string) => setWithStatus(prev => [...prev, key])}
                        onDeselect={(key: string) => setWithStatus(prev => prev.filter(k => k !== key))}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">With Genres</span>
                    <MultiSelectDropdown
                        placeholder="Select genres..."
                        selectedKeys={withGenres}
                        values={genresValues}
                        onSelect={(key: string) => setWithGenres(prev => [...prev, key])}
                        onDeselect={(key: string) => setWithGenres(prev => prev.filter(k => k !== key))}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">Without Genres</span>
                    <MultiSelectDropdown
                        placeholder="Select genres..."
                        selectedKeys={withoutGenres}
                        values={genresValues}
                        onSelect={(key: string) => setWithoutGenres(prev => [...prev, key])}
                        onDeselect={(key: string) => setWithoutGenres(prev => prev.filter(k => k !== key))}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">Original Language</span>
                    <Dropdown title={languagesValues.get(originalLanguage) || originalLanguage} values={languagesValues} onSelect={(value) => setOriginalLanguage(value)} />
                </div>
            </div>
        </div>
    );
}
