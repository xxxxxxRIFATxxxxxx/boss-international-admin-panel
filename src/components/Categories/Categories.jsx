import React from "react";
import useCategories from "../../hooks/useCategories";
import Layout from "../Common/Layout/Layout";
import Table from "./Table/Table";

const Categories = () => {
    const { categories, isLoading, successMessage, errorMessage } =
        useCategories();

    return (
        <Layout>
            <Table
                categories={categories}
                isLoading={isLoading}
                successMessage={successMessage}
                errorMessage={errorMessage}
            />
        </Layout>
    );
};

export default Categories;
