import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useOrders from "../../../hooks/useOrders";
import useProducts from "../../../hooks/useProducts";
import ErrorAlert from "../../Common/ErrorAlert/ErrorAlert";
import Layout from "../../Common/Layout/Layout";
import Spinner from "../../Common/Spinner/Spinner";
import SuccessAlert from "../../Common/SuccessAlert/SuccessAlert";

const Update = () => {
    let { orderId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const [userId, setUserId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postCode, setPostCode] = useState("");
    const [notes, setNotes] = useState("");
    const [productsInput, setProductsInput] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [status, setStatus] = useState("");

    const { updateOrder, getOrder } = useOrders();
    const { users } = useAuth();
    const { products } = useProducts();

    const handleUpdate = async (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(true);

        const order = {
            _id: orderId,
            firstName,
            lastName,
            email,
            phone,
            country,
            streetAddress,
            city,
            state,
            postCode,
            notes,
            totalPrice,
            status,
        };

        updateOrder(order)
            .then((result) => {
                if (result === "Success") {
                    setIsSuccess(true);
                    setIsLoading(false);
                    setSuccessMessage("Order updated successfully!");
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
        getOrder(orderId).then((result) => {
            setUserId(result.userId);
            setFirstName(result.firstName);
            setLastName(result.lastName);
            setEmail(result.email);
            setPhone(result.phone);
            setCountry(result.country);
            setStreetAddress(result.streetAddress);
            setCity(result.city);
            setState(result.state);
            setPostCode(result.postCode);
            setNotes(result.notes);
            setProductsInput(result.products);
            setTotalPrice(result.totalPrice);
            setStatus(result?.status);
        });
    }, []);

    return (
        <Layout>
            <div className="relative p-4 w-full h-full md:h-auto">
                {/* Modal content */}
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    {/* Modal header */}
                    <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Update Order
                        </h3>

                        <Link
                            to="/orders"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                            data-modal-toggle="defaultModal"
                        >
                            Back
                        </Link>
                    </div>

                    {/* Modal body */}
                    <form onSubmit={handleUpdate}>
                        {isSuccess && <SuccessAlert message={successMessage} />}
                        {isError && <ErrorAlert message={errorMessage} />}

                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    User
                                </label>

                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    onChange={(e) => setUserId(e.target.value)}
                                >
                                    <option value="">Select user</option>

                                    {users.map((user) => {
                                        return (
                                            <option
                                                key={user._id}
                                                value={user._id}
                                            >
                                                {user._id}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    First name
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="First name"
                                    required
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Last name
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="First name"
                                    required
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="+8613810998888"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Country
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Country"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Street address
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Street address"
                                    required
                                    value={streetAddress}
                                    onChange={(e) =>
                                        setStreetAddress(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    City
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="City"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    State
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="State"
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Post code
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Post code"
                                    required
                                    value={postCode}
                                    onChange={(e) =>
                                        setPostCode(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Notes
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="Notes"
                                    required
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Products
                                </label>

                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    onChange={(e) =>
                                        setProductsInput(e.target.value)
                                    }
                                    required
                                >
                                    <option value="">Select product</option>

                                    {products.map((product) => {
                                        return (
                                            <option
                                                key={product._id}
                                                value={product._id}
                                            >
                                                {product._id}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Status
                                </label>

                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="">Select status</option>

                                    <option>Pending</option>
                                    <option>Processing</option>
                                    <option>Complete</option>
                                    <option>Decline</option>
                                </select>
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
