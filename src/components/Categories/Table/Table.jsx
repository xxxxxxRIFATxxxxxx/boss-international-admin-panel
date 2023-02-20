import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../../Common/ErrorAlert/ErrorAlert";
import Spinner from "../../Common/Spinner/Spinner";
import Create from "../Create/Create";

const Table = ({ categories, isLoading, successMessage, errorMessage }) => {
    // For Search
    const [searchCategories, setSearchCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchAvtice, setSearchActive] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        setSearchActive(false);

        const findCategories = categories.filter((category) =>
            category.title.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchCategories(findCategories);

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
                                    Total Categories:{" "}
                                </span>

                                <span>{categories.length}</span>
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
                                        placeholder="Search by title"
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
                                <span>Add category</span>
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
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {searchCategories.map((category) => {
                                        return (
                                            <tr
                                                key={category._id}
                                                className="border-b hover:bg-gray-100"
                                            >
                                                <th
                                                    scope="row"
                                                    className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowra"
                                                >
                                                    <img
                                                        src={`${category.image}`}
                                                        alt=""
                                                        className="w-auto h-8 mr-3"
                                                    />

                                                    <Link
                                                        to={`/products/${category._id}`}
                                                    >
                                                        {category.title}
                                                    </Link>
                                                </th>

                                                <td className="px-4 py-2">
                                                    <Link
                                                        to={`/categories/${category._id}`}
                                                        className="hover:text-primary-700 text-base mr-2"
                                                    >
                                                        <i className="fa-solid fa-pen-to-square "></i>
                                                    </Link>

                                                    <Link
                                                        to={`/categories/delete/${category._id}`}
                                                        className="hover:text-primary-700 text-base"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                                {searchCategories.length === 0 && (
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
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.length < 1 && (
                                    <tr className="border-b hover:bg-gray-100">
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

                                {categories.map((category) => {
                                    return (
                                        <tr
                                            key={category._id}
                                            className="border-b hover:bg-gray-100"
                                        >
                                            <th
                                                scope="row"
                                                className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowra"
                                            >
                                                <img
                                                    src={`${category.image}`}
                                                    alt=""
                                                    className="w-auto h-8 mr-3"
                                                />

                                                <Link
                                                    to={`/products/${category._id}`}
                                                >
                                                    {category.title}
                                                </Link>
                                            </th>

                                            <td className="px-4 py-2">
                                                <Link
                                                    to={`/categories/${category._id}`}
                                                    className="hover:text-primary-700 text-base mr-2"
                                                >
                                                    <i className="fa-solid fa-pen-to-square "></i>
                                                </Link>

                                                <Link
                                                    to={`/categories/delete/${category._id}`}
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
