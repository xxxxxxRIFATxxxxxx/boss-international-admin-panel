import { useEffect, useState } from "react";

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const createOrder = (order) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify(order),
            })
                .then((res) => res.json())
                .then((data) => {
                    const result = data.message;
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    };

    const updateOrder = (order) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/orders/${order._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order),
            })
                .then((res) => res.json())
                .then((data) => {
                    const result = data.message;
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    };

    const deleteOrder = (id) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    const result = data.message;
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    };

    const getOrder = (id) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`)
                .then((res) => res.json())
                .then((data) => {
                    const result = data.result;
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    };

    useEffect(() => {
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/orders`)
            .then((res) => res.json())
            .then((data) => {
                const result = data.result;
                setOrders(result);
                setIsLoading(false);
                setSuccessMessage("Orders Fetched Successfully!");
            })
            .catch((error) => {
                setErrorMessage(error);
                setIsLoading(false);
            });
    }, [orders]);

    return {
        orders,
        isLoading,
        successMessage,
        errorMessage,
        createOrder,
        updateOrder,
        deleteOrder,
        getOrder,
    };
};

export default useOrders;
