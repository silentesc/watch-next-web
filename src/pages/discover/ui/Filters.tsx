import { useState, useEffect } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { DatePicker } from "../../../components/ui/DatePicker";

export interface Filters {
    releaseDateFrom: Date | undefined,
    releaseDateTo: Date | undefined,
    runtimeFrom: number | undefined,
    runtimeTo: number | undefined,
    tmdbRatingFrom: number | undefined,
    tmdbRatingTo: number | undefined,
    tmdbVoteCountFrom: number | undefined,
    tmdbVoteCountTo: number | undefined,
    withGenres: string | undefined,
    withoutGenres: string | undefined,
    originalLanguage: string | undefined,
}

interface FiltersProps {
    isOpen: boolean,
    onFiltersChange: (filters: Filters) => void;
    onClose: () => void;
}

const isFiltersValid = (filters: Filters): boolean => {
    if (filters.releaseDateFrom && filters.releaseDateTo && filters.releaseDateFrom > filters.releaseDateTo) return false;
    if (filters.runtimeFrom !== undefined && filters.runtimeTo !== undefined && filters.runtimeFrom > filters.runtimeTo) return false;
    if (filters.tmdbRatingFrom !== undefined && filters.tmdbRatingTo !== undefined && filters.tmdbRatingFrom > filters.tmdbRatingTo) return false;
    if (filters.tmdbVoteCountFrom !== undefined && filters.tmdbVoteCountTo !== undefined && filters.tmdbVoteCountFrom > filters.tmdbVoteCountTo) return false;
    return true;
};

export function Filters({ isOpen, onFiltersChange, onClose }: FiltersProps) {
    const [releaseDateFrom, setReleaseDateFrom] = useState<Date | undefined>(undefined);
    const [releaseDateTo, setReleaseDateTo] = useState<Date | undefined>(undefined);

    const [runtimeFrom, setRuntimeFrom] = useState<number | undefined>(undefined);
    const [runtimeTo, setRuntimeTo] = useState<number | undefined>(undefined);

    const [tmdbRatingFrom, setTmdbRatingFrom] = useState<number | undefined>(undefined);
    const [tmdbRatingTo, setTmdbRatingTo] = useState<number | undefined>(undefined);

    const [tmdbVoteCountFrom, setTmdbVoteCountFrom] = useState<number | undefined>(undefined);
    const [tmdbVoteCountTo, setTmdbVoteCountTo] = useState<number | undefined>(undefined);

    const [withGenres, setWithGenres] = useState<string | undefined>(undefined);

    const [withoutGenres, setWithoutGenres] = useState<string | undefined>(undefined);

    const [originalLanguage, setOriginalLanguage] = useState<string | undefined>(undefined);

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

    const applyFilters = () => {
        console.log(releaseDateTo, typeof releaseDateTo);
        const filters: Filters = {
            releaseDateFrom,
            releaseDateTo,
            runtimeFrom,
            runtimeTo,
            tmdbRatingFrom,
            tmdbRatingTo,
            tmdbVoteCountFrom,
            tmdbVoteCountTo,
            withGenres,
            withoutGenres,
            originalLanguage,
        };

        if (!isFiltersValid(filters)) {
            return;
        }

        onFiltersChange(filters);
    };

    return (
        <div className={`fixed inset-0 flex justify-end z-1000 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>

            <div onClick={() => onClose()} className="absolute w-full h-full bg-background-secondary/50">
            </div>

            {/* Filters */}
            <div className={`m-2 p-5 bg-background-primary flex flex-col gap-6 overflow-scroll transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex">
                    <div className="m-auto">
                    </div>
                    {/* x button */}
                    <svg onClick={() => onClose()} className="w-6 h-6 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <Button value="Apply Filters" onClick={applyFilters} />
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">Release Date</span>
                    <div className="relative flex gap-1">
                        <div className="flex flex-col">
                            From
                            <DatePicker placeholder="YYYY-MM-DD" onChange={date => setReleaseDateFrom(date)} handleRelative={false} topClassName="top-18" />
                        </div>
                        <div className="flex flex-col">
                            To
                            <DatePicker placeholder="YYYY-MM-DD" onChange={date => setReleaseDateTo(date)} alignedRight handleRelative={false} topClassName="top-18" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">Runtime</span>
                    <div className="flex gap-1">
                        <div className="flex flex-col">
                            From
                            <Input type="number" placeholder="45" onChange={e => setRuntimeFrom(e.target.valueAsNumber)} />
                        </div>
                        <div className="flex flex-col">
                            To
                            <Input type="number" placeholder="180" onChange={e => setRuntimeTo(e.target.valueAsNumber)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">TMDB Rating</span>
                    <div className="flex gap-1">
                        <div className="flex flex-col">
                            From
                            <Input type="number" placeholder="6.5" onChange={e => setTmdbRatingFrom(e.target.valueAsNumber)} />
                        </div>
                        <div className="flex flex-col">
                            To
                            <Input type="number" placeholder="9.5" onChange={e => setTmdbRatingTo(e.target.valueAsNumber)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">TMDB Vote Count</span>
                    <div className="flex gap-1">
                        <div className="flex flex-col">
                            From
                            <Input type="number" placeholder="100" onChange={e => setTmdbVoteCountFrom(e.target.valueAsNumber)} />
                        </div>
                        <div className="flex flex-col">
                            To
                            <Input type="number" placeholder="100000" onChange={e => setTmdbVoteCountTo(e.target.valueAsNumber)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">With Genres</span>
                    <Input type="text" placeholder="Action, Animation" onChange={e => setWithGenres(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">Without Genres</span>
                    <Input type="text" placeholder="Action, Animation" onChange={e => setWithoutGenres(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">Original Language</span>
                    <Input type="text" placeholder="UK" onChange={e => setOriginalLanguage(e.target.value)} />
                </div>
            </div>
        </div>
    );
}
