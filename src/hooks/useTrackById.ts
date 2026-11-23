import { useQuery } from "@tanstack/react-query";
import { getTrackById } from "../api/tracks";

export const useTrackById = (id: number) => {
    return useQuery({
        queryKey: ["track", id],
        queryFn: () => getTrackById(id),
        enabled: !!id,
    });
};