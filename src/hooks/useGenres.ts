
import { useQuery } from '@tanstack/react-query';
import { getGenres } from '../api/genres';


export const useGenres = () => {
    return useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });
};
