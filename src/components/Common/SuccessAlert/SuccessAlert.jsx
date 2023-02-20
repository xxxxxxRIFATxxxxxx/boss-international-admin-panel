import React from "react";

const SuccessAlert = ({ message = "" }) => {
    return (
        <div
            className="flex p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50"
            role="alert"
        >
            <span className="sr-only">Info</span>
            <div>
                <span className="font-medium">Success</span> {message}
            </div>
        </div>
    );
};

export default SuccessAlert;
