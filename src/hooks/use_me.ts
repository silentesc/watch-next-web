import { useQuery } from "@tanstack/react-query";
import { me } from "../api/me";
import { useAuthStore } from "../stores/useAuthStore";

export const QUERY_KEY = "me";

export function useMe() {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    return useQuery({
        queryKey: [QUERY_KEY],
        queryFn: me,
        staleTime: Infinity,
        retry: false,
        enabled: isLoggedIn,
    });
}
