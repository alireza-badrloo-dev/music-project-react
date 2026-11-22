import { supabase } from "../services/supabase";

export const getGenres = async () => {
    const { data, error } = await supabase
        .from("genres")
        .select("*");
        
    if (error) {
        throw new Error(error.message);
    }

    return data;
};