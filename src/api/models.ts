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
    release_date?: Date;
    title?: string;
    video?: boolean;
    vote_average?: number;
    vote_count?: number;
}
