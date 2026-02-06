import { createBrowserRouter } from "react-router";
import App from "./app";
import HomePage from "../pages/home/HomePage";
import AboutPage from "../pages/about/AboutPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { index: true, Component: HomePage },
            { path: "about", Component: AboutPage },
            { path: "login", Component: LoginPage },
            { path: "register", Component: RegisterPage },
        ],
    },
]);

export default router;
