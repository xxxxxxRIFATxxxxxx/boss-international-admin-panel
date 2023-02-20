import { useEffect, useState } from "react";

const useAuth = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const access_token = JSON.parse(localStorage.getItem("access_token"));

    const signUp = (user) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
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

    const updateUser = (user) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/users/${user._id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
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

    const deleteUser = (id) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
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

    const getUsers = () => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
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

    const getUser = (id) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/users/${id}`)
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

    const login = (user) => {
        const promise = new Promise((resolve, reject) => {
            fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((res) => res.json())
                .then((data) => {
                    const result = data;
                    resolve(result);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return promise;
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
    };

    useEffect(() => {
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const result = data.result;
                setUsers(result);
                setIsLoading(false);
                setSuccessMessage("Users Fetched Successfully!");
            })
            .catch((error) => {
                setErrorMessage(error);
                setIsLoading(false);
            });
    }, [users]);

    return {
        users,
        isLoading,
        successMessage,
        errorMessage,
        signUp,
        updateUser,
        deleteUser,
        getUsers,
        getUser,
        login,
        logout,
    };
};

export default useAuth;
