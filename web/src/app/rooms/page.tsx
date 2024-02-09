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
    tableActions,
    title,
    btnName,
    searchActions,
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
      <SearchBar handleSubmit={handleSearch} actions={searchActions} />

      <CustomTable
        tableName="Room list!"
        columns={columns}
        dataSource={dataSource}
        actions={tableActions}
      />
    </WrapperLayout>
  );
};

export default Room;
