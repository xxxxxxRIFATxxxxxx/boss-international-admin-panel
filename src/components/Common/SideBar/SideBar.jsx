import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    const activeClassName =
        "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 bg-gray-100";
    const inActiveClassName =
        "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100";

    return (
        <aside className="w-100 h-full lg:h-screen" aria-label="Sidenav">
            <div className="overflow-y-auto py-5 px-3 h-full lg:h-screen bg-white border-r border-gray-200 shadow border-2">
                <ul className="space-y-2">
                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                isActive ? activeClassName : inActiveClassName
                            }
                        >
                            <i
                                className={
                                    "fa-solid fa-rectangle-list text-gray-900"
                                }
                            ></i>

                            <span className="ml-3">Products</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/orders"
                            className={({ isActive }) =>
                                isActive ? activeClassName : inActiveClassName
                            }
                        >
                            <i
                                className={
                                    "fa-solid fa-cart-shopping text-gray-900"
                                }
                            ></i>

                            <span className="ml-3">Orders</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                                isActive ? activeClassName : inActiveClassName
                            }
                        >
                            <i
                                className={"fa-solid fa-list-ul text-gray-900"}
                            ></i>

                            <span className="ml-3">Categories</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                isActive ? activeClassName : inActiveClassName
                            }
                        >
                            <i
                                className={"fa-solid fa-users text-gray-900"}
                            ></i>

                            <span className="ml-3">Users</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default SideBar;
