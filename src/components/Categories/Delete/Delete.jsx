import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";
import ErrorAlert from "../../Common/ErrorAlert/ErrorAlert";
import Layout from "../../Common/Layout/Layout";
import Spinner from "../../Common/Spinner/Spinner";
import SuccessAlert from "../../Common/SuccessAlert/SuccessAlert";

const Delete = () => {
    let { categoryId } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const { deleteCategory } = useCategories();

    const handleDelete = async (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(true);

        deleteCategory(categoryId)
            .then((result) => {
                if (result === "Success") {
                    setIsSuccess(true);
                    setIsLoading(false);
                    setSuccessMessage("Category deleted successfully!");

                    setTimeout(() => {
                        navigate("/categories");
                    }, 1000);
                } else {
                    setIsError(true);
                    setIsLoading(false);
                    setErrorMessage("Something went wrong try again!");
                }
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
                setErrorMessage(error);
            });
    };

    return (
        <Layout>
            <div className="relative p-4 w-full h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Delete Category
                        </h3>

                        <Link
                            to="/categories"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="defaultModal"
                        >
                            Back
                        </Link>
                    </div>

                    <form onSubmit={handleDelete}>
                        {isSuccess && <SuccessAlert message={successMessage} />}
                        {isError && <ErrorAlert message={errorMessage} />}

                        <div className="mb-5">
                            <h3 className="text-base font-normal text-gray-500">
                                Are you sure you want to delete this category?
                            </h3>
                        </div>

                        <button
                            type="submit"
                            className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            {isLoading && <Spinner />}
                            Delete
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Delete;
