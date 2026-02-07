import { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../ui/Logo";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <nav className="mb-3 p-4 bg-background-primary">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="mr-5">
                            <Link to="/">
                                <Logo />
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden sm:flex">
                            <NavLink className="mx-2 text-2xl" to="/login">Login</NavLink>
                            <NavLink className="mx-2 text-2xl" to="/register">Register</NavLink>
                        </div>
                    </div>

                    {/* Mobile (Hamburger Button) */}
                    <div className="flex sm:hidden">
                        <svg onClick={() => setIsMobileMenuOpen(true)} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </div>
                </div>

            </nav>
            {/* Mobile (Menu) */}
            <div className={`fixed inset-0 bg-background-secondary z-1000 p-5 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-between">
                    <div className="mb-10">
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/">
                            <Logo />
                        </Link>
                    </div>
                    <svg onClick={() => setIsMobileMenuOpen(false)} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                <div className="flex flex-col">
                    <NavLink onClick={() => setIsMobileMenuOpen(false)} className="mx-2 mb-1 text-2xl" to="/login">Login</NavLink>
                    <NavLink onClick={() => setIsMobileMenuOpen(false)} className="mx-2 mb-1 text-2xl" to="/register">Register</NavLink>
                </div>
            </div>
        </>
    )
}

export default Navbar;
