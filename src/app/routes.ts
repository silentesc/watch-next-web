import { createBrowserRouter } from "react-router";
import App from "./app";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import { DiscoverMoviePage } from "../pages/discover/DiscoverMoviePage";
import { SearchPage } from "../pages/search/SearchPage";
import { DiscoverPage } from "../pages/discover/DiscoverPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: HomePage },
            { path: "login", Component: LoginPage },
            { path: "register", Component: RegisterPage },
            {
                path: "discover",
                children: [
                    { index: true, Component: DiscoverPage },
                    { path: "movie", Component: DiscoverMoviePage },
                ]
            },
            { path: "search", Component: SearchPage },
        ],
    },
]);

export default router;
