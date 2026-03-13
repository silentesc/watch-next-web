import { createBrowserRouter } from "react-router";
import App from "./app";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import { DiscoverPage } from "../pages/discover/DiscoverPage";
import { SearchPage } from "../pages/search/SearchPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: HomePage },
            { path: "login", Component: LoginPage },
            { path: "register", Component: RegisterPage },
            { path: "discover", Component: DiscoverPage },
            { path: "search", Component: SearchPage },
        ],
    },
]);

export default router;
