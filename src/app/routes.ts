import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { DiscoverMoviePage } from "../pages/discover/DiscoverMoviePage";
import { SearchPage } from "../pages/search/SearchPage";
import { DiscoverPage } from "../pages/discover/DiscoverPage";
import { MovieDetailsPage } from "../pages/movie/MovieDetailsPage";
import { HomePage } from "../pages/home/HomePage";
import { CrewPage } from "../pages/movie/CrewPage";
import { CastPage } from "../pages/movie/CastPage";
import { RecommendationsPage } from "../pages/movie/RecommendationsPage";
import { SimilarPage } from "../pages/movie/SimilarPage";

export const router = createBrowserRouter([
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
            {
                path: "/movie/:id",
                children: [
                    { index: true, Component: MovieDetailsPage },
                    { path: "crew", Component: CrewPage },
                    { path: "cast", Component: CastPage },
                    { path: "recommendations", Component: RecommendationsPage },
                    { path: "similar", Component: SimilarPage },
                ]
            },
            { path: "search", Component: SearchPage },
        ],
    },
]);
