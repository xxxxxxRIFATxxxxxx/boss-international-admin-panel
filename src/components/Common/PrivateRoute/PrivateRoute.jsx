import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    if (!user && !access_token) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
