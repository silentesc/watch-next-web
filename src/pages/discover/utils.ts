import type { SetURLSearchParams } from "react-router";
import type { MovieFilters } from "./ui/MovieFilters";
import type { TvSeriesFilters } from "./ui/TvSeriesFilters";
import { formatDate, parseIsoDate } from "../../components/ui/DatePicker";

export function getMovieFiltersFromParams(queryParams: URLSearchParams) {
    const releaseDateFromParam = queryParams.get("releaseDateFrom");
    const releaseDateToParam = queryParams.get("releaseDateTo");
    const runtimeFromParam = queryParams.get("runtimeFrom");
    const runtimeToParam = queryParams.get("runtimeTo");
    const tmdbRatingFromParam = queryParams.get("tmdbRatingFrom");
    const tmdbRatingToParam = queryParams.get("tmdbRatingTo");
    const tmdbVoteCountFromParam = queryParams.get("tmdbVoteCountFrom");
    const tmdbVoteCountToParam = queryParams.get("tmdbVoteCountTo");
    const withGenresParam = queryParams.get("withGenres");
    const withoutGenresParam = queryParams.get("withoutGenres");
    const originalLanguageParam = queryParams.get("originalLanguage");

    return {
        releaseDateFrom: releaseDateFromParam ? parseIsoDate(releaseDateFromParam) : undefined,
        releaseDateTo: releaseDateToParam ? parseIsoDate(releaseDateToParam) : undefined,
        runtimeFrom: runtimeFromParam ? Number(runtimeFromParam) : undefined,
        runtimeTo: runtimeToParam ? Number(runtimeToParam) : undefined,
        tmdbRatingFrom: tmdbRatingFromParam ? Number(tmdbRatingFromParam) : undefined,
        tmdbRatingTo: tmdbRatingToParam ? Number(tmdbRatingToParam) : undefined,
        tmdbVoteCountFrom: tmdbVoteCountFromParam ? Number(tmdbVoteCountFromParam) : undefined,
        tmdbVoteCountTo: tmdbVoteCountToParam ? Number(tmdbVoteCountToParam) : undefined,
        withGenres: withGenresParam ? withGenresParam : undefined,
        withoutGenres: withoutGenresParam ? withoutGenresParam : undefined,
        originalLanguage: originalLanguageParam ? originalLanguageParam : undefined,
    } as MovieFilters;
}

export function getTvSeriesFiltersFromParams(queryParams: URLSearchParams) {
    const firstAirDateFromParam = queryParams.get("firstAirDateFrom");
    const firstAirDateToParam = queryParams.get("firstAirDateTo");
    const runtimeFromParam = queryParams.get("runtimeFrom");
    const runtimeToParam = queryParams.get("runtimeTo");
    const tmdbRatingFromParam = queryParams.get("tmdbRatingFrom");
    const tmdbRatingToParam = queryParams.get("tmdbRatingTo");
    const tmdbVoteCountFromParam = queryParams.get("tmdbVoteCountFrom");
    const tmdbVoteCountToParam = queryParams.get("tmdbVoteCountTo");
    const withStatusParam = queryParams.get("withStatus");
    const withGenresParam = queryParams.get("withGenres");
    const withoutGenresParam = queryParams.get("withoutGenres");
    const originalLanguageParam = queryParams.get("originalLanguage");

    return {
        firstAirDateFrom: firstAirDateFromParam ? parseIsoDate(firstAirDateFromParam) : undefined,
        firstAirDateTo: firstAirDateToParam ? parseIsoDate(firstAirDateToParam) : undefined,
        runtimeFrom: runtimeFromParam ? Number(runtimeFromParam) : undefined,
        runtimeTo: runtimeToParam ? Number(runtimeToParam) : undefined,
        tmdbRatingFrom: tmdbRatingFromParam ? Number(tmdbRatingFromParam) : undefined,
        tmdbRatingTo: tmdbRatingToParam ? Number(tmdbRatingToParam) : undefined,
        tmdbVoteCountFrom: tmdbVoteCountFromParam ? Number(tmdbVoteCountFromParam) : undefined,
        tmdbVoteCountTo: tmdbVoteCountToParam ? Number(tmdbVoteCountToParam) : undefined,
        withStatus: withStatusParam ? withStatusParam : undefined,
        withGenres: withGenresParam ? withGenresParam : undefined,
        withoutGenres: withoutGenresParam ? withoutGenresParam : undefined,
        originalLanguage: originalLanguageParam ? originalLanguageParam : undefined,
    } as TvSeriesFilters;
}

export function setMovieParamsFromFilters(filters: MovieFilters, sortBy: string, setQueryParams: SetURLSearchParams) {
    setQueryParams(() => {
        const newParams = new URLSearchParams();

        newParams.set("sortBy", sortBy);

        if (filters.releaseDateFrom) {
            newParams.set("releaseDateFrom", formatDate(filters.releaseDateFrom.getFullYear(), filters.releaseDateFrom.getMonth(), filters.releaseDateFrom.getDate()));
        }

        if (filters.releaseDateTo) {
            newParams.set("releaseDateTo", formatDate(filters.releaseDateTo.getFullYear(), filters.releaseDateTo.getMonth(), filters.releaseDateTo.getDate()));
        }

        if (filters.runtimeFrom) {
            newParams.set("runtimeFrom", filters.runtimeFrom.toString());
        }

        if (filters.runtimeTo) {
            newParams.set("runtimeTo", filters.runtimeTo.toString());
        }

        if (filters.tmdbRatingFrom) {
            newParams.set("tmdbRatingFrom", filters.tmdbRatingFrom.toString());
        }

        if (filters.tmdbRatingTo) {
            newParams.set("tmdbRatingTo", filters.tmdbRatingTo.toString());
        }

        if (filters.tmdbVoteCountFrom) {
            newParams.set("tmdbVoteCountFrom", filters.tmdbVoteCountFrom.toString());
        }

        if (filters.tmdbVoteCountTo) {
            newParams.set("tmdbVoteCountTo", filters.tmdbVoteCountTo.toString());
        }

        if (filters.withGenres) {
            newParams.set("withGenres", filters.withGenres);
        }

        if (filters.withoutGenres) {
            newParams.set("withoutGenres", filters.withoutGenres);
        }

        if (filters.originalLanguage) {
            newParams.set("originalLanguage", filters.originalLanguage);
        }

        return newParams;
    });
}

export function setTvSeriesParamsFromFilters(filters: TvSeriesFilters, sortBy: string, setQueryParams: SetURLSearchParams) {
    setQueryParams(() => {
        const newParams = new URLSearchParams();

        newParams.set("sortBy", sortBy);

        if (filters.firstAirDateFrom) {
            newParams.set("releaseDateFrom", formatDate(filters.firstAirDateFrom.getFullYear(), filters.firstAirDateFrom.getMonth(), filters.firstAirDateFrom.getDate()));
        }

        if (filters.firstAirDateTo) {
            newParams.set("releaseDateTo", formatDate(filters.firstAirDateTo.getFullYear(), filters.firstAirDateTo.getMonth(), filters.firstAirDateTo.getDate()));
        }

        if (filters.runtimeFrom) {
            newParams.set("runtimeFrom", filters.runtimeFrom.toString());
        }

        if (filters.runtimeTo) {
            newParams.set("runtimeTo", filters.runtimeTo.toString());
        }

        if (filters.tmdbRatingFrom) {
            newParams.set("tmdbRatingFrom", filters.tmdbRatingFrom.toString());
        }

        if (filters.tmdbRatingTo) {
            newParams.set("tmdbRatingTo", filters.tmdbRatingTo.toString());
        }

        if (filters.tmdbVoteCountFrom) {
            newParams.set("tmdbVoteCountFrom", filters.tmdbVoteCountFrom.toString());
        }

        if (filters.tmdbVoteCountTo) {
            newParams.set("tmdbVoteCountTo", filters.tmdbVoteCountTo.toString());
        }

        if (filters.withStatus) {
            newParams.set("withStatus", filters.withStatus);
        }

        if (filters.withGenres) {
            newParams.set("withGenres", filters.withGenres);
        }

        if (filters.withoutGenres) {
            newParams.set("withoutGenres", filters.withoutGenres);
        }

        if (filters.originalLanguage) {
            newParams.set("originalLanguage", filters.originalLanguage);
        }

        return newParams;
    });
}
