import { useQuery } from "@tanstack/react-query";
import { getTrack } from "../api/tracks";

export const useTracks = () => {
    return useQuery({
        queryKey: ['tracks'],
        queryFn: getTrack
    })
}

