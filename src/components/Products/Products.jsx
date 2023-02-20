import React from "react";
import useProducts from "../../hooks/useProducts";
import Layout from "../Common/Layout/Layout";
import Table from "./Table/Table";

const Products = () => {
    const { products, isLoading, successMessage, errorMessage } = useProducts();

    return (
        <Layout>
            <Table
                products={products}
                isLoading={isLoading}
                successMessage={successMessage}
                errorMessage={errorMessage}
            />
        </Layout>
    );
};

export default Products;
