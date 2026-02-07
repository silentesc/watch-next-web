import { Outlet } from "react-router";
import Navbar from "../components/layouts/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-7xl">
                <Outlet />
            </div>
        </>
    )
}

export default App;
