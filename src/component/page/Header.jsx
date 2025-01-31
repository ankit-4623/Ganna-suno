import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { MdDarkMode } from "react-icons/md";

export const Header = () => {
    return (
        <>
            <header className="section-navbar">
                <div className="container">
                    <div className="navbar-brand">
                        <NavLink to="/">
                        <div className="logo-container">
                                <img
                                    src={'public/logo.png'}
                                    alt="logo"
                                    className="logo"
                                />
                            </div>
                        </NavLink>
                    </div>
                    <nav className="navbar">
                        <ul>
                            <li className="nav-item">
                                <NavLink
                                    to="/favourite"
                                    className="nav-link"
                                >
                                    <FaHeart /> Favourites
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="dark-mode-toggle"
                                    onClick={() => {
                                        document.body.classList.toggle("dark-mode");
                                        
                                    }}
                                >
                                    <MdDarkMode /> Dark Mode
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};
