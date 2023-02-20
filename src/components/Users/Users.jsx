import React from "react";
import useAuth from "../../hooks/useAuth";
import Layout from "../Common/Layout/Layout";
import Table from "./Table/Table";

const Users = () => {
    const { users, isLoading, successMessage, errorMessage } = useAuth();

    return (
        <Layout>
            <Table
                users={users}
                isLoading={isLoading}
                successMessage={successMessage}
                errorMessage={errorMessage}
            />
        </Layout>
    );
};

export default Users;
