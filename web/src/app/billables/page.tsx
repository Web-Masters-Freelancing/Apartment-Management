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
    handleTogglePaymentsModal,
    listOfPayments,
    openPaymentListModal,
    paymentListColumns,
  } = useHook();

  return (
    <WrapperLayout>
      <Modal
        open={open}
        formProps={{
          fields,
          handleSubmit: handlePayment,
          initialValues,
          validationSchema: ProcessPaymentSchema,
        }}
        handleClose={handleToggleModal}
        key={"add-room-modal"}
        title={"Process payment"}
        btnName={"Submit"}
      />
      <Modal
        handleClose={handleTogglePaymentsModal}
        open={openPaymentListModal}
        title="List of payments made"
        modalFor="list"
        width={1000}
        listProps={{
          columns: paymentListColumns,
          dataSource: listOfPayments,
        }}
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
