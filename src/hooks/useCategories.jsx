import { useEffect, useState } from "react";

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const createCategory = (category) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/category`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
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

    const updateCategory = (category) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/category/${category._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
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

    const deleteCategory = (id) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/category/${id}`, {
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

    const getCategory = (id) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/category/${id}`)
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

        fetch(`${process.env.REACT_APP_API_URL}/category`)
            .then((res) => res.json())
            .then((data) => {
                const result = data.result;
                setCategories(result);
                setIsLoading(false);
                setSuccessMessage("Category Fetched Successfully!");
            })
            .catch((error) => {
                setErrorMessage(error);
                setIsLoading(false);
            });
    }, [categories]);

    return {
        categories,
        isLoading,
        successMessage,
        errorMessage,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategory,
    };
};

export default useCategories;
