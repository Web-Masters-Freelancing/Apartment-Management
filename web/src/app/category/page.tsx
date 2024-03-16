"use client";
import React from "react";
import WrapperLayout from "../wrapper.layout";
import SearchBar from "@/components/SearchBar";
import { useHook } from "./hooks";
import CustomTable from "@/components/Table";
import CustomModal from "@/components/Modal";
import { CategoryFormSchema } from "@/schemas";
import { LinearProgress } from "@mui/material";
import Dialog from "@/components/Dialog";

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
    isFetchingCategory,
    handleToggleDialog,
    handleDeleteCategory,
    openDialog,
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
      {isFetchingCategory ? (
        <LinearProgress color="primary" />
      ) : (
        <CustomTable
          tableHeader="Category List"
          columns={columns}
          dataSource={dataSource}
          headerActions={tableHeaderActions}
          cellActions={tableCellActions}
        />
      )}

      <Dialog
        contentText="This action is irreversible."
        handleSubmit={handleDeleteCategory}
        open={openDialog}
        title="Are you sure you want you delete this room?"
        toggleDialog={handleToggleDialog}
      />
    </WrapperLayout>
  );
};

export default CategoryPage;
