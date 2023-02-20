import "./App.css";

// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// React JWT
import { isExpired } from "react-jwt";

// Auth
import PrivateRoute from "./components/Common/PrivateRoute/PrivateRoute";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

// Products
import { default as DeleteProduct } from "./components/Products/Delete/Delete";
import Products from "./components/Products/Products";
import { default as UpdateProduct } from "./components/Products/Update/Update";

// Orders
import { default as DeleteOrder } from "./components/Orders/Delete/Delete";
import Orders from "./components/Orders/Orders";
import { default as UpdateOrder } from "./components/Orders/Update/Update";

// Categories
import Categories from "./components/Categories/Categories";
import { default as DeleteCategory } from "./components/Categories/Delete/Delete";
import { default as UpdateCategory } from "./components/Categories/Update/Update";

// Users
import { default as DeleteUser } from "./components/Users/Delete/Delete";
import { default as UpdateUser } from "./components/Users/Update/Update";
import Users from "./components/Users/Users";
import useAuth from "./hooks/useAuth";

// React Router
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },

    {
        path: "/signup",
        element: <SignUp />,
    },

    // Products
    {
        path: "/products",
        element: (
            <PrivateRoute>
                <Products />
            </PrivateRoute>
        ),
    },

    {
        path: "/products/:productId",
        element: (
            <PrivateRoute>
                <UpdateProduct />
            </PrivateRoute>
        ),
    },

    {
        path: "/products/delete/:productId",
        element: (
            <PrivateRoute>
                <DeleteProduct />
            </PrivateRoute>
        ),
    },

    // Orders
    {
        path: "/orders",
        element: (
            <PrivateRoute>
                <Orders />
            </PrivateRoute>
        ),
    },

    {
        path: "/orders/:orderId",
        element: (
            <PrivateRoute>
                <UpdateOrder />
            </PrivateRoute>
        ),
    },

    {
        path: "/orders/delete/:orderId",
        element: (
            <PrivateRoute>
                <DeleteOrder />
            </PrivateRoute>
        ),
    },

    // Categories
    {
        path: "/categories",
        element: (
            <PrivateRoute>
                <Categories />
            </PrivateRoute>
        ),
    },

    {
        path: "/categories/:categoryId",
        element: (
            <PrivateRoute>
                <UpdateCategory />
            </PrivateRoute>
        ),
    },

    {
        path: "/categories/delete/:categoryId",
        element: (
            <PrivateRoute>
                <DeleteCategory />
            </PrivateRoute>
        ),
    },

    // Users
    {
        path: "/users",
        element: (
            <PrivateRoute>
                <Users />
            </PrivateRoute>
        ),
    },

    {
        path: "/users/:userId",
        element: (
            <PrivateRoute>
                <UpdateUser />
            </PrivateRoute>
        ),
    },

    {
        path: "/users/delete/:userId",
        element: (
            <PrivateRoute>
                <DeleteUser />
            </PrivateRoute>
        ),
    },
]);

function App() {
    // Check JWT Token Expired Or Not
    const { logout } = useAuth();
    const access_token = JSON.parse(localStorage.getItem("access_token"));
    const isTokenExpired = isExpired(access_token);

    if (isTokenExpired) {
        logout();
    }

    return <RouterProvider router={router} />;
}

export default App;
