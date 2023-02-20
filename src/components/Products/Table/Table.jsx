import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../../Common/ErrorAlert/ErrorAlert";
import Spinner from "../../Common/Spinner/Spinner";
import Create from "../Create/Create";

const Table = ({ products, isLoading, successMessage, errorMessage }) => {
    // For Search
    const [searchProducts, setSearchProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchAvtice, setSearchActive] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        setSearchActive(false);

        const findProducts = products.filter((product) =>
            product.title.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchProducts(findProducts);

        setSearchText("");
        setSearchActive(true);
    };

    // For Create
    const [showCreateModal, setShowCreateModal] = useState(false);
    const handleCreate = () => {
        setShowCreateModal(true);
    };

    return (
        <section>
            <div className="mx-auto max-w-screen-2xl">
                <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg">
                    <div className="flex flex-col px-4 py-3 space-y-3 md:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                        <div className="flex items-center flex-1 space-x-4">
                            <h5>
                                <span className="text-gray-500">
                                    Total Products:{" "}
                                </span>

                                <span>{products.length}</span>
                            </h5>
                        </div>

                        <div className="w-full md:w-1/3 mr-4 lg:mr-0">
                            <form
                                className="flex items-center"
                                onSubmit={handleSearch}
                            >
                                <label className="sr-only">Search</label>

                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg
                                            aria-hidden="true"
                                            className="w-5 h-5 text-gray-500"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>

                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 px-4 py-3"
                                        placeholder="Search by product title"
                                        required
                                        value={searchText}
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                    />
                                </div>
                            </form>
                        </div>

                        <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-3 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:outline-none"
                                onClick={handleCreate}
                            >
                                <i className="fa-regular fa-plus mt-1 mr-1"></i>
                                <span>Add product</span>
                            </button>
                        </div>
                    </div>

                    {/* Search Table */}
                    {searchAvtice && (
                        <div className="overflow-auto mb-10 border border-primary-500 rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr className="px-4 py-3">
                                        <th scope="col" className="px-4 py-3">
                                            Search Result
                                        </th>
                                    </tr>
                                </thead>

                                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3">
                                            Title
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Category
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Price
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Rating
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Availability
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Shipping
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Weight
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {searchProducts.map((product) => {
                                        return (
                                            <tr
                                                key={product._id}
                                                className="border-b hover:bg-gray-100"
                                            >
                                                <th
                                                    scope="row"
                                                    className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowra text-primary-500"
                                                >
                                                    <img
                                                        src={`${product.thumbnail}`}
                                                        alt=""
                                                        className="w-auto h-8 mr-3"
                                                    />
                                                    <Link
                                                        to={`/products/${product._id}`}
                                                    >
                                                        {product.title}
                                                    </Link>
                                                </th>

                                                <td className="px-4 py-2">
                                                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded">
                                                        {product.category}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="inline-block w-4 h-4 mr-2 bg-primary-700 rounded-full"></div>
                                                        ${product.price}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-5 h-5 text-yellow-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>

                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-5 h-5 text-yellow-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>

                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-5 h-5 text-yellow-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>

                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-5 h-5 text-yellow-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>

                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-5 h-5 text-yellow-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>

                                                        <span className="ml-1 text-gray-500">
                                                            {product.rating}.0
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            className="w-5 h-5 mr-2 text-gray-400"
                                                            aria-hidden="true"
                                                        >
                                                            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                        </svg>
                                                        {product.availability}
                                                    </div>
                                                </td>

                                                <td className="px-4 py-2">
                                                    {product.shipping}
                                                </td>

                                                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                    {product.weight}
                                                </td>

                                                <td className="px-4 py-2">
                                                    <Link
                                                        to={`/products/${product._id}`}
                                                        className="hover:text-primary-700 text-base mr-2"
                                                    >
                                                        <i className="fa-solid fa-pen-to-square "></i>
                                                    </Link>

                                                    <Link
                                                        to={`/products/delete/${product._id}`}
                                                        className="hover:text-primary-700 text-base"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                                {searchProducts.length === 0 && (
                                    <tbody>
                                        <tr className="border-b hover:bg-gray-100">
                                            <td className="px-4 py-2">
                                                No Result Found!
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                    )}

                    <div className="overflow-auto h-[60vh]">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        Title
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Category
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Price
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Rating
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Availability
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Shipping
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Weight
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.length < 1 && (
                                    <tr className="border-b hover:bg-gray-100">
                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <Spinner />
                                        </td>

                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <Spinner />
                                        </td>

                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <Spinner />
                                        </td>

                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <Spinner />
                                        </td>

                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <Spinner />
                                        </td>

                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <Spinner />
                                        </td>

                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <Spinner />
                                        </td>

                                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                            <Spinner />
                                        </td>
                                    </tr>
                                )}

                                {errorMessage && (
                                    <ErrorAlert message={errorMessage} />
                                )}

                                {products.map((product) => {
                                    return (
                                        <tr
                                            key={product._id}
                                            className="border-b hover:bg-gray-100"
                                        >
                                            <th
                                                scope="row"
                                                className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowra text-primary-500"
                                            >
                                                <img
                                                    src={`${product.thumbnail}`}
                                                    alt=""
                                                    className="w-auto h-8 mr-3"
                                                />
                                                <Link
                                                    to={`/products/${product._id}`}
                                                >
                                                    {product.title}
                                                </Link>
                                            </th>

                                            <td className="px-4 py-2">
                                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded">
                                                    {product.category}
                                                </span>
                                            </td>

                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="inline-block w-4 h-4 mr-2 bg-primary-700 rounded-full"></div>
                                                    ${product.price}
                                                </div>
                                            </td>

                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5 text-yellow-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>

                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5 text-yellow-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>

                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5 text-yellow-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>

                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5 text-yellow-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>

                                                    <svg
                                                        aria-hidden="true"
                                                        className="w-5 h-5 text-yellow-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>

                                                    <span className="ml-1 text-gray-500">
                                                        {product.rating}.0
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="w-5 h-5 mr-2 text-gray-400"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                    </svg>
                                                    {product.availability}
                                                </div>
                                            </td>

                                            <td className="px-4 py-2">
                                                {product.shipping}
                                            </td>

                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                {product.weight}
                                            </td>

                                            <td className="px-4 py-2">
                                                <Link
                                                    to={`/products/${product._id}`}
                                                    className="hover:text-primary-700 text-base mr-2"
                                                >
                                                    <i className="fa-solid fa-pen-to-square "></i>
                                                </Link>

                                                <Link
                                                    to={`/products/delete/${product._id}`}
                                                    className="hover:text-primary-700 text-base"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Create
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
            />
        </section>
    );
};

export default Table;
