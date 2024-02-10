"use client";
import WrapperLayout from "@/app/wrapper.layout";
import SearchBar from "@/components/SearchBar";
import { useHook } from "./hooks";
import { TenantFormSchema } from "@/schemas";
import CustomModal from "@/components/Modal";
import CustomTable from "@/components/Table";

const TenantPage = () => {
  const {
    handleSearch,
    fields,
    open,
    toggleModal,
    btnName,
    initialValues,
    title,
    handleSubmit,
    columns,
    tableHeaderActions,
    tableCellActions,
    dataSource,
  } = useHook();

  return (
    <WrapperLayout>
      <CustomModal
        open={open}
        fields={fields}
        handleSubmit={handleSubmit}
        handleClose={toggleModal}
        validationSchema={TenantFormSchema}
        initialValues={initialValues}
        key={"add-room-modal"}
        title={title}
        btnName={btnName}
      />
      <SearchBar handleSubmit={handleSearch} />
      <CustomTable
        tableHeader="Tenant list!"
        columns={columns}
        dataSource={dataSource}
        headerActions={tableHeaderActions}
        cellActions={tableCellActions}
      />
    </WrapperLayout>
  );
};

export default TenantPage;
