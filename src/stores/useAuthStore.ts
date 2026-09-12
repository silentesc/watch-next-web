import { create } from "zustand";
import { persist } from "zustand/middleware";

const isLoggedInFlagKey = "isLoggedIn";

interface AuthState {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: localStorage.getItem(isLoggedInFlagKey) === "true",
            setIsLoggedIn: (value) => {
                localStorage.setItem(isLoggedInFlagKey, String(value));
                set({ isLoggedIn: value });
            },
        }),
        { name: "auth-storage" }
    )
);
