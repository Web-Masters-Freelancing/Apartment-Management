"use client";
import React from "react";
import WrapperLayout from "../wrapper.layout";
import SearchBar from "@/components/SearchBar";
import { useHook } from "./hooks";
import CustomTable from "@/components/Table";
import CustomModal from "@/components/Modal";
import { CategoryFormSchema } from "@/schemas";

const CategoryPage = () => {
  const {
    handleSearch,
    columns,
    dataSource,
    tableHeaderActions,
    tableCellActions,
    fields,
    open,
    toggleModal,
    title,
    btnName,
    initialValues,
    handleSubmit,
  } = useHook();
  return (
    <WrapperLayout>
      <CustomModal
        open={open}
        formProps={{
          fields,
          handleSubmit: handleSubmit,
          initialValues,
          validationSchema: CategoryFormSchema,
        }}
        handleClose={toggleModal}
        key={"add-room-modal"}
        title={title}
        btnName={btnName}
      />
      <SearchBar handleSubmit={handleSearch} />
      <CustomTable
        tableHeader="Category List"
        columns={columns}
        dataSource={dataSource}
        headerActions={tableHeaderActions}
        cellActions={tableCellActions}
      />
    </WrapperLayout>
  );
};

export default CategoryPage;
