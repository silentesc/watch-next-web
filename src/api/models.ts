// Common

export interface Language {
    iso_639_1: string;
    english_name: string;
    name: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Cast {
    adult?: boolean;
    gender?: number;
    id: number;
    known_for_department?: string;
    name?: string;
    original_name?: string;
    popularity?: number;
    profile_path?: string;
    cast_id?: number;
    character?: string;
    credit_id?: string;
    order: number;
}

export interface Crew {
    adult?: boolean;
    gender?: number;
    id: number;
    known_for_department?: string;
    name?: string;
    original_name?: string;
    popularity?: number;
    profile_path?: string;
    credit_id?: string;
    department?: string;
    job?: string;
}

export interface Country {
    name: string;
    iso_3166_1: string;
}

export interface ReleaseDate {
    certification?: string;
    descriptors?: Array<string>;
    iso_639_1?: string;
    note?: string;
    release_date: string;
    type: number;
}

// Collection

export interface CollectionOverview {
    id: number;
    name: string;
    poster_path?: string;
    backdrop_path?: string;
}

export interface CollectionDetails {
    id: number;
    name: string;
    original_language?: string;
    original_name?: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    parts: Array<MovieOverview>;
}

// Movie

export interface MovieOverview {
    adult?: boolean;
    backdrop_path?: string;
    poster_path?: string;
    genre_ids?: Array<number>;
    id: number;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    release_date?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface MovieDetails {
    id: number;
    imdb_id?: string;
    adult?: boolean;
    backdrop_path?: string;
    poster_path?: string;
    belongs_to_collection?: CollectionOverview;
    budget?: number;
    genres?: Array<Genre>;
    homepage?: string;
    origin_country?: Array<string>;
    original_language?: string;
    original_title?: string;
    overview?: string;
    popularity?: number;
    production_companies?: Array<MovieProductionCompany>;
    production_countries?: Array<Country>;
    release_date?: string;
    revenue?: number;
    runtime?: number;
    spoken_languages?: Array<Language>;
    status?: string;
    tagline?: string;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}

export interface MovieProductionCompany {
    id: number;
    name?: string;
    origin_country?: string;
    logo_path?: string;
}

// TV Series

export interface TvSeriesOverview {
    adult?: boolean;
    backdrop_path?: string;
    media_type?: string;
    poster_path?: string;
    genre_ids?: Array<number>;
    id?: number;
    original_language?: string;
    original_name?: string;
    name?: string;
    overview?: string;
    popularity?: number;
    first_air_date?: string;
    vote_average?: number;
    vote_count?: number;
    origin_country?: Array<string>;
}

export interface TvSeriesDetails {
    adult?: boolean;
    backdrop_path?: string;
    created_by?: Array<TvSeriesCreator>;
    episode_run_time?: Array<number>;
    first_air_date?: string;
    genres?: Array<Genre>;
    homepage?: string;
    id?: number;
    in_production?: boolean;
    languages?: Array<string>;
    last_air_date?: string;
    last_episode_to_air?: TvEpisodeOverview;
    name?: string;
    networks?: Array<TvSeriesNetwork>;
    next_episode_to_air?: TvEpisodeOverview;
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country?: Array<string>;
    original_language?: string;
    original_name?: string;
    overview?: string;
    popularity?: number;
    poster_path?: string;
    production_companies?: Array<TvSeriesProductionCompany>;
    production_countries?: Array<Country>;
    seasons?: Array<TvSeasonOverview>;
    spoken_languages?: Array<Language>;
    status?: string;
    tagline?: string;
    type?: string;
    vote_average?: number;
    vote_count?: number;
}

export interface TvSeriesCreator {
    id?: number;
    credit_id?: string;
    name?: string;
    gender?: number;
    profile_path?: string;
}

export interface TvSeriesNetwork {
    id?: number;
    logo_path?: string;
    name?: string;
    origin_country?: string;
}

export interface TvSeriesProductionCompany {
    id?: number;
    logo_path?: string;
    name?: string;
    origin_country?: string;
}

// TV Season

export interface TvSeasonOverview {
    air_date?: string;
    episode_count?: number;
    id?: number;
    name?: string;
    overview?: string;
    poster_path?: string;
    season_number?: number;
    vote_average?: number;
}

export interface TvSeasonDetails {
    _id?: string;
    air_date?: string;
    episodes?: Array<TvEpisodeDetails>;
    name?: string;
    networks?: Array<TvSeasonNetwork>;
    overview?: string;
    id?: number;
    poster_path?: string;
    season_number?: number;
    vote_average?: number;
}

export interface TvSeasonNetwork {
    id?: number;
    logo_path?: string;
    name?: string;
    origin_country?: string;
}

// TV Episode

export interface TvEpisodeOverview {
    air_date?: string;
    episode_number?: number;
    id?: number;
    name?: string;
    overview?: string;
    production_code?: string;
    runtime?: number;
    season_number?: number;
    show_id?: number;
    still_path?: string;
    vote_average?: number;
    vote_count?: number;
}

export interface TvEpisodeDetails {
    air_date?: string;
    episode_number?: number;
    episode_type?: string;
    id?: number;
    name?: string;
    overview?: string;
    production_code?: string;
    runtime?: number;
    season_number?: number;
    show_id?: number;
    still_path?: string;
    vote_average?: number;
    vote_count?: number;
    crew?: Array<Crew>;
    guest_stars?: Array<Cast>;
}
