"use client";
import WrapperLayout from "@/app/wrapper.layout";
import SearchBar from "@/components/SearchBar";
import { useHook } from "./hooks";
import { TenantFormSchema } from "@/schemas";
import CustomModal from "@/components/Modal";
import CustomTable from "@/components/Table";
import { LinearProgress } from "@mui/material";
import Dialog from "@/components/Dialog";

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
    isFetchingUsers,
    handleRemoveUser,
    handleToggleDialog,
    openDialog,
  } = useHook();

  return (
    <WrapperLayout>
      <CustomModal
        open={open}
        formProps={{
          fields,
          handleSubmit,
          initialValues,
          validationSchema: TenantFormSchema,
        }}
        handleClose={toggleModal}
        key={"add-room-modal"}
        title={title}
        btnName={btnName}
      />
      <SearchBar handleSubmit={handleSearch} />
      {isFetchingUsers ? (
        <LinearProgress color="primary" />
      ) : (
        <CustomTable
          tableHeader="Tenant list"
          columns={columns}
          dataSource={dataSource}
          headerActions={tableHeaderActions}
          cellActions={tableCellActions}
        />
      )}

      <Dialog
        contentText="This action is irreversible."
        handleSubmit={handleRemoveUser}
        open={openDialog}
        title="Are you sure you want to remove this tenant?"
        toggleDialog={handleToggleDialog}
      />
    </WrapperLayout>
  );
};

export default TenantPage;
