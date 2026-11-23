import { supabase } from "../services/supabase";
import type { Track } from "../types/Tracks";

export const getTrack = async () => {
    const { data, error } = await supabase
        .from("songs")
        .select(`
            *,
            artists (
                name
            ),
            genres (
                name
            )
        `)
        .limit(5)
        .order("id");

    if (error) {
        throw new Error(error.message);
    }

    return data as Track[];
};

export const getTrackById = async (id: number) => {
    const { data, error } = await supabase
        .from("songs")
        .select(`
            *,
            artists (
                name
            ),
            genres (
                name
            )
        `)
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data as Track;
};