import { FormikHelpers } from "formik";
import { useCallback, useMemo, useState } from "react";
import { Field, InputFieldProps } from "@/components/hooks/useModal";
import { useRoomApi } from "@/hooks/api/room";
import { useSnackbar } from "@/hooks/useSnackbar";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { ActionButtonProps, Column, TableActions } from "@/components/Table";
import { red } from "@mui/material/colors";

export enum ERoomType {
  FAMILY = "family",
  DELUXE = "deluxe",
  STANDARD = "standard",
  BARKADA = "barkada",
}

export type RoomsFormValues = {
  id?: number;
  type: string;
  description?: string;
  amount: number;
  status?: string;
  roomNumber: number;
};

export type SearchRoom = {
  keyword: string;
};

interface Schema extends RoomsFormValues, TableActions {}

export const useHooks = () => {
  const {
    handleCreateRoom: createRoom,
    handleEditRoom: editRoom,
    rooms,
    isFetchingRooms,
    handleDeleteRoom: deleteRoom,
  } = useRoomApi();
  const { setSnackbarProps } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("CREATE ROOMS");
  const [btnName, setBtnName] = useState("Save");
  const [roomToDelete, setRoomToDelete] = useState<number | undefined>(
    undefined
  );

  const initialFormValues: RoomsFormValues = {
    type: "",
    description: "",
    amount: 0,
    status: "",
    roomNumber: 0,
  };

  const [initialValues, setInitialValues] =
    useState<RoomsFormValues>(initialFormValues);

  const roomTypes: OptionSelect[] = [
    { key: ERoomType.FAMILY, value: "Family" },
    { key: ERoomType.DELUXE, value: "Deluxe" },
    { key: ERoomType.STANDARD, value: "Standard" },
    { key: ERoomType.BARKADA, value: "Barkada" },
  ];

  const fields: Field<InputFieldProps | SelectFieldProps>[] = [
    {
      fieldType: "select",
      fieldProps: <SelectFieldProps>{
        id: "type",
        label: "Room type",
        options: roomTypes,
        inputLabelId: "type",
        labelId: "type",
        margin: "dense",
        name: "type",
        defaultValue: "",
      },
    },
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Description",
        name: "description",
        id: "description",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Amount",
        name: "amount",
        id: "amount",
        type: "number",
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Room number",
        name: "roomNumber",
        id: "roomNumber",
        type: "number",
        margin: "dense",
      },
    },
  ];

  const dataSource: RoomsFormValues[] = useMemo(() => {
    return rooms?.length ? (rooms as RoomsFormValues[]) : [];
  }, [rooms]);

  const columns: Column<Schema>[] = [
    {
      key: "type",
      label: "type",
    },
    {
      key: "description",
      label: "description",
    },
    {
      key: "amount",
      label: "amount",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      key: "roomNumber",
      label: "room number",
      format: (value) => `Door ${value}`,
    },
    {
      key: "status",
      label: "status",
    },
    {
      key: "cellActions",
      label: "actions",
    },
  ];

  const handleSearch = async (
    values: SearchRoom,
    _: FormikHelpers<SearchRoom>
  ) => {
    console.log("values", values);
  };

  const handleCatchError = (e: any) => {
    console.error(e);
    setSnackbarProps({
      open: true,
      message: e.message || "Something went wrong, please try again later.",
      severity: "error",
    });

    toggleModal();
  };

  const showSnackbar = (message: string) => {
    setSnackbarProps({
      open: true,
      message,
      severity: "success",
    });
  };

  const handleCreateRoom = async (
    payload: RoomsFormValues,
    { setSubmitting, resetForm }: FormikHelpers<RoomsFormValues>
  ) => {
    try {
      await createRoom(payload);

      showSnackbar("Room is successfully created!");

      setSubmitting(false);
      resetForm({ values: initialFormValues });

      toggleModal();
    } catch (e: any) {
      handleCatchError(e);

      setSubmitting(false);
      resetForm({ values: initialFormValues });
    }
  };

  const handleEditRoom = async (
    { id, ...payload }: RoomsFormValues,
    { setSubmitting }: FormikHelpers<RoomsFormValues>
  ) => {
    try {
      id && (await editRoom(id, payload));

      showSnackbar("Room is successfully updated!");

      setSubmitting(false);
      setInitialValues(initialFormValues);

      toggleModal();
    } catch (e) {
      handleCatchError(e);

      setSubmitting(false);
      setInitialValues(initialFormValues);
    }
  };

  const handleDeleteRoom = useCallback(async () => {
    if (roomToDelete) {
      try {
        await deleteRoom(roomToDelete);

        setSnackbarProps({
          open: true,
          severity: "success",
          message: "Room is deleted.",
        });

        setOpenDialog(false);
      } catch (e: any) {
        setSnackbarProps({
          open: true,
          severity: "error",
          message: e.message || "Something went wrong, please try again later.",
        });

        setOpenDialog(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomToDelete]);

  const toggleModal = (values?: RoomsFormValues | undefined) => {
    if (values) {
      setTitle(values.id ? "EDIT ROOMS" : "CREATE ROOMS");
      setBtnName(values.id ? "Save Changes" : "Save");
      setInitialValues(values.id ? values : initialFormValues);
    }

    setOpen((modalState) => !modalState);
  };

  const handleToggleDialog = (values?: RoomsFormValues | undefined) => {
    if (values && values.id) {
      setRoomToDelete(values.id);
    }

    setOpenDialog((state) => !state);
  };

  const tableCellActions: ActionButtonProps<RoomsFormValues>[] = [
    {
      name: "Edit",
      variant: "contained",
      handleClick: toggleModal,
    },
    {
      name: "Delete",
      variant: "contained",
      handleClick: handleToggleDialog,
      sx: {
        backgroundColor: red[300],
        ":hover": {
          backgroundColor: red[400],
        },
      },
    },
  ];

  const tableHeaderActions: ActionButtonProps<any>[] = [
    {
      name: "Add Rooms",
      variant: "contained",
      handleClick: toggleModal,
    },
  ];

  const handleSubmit = useCallback(
    function (
      formValues: RoomsFormValues,
      formActions: FormikHelpers<RoomsFormValues>
    ) {
      btnName === "Save"
        ? handleCreateRoom(formValues, formActions)
        : handleEditRoom(formValues, formActions);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btnName]
  );

  return {
    isFetchingRooms,
    handleSubmit,
    btnName,
    fields,
    toggleModal,
    open,
    initialValues,
    handleSearch,
    dataSource,
    columns,
    title,
    tableHeaderActions,
    tableCellActions,
    openDialog,
    handleToggleDialog,
    handleDeleteRoom,
  };
};
