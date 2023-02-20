import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ErrorAlert from "../../Common/ErrorAlert/ErrorAlert";
import Layout from "../../Common/Layout/Layout";
import Spinner from "../../Common/Spinner/Spinner";
import SuccessAlert from "../../Common/SuccessAlert/SuccessAlert";

const Update = () => {
    let { userId } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAndCondition, setTermsAndCondition] = useState(false);

    const { updateUser, getUser } = useAuth();

    const handleUpdate = async (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(true);

        if (password === confirmPassword) {
            const user = {
                _id: userId,
                firstName,
                lastName,
                email,
                phone,
                role,
                password,
            };

            updateUser(user).then((result) => {
                if (result === "Success") {
                    setIsSuccess(true);
                    setIsLoading(false);
                    setSuccessMessage("User edited successful!");
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
            });
        } else {
            setIsLoading(false);
            setIsError(true);
            setErrorMessage("Password does not match try again!");
        }
    };

    useEffect(() => {
        getUser(userId).then((result) => {
            setFirstName(result.firstName);
            setLastName(result.lastName);
            setEmail(result.email);
            setPhone(result.phone);
            setRole(result.role);
            setPassword(result.password);
            setConfirmPassword(result.password);
            setTermsAndCondition(false);
        });
    }, []);

    return (
        <Layout>
            <div className="relative w-full h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                    <div className="flex justify-between items-center pb-4 mb-4 rounded sm:mb-5">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Edit User
                        </h3>

                        <Link
                            to="/users"
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
                                    First name
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="first name"
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
                                    placeholder="last name"
                                    required
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Your email
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
                                    Phone number
                                </label>

                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="+8613910998888"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                    Role
                                </label>

                                <select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="">Select Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="••••••••"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Confirm password
                                </label>

                                <input
                                    type="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="••••••••"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
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
