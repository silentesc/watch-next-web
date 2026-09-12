import { useAuthStore } from "../stores/useAuthStore";
import { api } from "./client";
import { error2userMessage } from "./errors";

/**
 * Hash a string using sha256, used for masking password from server if malicious admin wants to try user password on other services
 * @param plaintext text to hash
 * @returns Promise to hashed string
 */
async function sha256(plaintext: string): Promise<string> {
    const plaintextBuffer = new TextEncoder().encode(plaintext);
    const hashBuffer = await crypto.subtle.digest("SHA-256", plaintextBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
}

/**
 * Register user
 * @param username Users username
 * @param password Users plaintext password
 * @returns void
 */
export async function register(username: string, password: string) {
    if (import.meta.env.VITE_VITE_SHA256_PASSWORDS) {
        password = await sha256(password);
    }
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
    if (import.meta.env.VITE_VITE_SHA256_PASSWORDS) {
        password = await sha256(password);
    }
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
