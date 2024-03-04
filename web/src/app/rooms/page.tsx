"use client";
import WrapperLayout from "@/app/wrapper.layout";
import CustomModal from "@/components/Modal";
import { LinearProgress } from "@mui/material";
import { RoomSchema } from "@/schemas";
import { useHooks } from "./hooks";
import CustomTable from "@/components/Table";
import SearchBar from "@/components/SearchBar";
import Dialog from "@/components/Dialog";

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
    isFetchingRooms,
    handleToggleDialog,
    openDialog,
    handleDeleteRoom,
  } = useHooks();

  return (
    <WrapperLayout>
      <CustomModal
        open={open}
        formProps={{
          fields,
          handleSubmit,
          initialValues,
          validationSchema: RoomSchema,
        }}
        handleClose={toggleModal}
        key={"add-room-modal"}
        title={title}
        btnName={btnName}
      />
      <SearchBar handleSubmit={handleSearch} />

      {isFetchingRooms ? (
        <LinearProgress color="primary" />
      ) : (
        <CustomTable
          tableHeader="Room List"
          columns={columns}
          dataSource={dataSource}
          headerActions={tableHeaderActions}
          cellActions={tableCellActions}
        />
      )}

      <Dialog
        contentText="This action is irreversible."
        handleSubmit={handleDeleteRoom}
        open={openDialog}
        title="Are you sure you want you delete this room?"
        toggleDialog={handleToggleDialog}
      />
    </WrapperLayout>
  );
};

export default Room;
