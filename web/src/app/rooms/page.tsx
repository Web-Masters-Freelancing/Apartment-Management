"use client";
import WrapperLayout from "@/app/wrapper.layout";
import CustomModal from "@/components/Modal";
import { RoomSchema } from "@/schemas";
import { useHooks } from "./hooks";
import CustomTable from "@/components/Table";
import SearchBar from "@/components/SearchBar";

const Room = () => {
  const {
    fields,
    handleSubmit,
    open,
    toggleModal,
    initialValues,
    handleSearch,
    dataSource,
    columns,
    title,
    btnName,
    tableHeaderActions,
    tableCellActions,
  } = useHooks();

  return (
    <WrapperLayout>
      <CustomModal
        open={open}
        fields={fields}
        handleSubmit={handleSubmit}
        handleClose={toggleModal}
        validationSchema={RoomSchema}
        initialValues={initialValues}
        key={"add-room-modal"}
        title={title}
        btnName={btnName}
      />
      <SearchBar handleSubmit={handleSearch} />

      <CustomTable
        tableHeader="Room list!"
        columns={columns}
        dataSource={dataSource}
        headerActions={tableHeaderActions}
        cellActions={tableCellActions}
      />
    </WrapperLayout>
  );
};

export default Room;
