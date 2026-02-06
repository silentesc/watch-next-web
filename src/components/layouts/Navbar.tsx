import { NavLink } from "react-router";

function Navbar() {
    return (
        <>
            <nav className="mb-3 p-4 bg-background-primary">
                <NavLink className="mx-2 text-2xl" to="/" end>Home</NavLink>
                <NavLink className="mx-2 text-2xl" to="/about">About</NavLink>
                <NavLink className="mx-2 text-2xl" to="/login">Login</NavLink>
                <NavLink className="mx-2 text-2xl" to="/register">Register</NavLink>
            </nav>
        </>
    )
}

export default Navbar;
