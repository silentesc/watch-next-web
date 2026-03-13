import { useState, useEffect } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export interface Filters {
    releaseDateFrom: Date | null,
    releaseDateTo: Date | null,
    runtimeFrom: number | null,
    runtimeTo: number | null,
    tmdbRatingFrom: number | null,
    tmdbRatingTo: number | null,
    tmdbVoteCountFrom: number | null,
    tmdbVoteCountTo: number | null,
    withGenres: string | null,
    withoutGenres: string | null,
    originalLanguage: string | null,
}

interface FiltersProps {
    isOpen: boolean,
    onFiltersChange: (filters: Filters) => void;
    onClose: () => void;
}

const isFiltersValid = (filters: Filters): boolean => {
    if (filters.releaseDateFrom && filters.releaseDateTo && filters.releaseDateFrom > filters.releaseDateTo) return false;
    if (filters.runtimeFrom !== null && filters.runtimeTo !== null && filters.runtimeFrom > filters.runtimeTo) return false;
    if (filters.tmdbRatingFrom !== null && filters.tmdbRatingTo !== null && filters.tmdbRatingFrom > filters.tmdbRatingTo) return false;
    if (filters.tmdbVoteCountFrom !== null && filters.tmdbVoteCountTo !== null && filters.tmdbVoteCountFrom > filters.tmdbVoteCountTo) return false;
    return true;
};

export function Filters({ isOpen, onFiltersChange, onClose }: FiltersProps) {
    const [releaseDateFrom, setReleaseDateFrom] = useState<Date | null>(null);
    const [releaseDateTo, setReleaseDateTo] = useState<Date | null>(null);

    const [runtimeFrom, setRuntimeFrom] = useState<number | null>(null);
    const [runtimeTo, setRuntimeTo] = useState<number | null>(null);

    const [tmdbRatingFrom, setTmdbRatingFrom] = useState<number | null>(null);
    const [tmdbRatingTo, setTmdbRatingTo] = useState<number | null>(null);

    const [tmdbVoteCountFrom, setTmdbVoteCountFrom] = useState<number | null>(null);
    const [tmdbVoteCountTo, setTmdbVoteCountTo] = useState<number | null>(null);

    const [withGenres, setWithGenres] = useState<string | null>(null);

    const [withoutGenres, setWithoutGenres] = useState<string | null>(null);

    const [originalLanguage, setOriginalLanguage] = useState<string | null>(null);

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
                    <svg onClick={() => onClose()} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
                <Button value="Apply Filters" onClick={applyFilters} />
                <div className="flex flex-col gap-2">
                    <span className="text-2xl font-medium">Release Date</span>
                    <div className="flex gap-1">
                        <div className="flex flex-col">
                            From
                            <Input type="text" placeholder="YYYY-MM-DD" onChange={e => setReleaseDateFrom(e.target.valueAsDate)} />
                        </div>
                        <div className="flex flex-col">
                            To
                            <Input type="text" placeholder="YYYY-MM-DD" onChange={e => setReleaseDateTo(e.target.valueAsDate)} />
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
