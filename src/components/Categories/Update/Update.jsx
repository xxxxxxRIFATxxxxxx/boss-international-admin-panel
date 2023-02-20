import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toBase64 from "../../../helpers/toBase64";
import useCategories from "../../../hooks/useCategories";
import ErrorAlert from "../../Common/ErrorAlert/ErrorAlert";
import Layout from "../../Common/Layout/Layout";
import Spinner from "../../Common/Spinner/Spinner";
import SuccessAlert from "../../Common/SuccessAlert/SuccessAlert";

const Update = () => {
    let { categoryId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const [title, setTitle] = useState("");
    const [rawImage, setRawImage] = useState({});

    const { updateCategory, getCategory } = useCategories();

    const handleUpdate = async (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(true);

        // convert images to base 64 format
        let image;

        if (rawImage.name) {
            image = await toBase64(rawImage);
        }

        let category = {
            _id: categoryId,
            title,
        };

        // check image upload or not
        if (image) {
            category.image = image;
        }

        updateCategory(category)
            .then((result) => {
                if (result === "Success") {
                    setIsSuccess(true);
                    setIsLoading(false);
                    setSuccessMessage("Category updated successfully!");
                } else {
                    setIsError(true);
                    setIsLoading(false);
                    setErrorMessage("Something went wrong try again!");
                }

                setTimeout(() => {
                    setSuccessMessage("");
                    setErrorMessage("");
                    setIsSuccess(false);
                    setIsError(false);
                    setIsLoading(false);
                }, 3000);
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
                setErrorMessage(error);
            });
    };

    useEffect(() => {
        getCategory(categoryId).then((result) => {
            setTitle(result.title);
            setRawImage({});
        });
    }, []);

    return (
        <Layout>
            <div className="relative w-full h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded sm:mb-5">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Update Category
                        </h3>

                        <Link
                            to="/categories"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="defaultModal"
                        >
                            Back
                        </Link>
                    </div>

                    <form onSubmit={handleUpdate}>
                        {isSuccess && <SuccessAlert message={successMessage} />}
                        {isError && <ErrorAlert message={errorMessage} />}

                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Type category title"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Image
                                </label>

                                <input
                                    className="block mb-5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={(e) =>
                                        setRawImage(e.target.files[0])
                                    }
                                ></input>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            {isLoading && <Spinner />}
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Update;
