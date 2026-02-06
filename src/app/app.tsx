import { Outlet } from "react-router";
import Navbar from "../components/layouts/Navbar";

function App() {
    return (
        <>
            <div className="mx-auto text-center">
                <Navbar />
                <div className="max-w-300">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default App;
