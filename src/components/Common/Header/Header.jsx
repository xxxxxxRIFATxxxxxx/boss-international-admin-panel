import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import defaultUserImg from "./default-user-img.jpg";

const Header = () => {
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleShowUserDropdown = () => {
        setShowUserDropdown((prevState) => {
            return !prevState;
        });
    };

    const handleSignOut = () => {
        logout();
        navigate("/");
    };

    return (
        <header>
            <nav className="bg-white shadow px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">
                        <Link to="/" className="flex mr-4 font-semibold">
                            <h1 className="text-xl">
                                <span className="text-primary-700">
                                    Boss International
                                </span>{" "}
                                Admin Panel
                            </h1>
                        </Link>
                    </div>

                    <div className="flex flex-col items-center lg:order-2">
                        <button
                            type="button"
                            className="flex mx-3 text-sm border border-primary-700 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-primary-300"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="dropdown"
                            onClick={handleShowUserDropdown}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="w-8 h-8 rounded-full"
                                src={defaultUserImg}
                                alt="user"
                            />
                        </button>

                        {/* Dropdown menu */}
                        <div
                            className={`${
                                showUserDropdown ? "absolute" : "hidden"
                            } z-50 my-4 w-full md:w-56 text-base list-none top-12 right-0 bg-white rounded divide-y divide-gray-100 shadow`}
                            id="dropdown"
                        >
                            <div className="py-3 px-4">
                                <span className="block text-sm font-semibold text-gray-900">
                                    {user.firstName} {user.lastName}
                                </span>
                                <span className="block text-sm font-light text-gray-500 truncate">
                                    {user.email}
                                </span>
                            </div>

                            <ul
                                className="py-1 font-light text-gray-500"
                                aria-labelledby="dropdown"
                            >
                                <li>
                                    <button
                                        href="#"
                                        className="block py-2 px-4 text-sm hover:bg-gray-100 w-full text-start"
                                        onClick={handleSignOut}
                                    >
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
