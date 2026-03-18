export interface Language {
    iso_639_1: string;
    english_name: string;
    name: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name?: string;
    origin_country?: string;
    logo_path?: string;
}

export interface ProductionCountry {
    name: string;
    iso_3166_1: string;
}

export interface Collection {
    id: number;
    name: string;
    poster_path?: string;
    backdrop_path?: string;
}

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
    id: number,
    imdb_id?: string,
    adult?: boolean,
    backdrop_path?: string,
    poster_path?: string,
    belongs_to_collection?: Collection,
    budget?: number,
    genres?: Array<Genre>,
    homepage?: string,
    origin_country?: Array<string>,
    original_language?: string,
    original_title?: string,
    overview?: string,
    popularity?: number,
    production_companies?: Array<ProductionCompany>,
    production_countries?: Array<ProductionCountry>,
    release_date?: string,
    revenue?: number,
    runtime?: number,
    spoken_languages?: Array<Language>,
    status?: string,
    tagline?: string,
    title?: string,
    video?: boolean,
    vote_average?: number,
    vote_count?: number,
}
