import axios from "axios";
import { logout } from "./auth";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});
api.defaults.withCredentials = true;
api.interceptors.response.use(
    (res) => res,
    async (err) => {
        if (!axios.isAxiosError(err)) {
            return;
        }
        if (!err.response) {
            return;
        }
        if (err.response.status != 401) {
            return;
        }
        await logout();

        const currentPath = window.location.pathname;
        if (currentPath !== "/login" && currentPath !== "/register") {
            window.location.href = "/login";
        }

        return Promise.reject(err);
    }
)
