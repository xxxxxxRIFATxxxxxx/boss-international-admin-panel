import React from "react";

const ErrorAlert = ({ message = "" }) => {
    return (
        <div
            className="flex p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50"
            role="alert"
        >
            <div>
                <span className="font-medium">Error</span> {message}
            </div>
        </div>
    );
};

export default ErrorAlert;
