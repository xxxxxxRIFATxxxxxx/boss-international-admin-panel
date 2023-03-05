import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ErrorAlert from "../Common/ErrorAlert/ErrorAlert";
import Spinner from "../Common/Spinner/Spinner";
import SuccessAlert from "../Common/SuccessAlert/SuccessAlert";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const { login } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();

        setSuccessMessage("");
        setErrorMessage("");
        setIsSuccess(false);
        setIsError(false);
        setIsLoading(true);

        const user = {
            email,
            password,
        };

        login(user)
            .then((result) => {
                if (result.message === "Success") {
                    // set user data to local storage
                    localStorage.setItem(
                        "access_token",
                        JSON.stringify(result.access_token)
                    );
                    localStorage.setItem("user", JSON.stringify(result.user));

                    setIsSuccess(true);
                    setIsLoading(false);
                    setSuccessMessage("Login successful!");
                    setEmail("");
                    setPassword("");
                    setRememberMe(false);

                    setTimeout(() => {
                        navigate("/products");
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

    // check user logged in or not
    const user = JSON.parse(localStorage.getItem("user"));
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    if (user && access_token) {
        return <Navigate to="/products" />;
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link
                    to="/"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
                >
                    <h1 className="text-xl">
                        <span className="text-primary-700">
                            Boss International
                        </span>{" "}
                        Admin Panel
                    </h1>
                </Link>

                <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Sign in to your account
                        </h1>

                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleLogin}
                        >
                            {isSuccess && (
                                <SuccessAlert message={successMessage} />
                            )}
                            {isError && <ErrorAlert message={errorMessage} />}

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Your email
                                </label>

                                <input
                                    type="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    placeholder="name@company.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                                            checked={rememberMe}
                                            onChange={(e) =>
                                                setRememberMe(e.target.checked)
                                            }
                                        />
                                    </div>

                                    <div className="ml-3 text-sm">
                                        <label className="text-gray-500">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <Link
                                    to="/"
                                    className="text-sm font-medium text-primary-600 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
                            >
                                {isLoading && <Spinner />}
                                Sign in
                            </button>

                            <p className="text-sm font-light text-gray-500">
                                Don’t have an account yet?{" "}
                                <Link
                                    to="/signup"
                                    className="font-medium text-primary-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
