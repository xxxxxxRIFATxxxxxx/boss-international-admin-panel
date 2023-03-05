import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toBase64 from "../../../helpers/toBase64";
import useCategories from "../../../hooks/useCategories";
import useProducts from "../../../hooks/useProducts";
import ErrorAlert from "../../Common/ErrorAlert/ErrorAlert";
import Layout from "../../Common/Layout/Layout";
import Spinner from "../../Common/Spinner/Spinner";
import SuccessAlert from "../../Common/SuccessAlert/SuccessAlert";

const Update = () => {
    let { productId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [rating, setRating] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("");
    const [shipping, setShipping] = useState("");
    const [weight, setWeight] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnailRawImage, setThumbnailRawImage] = useState({});
    const [imagesRaw, setImagesRaw] = useState([]);

    const { updateProduct, getProduct } = useProducts();
    const { categories } = useCategories();

    const handleUpdate = async (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(true);

        // convert images to base 64 format
        let thumbnail;

        if (thumbnailRawImage.name) {
            thumbnail = await toBase64(thumbnailRawImage);
        }

        let images = [];

        if (imagesRaw.length > 0) {
            for (let i = 0; i < imagesRaw.length; i++) {
                const image = imagesRaw[i];
                const base64Img = await toBase64(image);
                images.push(base64Img);
            }
        }

        let product = {
            _id: productId,
            title,
            price,
            rating,
            description,
            availability,
            shipping,
            weight,
            category,
        };

        // check image upload or not

        if (thumbnail) {
            product.thumbnail = thumbnail;
        }

        if (images.length !== 0) {
            product.images = images;
        }

        updateProduct(product)
            .then((result) => {
                if (result === "Success") {
                    setIsSuccess(true);
                    setIsLoading(false);
                    setSuccessMessage("Product updated successfully!");
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
        getProduct(productId).then((result) => {
            setTitle(result.title);
            setPrice(result.price);
            setRating(result.rating);
            setDescription(result.description);
            setAvailability(result.availability);
            setShipping(result.shipping);
            setWeight(result.weight);
            setCategory(result.category);
            setThumbnailRawImage({});
            setImagesRaw([]);
        });
    }, []);

    return (
        <Layout>
            <div className="relative w-full h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded sm:mb-5">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Edit Product
                        </h3>

                        <Link
                            to="/products"
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
                                    placeholder="Type product title"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                                    placeholder="$2999"
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Rating
                                </label>

                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    defaultValue={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    required
                                >
                                    <option value="">Select rating</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Availability
                                </label>

                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    defaultValue={availability}
                                    onChange={(e) =>
                                        setAvailability(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">
                                        Select availability
                                    </option>
                                    <option value="In Stock">In Stock</option>
                                    <option value="Stock Out">Stock Out</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Shipping
                                </label>

                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    defaultValue={shipping}
                                    onChange={(e) =>
                                        setShipping(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select shipping</option>

                                    <option value="1 day shipping">
                                        1 day shipping
                                    </option>

                                    <option value="2 day shipping">
                                        2 day shipping
                                    </option>

                                    <option value="3 day shipping">
                                        3 day shipping
                                    </option>

                                    <option value="4 day shipping">
                                        4 day shipping
                                    </option>

                                    <option value="5 day shipping">
                                        5 day shipping
                                    </option>

                                    <option value="6 day shipping">
                                        6 day shipping
                                    </option>

                                    <option value="7 day shipping">
                                        7 day shipping
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Weight
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="0.5 kg"
                                    required
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Category
                                </label>

                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select Category</option>

                                    {categories.map((category) => {
                                        return (
                                            <option
                                                key={category._id}
                                                value={`${category.title}`}
                                            >
                                                {category.title}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                                    placeholder="Write product description here"
                                    required
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                ></textarea>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Thumbnail
                                </label>

                                <input
                                    className="block mb-5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg, image/webp"
                                    onChange={(e) =>
                                        setThumbnailRawImage(e.target.files[0])
                                    }
                                ></input>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Images
                                </label>

                                <input
                                    className="block mb-5 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    type="file"
                                    accept="image/png, image/gif, image/jpeg, image/webp"
                                    multiple
                                    onChange={(e) =>
                                        setImagesRaw(e.target.files)
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
