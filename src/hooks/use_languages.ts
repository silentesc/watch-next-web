import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../api/configuration/languages";

export function useLanguages() {
    return useQuery({
        queryKey: ["languages"],
        queryFn: getLanguages,
        staleTime: Infinity,
        retry: false,
    });
}
