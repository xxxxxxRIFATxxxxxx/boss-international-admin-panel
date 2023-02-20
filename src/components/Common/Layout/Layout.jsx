import React from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="col-span-2">
                    <SideBar />
                </div>

                <div className="col-span-10 p-5">{children}</div>
            </div>
        </>
    );
};

export default Layout;
