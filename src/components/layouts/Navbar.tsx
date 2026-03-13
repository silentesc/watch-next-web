import { useState } from "react";
import { Link, NavLink } from "react-router";
import Logo from "../ui/Logo";
import { useMe } from "../../hooks/use_me";
import Loading from "../ui/Loading";
import { MeDropdown } from "./MeDropdown";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const me = useMe();

    const desktopLinksWhenLoggedIn = (
        <>
            <NavLink className="mx-2 text-2xl" to="/discover">Discover</NavLink>
            <NavLink className="mx-2 text-2xl" to="/search">Search</NavLink>
        </>
    );
    const mobileLinksWhenLoggedIn = (
        <>
            <NavLink onClick={() => setIsMobileMenuOpen(false)} className="mx-2 mb-1 text-2xl" to="/discover">Discover</NavLink>
            <NavLink onClick={() => setIsMobileMenuOpen(false)} className="mx-2 mb-1 text-2xl" to="/search">Search</NavLink>
        </>
    )

    const desktopAuthLinks = (
        <>
            <NavLink className="mx-2 text-2xl p-2.5" to="/login">Login</NavLink>
            <NavLink className="mx-2 text-2xl bg-primary rounded-md p-2.5" to="/register">Register</NavLink>
        </>
    );
    const mobileAuthLinks = (
        <>
            <NavLink onClick={() => setIsMobileMenuOpen(false)} className="mx-2 mb-1 text-2xl p-2.5" to="/login">Login</NavLink>
            <NavLink onClick={() => setIsMobileMenuOpen(false)} className="mx-2 mb-1 text-2xl bg-primary rounded-md p-2.5" to="/register">Register</NavLink>
        </>
    );

    return (
        <>
            <nav className="mb-3 p-4 bg-background-primary">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center w-full">
                        <div className="mr-5">
                            <Link to="/">
                                <Logo />
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden sm:flex w-full items-center">
                            {/* Left */}
                            <div>
                                {
                                    me.isEnabled && me.isSuccess ? (
                                        desktopLinksWhenLoggedIn
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                            {/* Right */}
                            <div className="ml-auto">
                                {
                                    me.isEnabled ? (
                                        me.isPending ? (
                                            <Loading />
                                        ) : (
                                            me.isSuccess ? (
                                                <MeDropdown me={me.data} />
                                            ) : (
                                                desktopAuthLinks
                                            )
                                        )
                                    ) : (
                                        desktopAuthLinks
                                    )
                                }
                            </div>
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
            <div className={`fixed inset-0 flex flex-col bg-background-secondary z-1000 p-5 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* Bar with logo and x button*/}
                <div className="flex justify-between">
                    {/* Logo */}
                    <div className="mb-10">
                        <Link onClick={() => setIsMobileMenuOpen(false)} to="/">
                            <Logo />
                        </Link>
                    </div>
                    {/* x button */}
                    <svg onClick={() => setIsMobileMenuOpen(false)} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>

                {/* Links (top) */}
                <div className="flex flex-col">
                    {
                        me.isEnabled && me.isSuccess ? (
                            mobileLinksWhenLoggedIn
                        ) : (
                            <></>
                        )
                    }
                </div>

                {/* Link (bottom) */}
                <div className="flex mt-auto mx-auto">
                    {
                        me.isEnabled ? (
                            me.isPending ? (
                                <Loading />
                            ) : (
                                me.isSuccess ? (
                                    <MeDropdown me={me.data} isMobile />
                                ) : (
                                    mobileAuthLinks
                                )
                            )
                        ) : (
                            mobileAuthLinks
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar;
