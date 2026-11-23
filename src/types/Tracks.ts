export interface Track {
    id: number;
    title: string;
    album_id: number;
    artist_id: number;
    cover_url: string;
    audio_url: string;
    duration: number;
    play_count: number;
    release_date: string;
    created_at: string;

    artists: {
        name: string;
    } | null;

    genres: {
        name: string;
    }[];
}