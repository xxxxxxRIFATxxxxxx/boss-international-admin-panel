import React from "react";
import useOrders from "../../hooks/useOrders";
import Layout from "../Common/Layout/Layout";
import Table from "./Table/Table";

const Orders = () => {
    const { orders, isLoading, successMessage, errorMessage } = useOrders();

    return (
        <Layout>
            <Table
                orders={orders}
                isLoading={isLoading}
                successMessage={successMessage}
                errorMessage={errorMessage}
            />
        </Layout>
    );
};

export default Orders;
