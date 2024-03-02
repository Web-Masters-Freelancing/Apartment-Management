"use client";
import WrapperLayout from "@/app/wrapper.layout";
import { useHook } from "./hooks";
import SearchBar from "@/components/SearchBar";
import CustomTable from "@/components/Table";
import { LinearProgress } from "@mui/material";
import Modal from "@/components/Modal";
import { ProcessPaymentSchema } from "@/schemas";

const BillablesPage = () => {
  const {
    handleSearch,
    columns,
    dataSource,
    tableCellActions,
    isFetching,
    open,
    fields,
    handlePayment,
    handleToggleModal,
    initialValues,
  } = useHook();

  return (
    <WrapperLayout>
      <Modal
        open={open}
        fields={fields}
        handleSubmit={handlePayment}
        handleClose={handleToggleModal}
        validationSchema={ProcessPaymentSchema}
        initialValues={initialValues}
        key={"add-room-modal"}
        title={"Process payment"}
        btnName={"Submit"}
      />
      <SearchBar handleSubmit={handleSearch} />
      {isFetching ? (
        <LinearProgress color="primary" />
      ) : (
        <CustomTable
          cellActions={tableCellActions}
          tableHeader="Billables List"
          columns={columns}
          dataSource={dataSource ?? []}
        />
      )}
    </WrapperLayout>
  );
};

export default BillablesPage;
