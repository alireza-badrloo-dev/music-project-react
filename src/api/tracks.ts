import { supabase } from "../services/supabase";

export const getTrack = async () => {
    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .limit(5)
        .order('id');

    if (error) {
        throw new Error(error.message);
    }

    return data;
};