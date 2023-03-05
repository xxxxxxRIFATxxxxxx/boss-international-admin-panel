import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../../Common/ErrorAlert/ErrorAlert";
import Spinner from "../../Common/Spinner/Spinner";
import Create from "../Create/Create";

const Table = ({ orders, isLoading, successMessage, errorMessage }) => {
    // For Search
    const [searchOrders, setSearchOrders] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchAvtice, setSearchActive] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        setSearchActive(false);

        const findOrders = orders.filter((order) =>
            order._id.toLowerCase().includes(searchText.toLowerCase())
        );

        setSearchOrders(findOrders);

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
                                    Total Orders:{" "}
                                </span>

                                <span>{orders.length}</span>
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
                                        placeholder="Search by order ID"
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
                                <span>Add order</span>
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
                                            Order ID
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            User ID
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            First name
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Last name
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Email
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Phone
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Country
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Street Address
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            City
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            State
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Post code
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Notes
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Products
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Total price
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Status
                                        </th>

                                        <th scope="col" className="px-4 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {searchOrders.map((order) => {
                                        return (
                                            <tr
                                                key={order._id}
                                                className="border-b hover:bg-gray-100"
                                            >
                                                <th className="px-4 py-2 text-primary-500">
                                                    <Link
                                                        to={`/orders/${order._id}`}
                                                    >
                                                        {order._id}
                                                    </Link>
                                                </th>

                                                <td className="px-4 py-2">
                                                    {order.userId}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.firstName}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.lastName}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.email}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.phone}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.country}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.streetAddress}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.city}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.state}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.postCode}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.notes}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.products.map(
                                                        (product) => {
                                                            <td
                                                                scope="row"
                                                                className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowra"
                                                            >
                                                                <img
                                                                    src={`${product.thumbnail}`}
                                                                    alt=""
                                                                    className="w-auto h-8 mr-3"
                                                                />

                                                                <ul class="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
                                                                    <li>
                                                                        {
                                                                            product.id
                                                                        }
                                                                    </li>

                                                                    <li>
                                                                        {
                                                                            product.title
                                                                        }
                                                                    </li>

                                                                    <li>
                                                                        {
                                                                            product.price
                                                                        }
                                                                    </li>

                                                                    <li>
                                                                        {
                                                                            product.quantity
                                                                        }
                                                                    </li>
                                                                </ul>
                                                            </td>;
                                                        }
                                                    )}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order.totalPrice}
                                                </td>

                                                <td className="px-4 py-2">
                                                    {order?.status}
                                                </td>

                                                <td className="px-4 py-2">
                                                    <Link
                                                        to={`/orders/${order._id}`}
                                                        className="hover:text-primary-700 text-base mr-2"
                                                    >
                                                        <i className="fa-solid fa-pen-to-square "></i>
                                                    </Link>

                                                    <Link
                                                        to={`/orders/delete/${order._id}`}
                                                        className="hover:text-primary-700 text-base"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>

                                {searchOrders.length === 0 && (
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
                                        Order ID
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        User ID
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        First name
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Last name
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Email
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Phone
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Country
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Street Address
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        City
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        State
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Post code
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Notes
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Products
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Total price
                                    </th>

                                    <th scope="col" className="px-4 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.length < 1 && (
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

                                {orders.map((order) => {
                                    return (
                                        <tr
                                            key={order._id}
                                            className="border-b hover:bg-gray-100"
                                        >
                                            <th className="px-4 py-2 text-primary-500">
                                                <Link
                                                    to={`/orders/${order._id}`}
                                                >
                                                    {order._id}
                                                </Link>
                                            </th>

                                            <td className="px-4 py-2">
                                                {order.userId}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.firstName}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.lastName}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.email}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.phone}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.country}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.streetAddress}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.city}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.state}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.postCode}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.notes}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.products.map(
                                                    (product) => {
                                                        <td
                                                            scope="row"
                                                            className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowra"
                                                        >
                                                            <img
                                                                src={`${product.thumbnail}`}
                                                                alt=""
                                                                className="w-auto h-8 mr-3"
                                                            />

                                                            <ul class="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
                                                                <li>
                                                                    {product.id}
                                                                </li>

                                                                <li>
                                                                    {
                                                                        product.title
                                                                    }
                                                                </li>

                                                                <li>
                                                                    {
                                                                        product.price
                                                                    }
                                                                </li>

                                                                <li>
                                                                    {
                                                                        product.quantity
                                                                    }
                                                                </li>
                                                            </ul>
                                                        </td>;
                                                    }
                                                )}
                                            </td>

                                            <td className="px-4 py-2">
                                                {order.totalPrice}
                                            </td>

                                            <td className="px-4 py-2">
                                                <Link
                                                    to={`/orders/${order._id}`}
                                                    className="hover:text-primary-700 text-base mr-2"
                                                >
                                                    <i className="fa-solid fa-pen-to-square "></i>
                                                </Link>

                                                <Link
                                                    to={`/orders/delete/${order._id}`}
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
