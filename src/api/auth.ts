import { useAuthStore } from "../stores/useAuthStore";
import { api } from "./client";
import { error2userMessage } from "./errors";

/**
 * Register user
 * @param username Users username
 * @param password Users plaintext password
 * @returns void
 */
export async function register(username: string, password: string) {
    try {
        await api.post("/auth/register", { "username": username, "password": password });
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}

/**
 * Login user
 * @param username Users username
 * @param password Users plaintext password
 * @returns void
 */
export async function login(username: string, password: string) {
    try {
        await api.post("/auth/login", { "username": username, "password": password });
        useAuthStore.getState().setIsLoggedIn(true);
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}

/**
 * Logout user
 * @returns void
 */
export async function logout() {
    try {
        await api.post("/auth/logout");
        useAuthStore.getState().setIsLoggedIn(false);
    } catch (err) {
        throw new Error(error2userMessage(err));
    }
}
