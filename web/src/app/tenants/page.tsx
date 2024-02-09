"use client";
import WrapperLayout from "@/app/wrapper.layout";
import SearchBar from "@/components/SearchBar";
import { useHook } from "./hooks";
import { TenantSchema } from "@/schemas";
import CustomModal from "@/components/Modal";
import CustomTable from "@/components/Table";

const TenantPage = () => {
  const {
    handleSearch,
    searchActions,
    fields,
    open,
    toggleModal,
    btnName,
    initialValues,
    title,
    handleSubmit,
    columns,
    tableActions,
    dataSource,
  } = useHook();

  return (
    <WrapperLayout>
      <CustomModal
        open={open}
        fields={fields}
        handleSubmit={handleSubmit}
        handleClose={toggleModal}
        validationSchema={TenantSchema}
        initialValues={initialValues}
        key={"add-room-modal"}
        title={title}
        btnName={btnName}
      />
      <SearchBar handleSubmit={handleSearch} actions={searchActions} />
      <CustomTable
        tableName="Tenant list!"
        columns={columns}
        dataSource={dataSource}
        actions={tableActions}
      />
    </WrapperLayout>
  );
};

export default TenantPage;
