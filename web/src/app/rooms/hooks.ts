import { FormikHelpers } from "formik";
import { useCallback, useMemo, useState } from "react";
import { Field, InputFieldProps } from "@/components/hooks/useModal";
import { useRoomApi } from "@/hooks/api/room";
import { useSnackbar } from "@/hooks/useSnackbar";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import {
  ActionButtonProps,
  Column,
  HeaderActions,
  TableActions,
} from "@/components/Table";
import { red } from "@mui/material/colors";
import { AllRoomsResponseDto } from "@/store/api/gen/room";
import { useCategoryApi } from "@/hooks/api/category";
import { PartialPick } from "@/types/generic";

export type SearchKey = {
  keyword: string;
};

interface Schema extends AllRoomsResponseDto, TableActions {}

export const useHooks = () => {
  const {
    handleCreateRoom: createRoom,
    handleEditRoom: editRoom,
    rooms,
    isFetchingRooms,
    handleDeleteRoom: deleteRoom,
  } = useRoomApi();

  const { categories } = useCategoryApi();

  const { setSnackbarProps } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [title, setTitle] = useState("CREATE ROOMS");
  const [btnName, setBtnName] = useState("Save");
  const [roomToDelete, setRoomToDelete] = useState<number | undefined>(
    undefined
  );

  interface InitialValues
    extends Pick<
      AllRoomsResponseDto,
      "categoryId" | "description" | "amount" | "roomNumber" | "id"
    > {}

  const initialFormValues: PartialPick<InitialValues, "description" | "id"> = {
    categoryId: 0,
    amount: 0,
    roomNumber: 0,
  };

  const [initialValues, setInitialValues] =
    useState<PartialPick<InitialValues, "description" | "id">>(
      initialFormValues
    );

  const categoriesType = useMemo((): OptionSelect[] | undefined => {
    const optionSelect = categories?.map((value): OptionSelect => {
      const { id, name } = value;

      return { key: id, value: name };
    });

    return optionSelect;
  }, [categories]);

  const fields: Field<InputFieldProps | SelectFieldProps>[] = [
    {
      fieldType: "select",
      fieldProps: <SelectFieldProps>{
        id: "categoryId",
        label: "Room Category",
        options: categoriesType,
        inputLabelId: "categoryId",
        labelId: "categoryId",
        margin: "dense",
        name: "categoryId",
        defaultValue: "",
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

  const columns: Column<Schema>[] = [
    {
      key: "name",
      label: "category",
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
    payload: AllRoomsResponseDto,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<PartialPick<InitialValues, "description" | "id">>
  ) => {
    try {
      console.log("payload", payload);

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
    { id, ...payload }: AllRoomsResponseDto,
    {
      setSubmitting,
    }: FormikHelpers<PartialPick<InitialValues, "description" | "id">>
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

  const toggleModal = (
    values?: PartialPick<InitialValues, "description" | "id"> | undefined
  ) => {
    if (values) {
      setTitle(values.id ? "EDIT ROOMS" : "CREATE ROOMS");
      setBtnName(values.id ? "Save Changes" : "Save");
      setInitialValues(values.id ? values : initialFormValues);
    }

    setOpen((modalState) => !modalState);
  };

  const handleToggleDialog = (
    values?: PartialPick<InitialValues, "description" | "id"> | undefined
  ) => {
    if (values && values.id) {
      setRoomToDelete(values.id);
    }

    setOpenDialog((state) => !state);
  };

  const tableCellActions: ActionButtonProps<
    PartialPick<InitialValues, "description" | "id">
  >[] = [
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

  const tableHeaderActions: HeaderActions<ActionButtonProps<any>>[] = [
    {
      actionType: "button",
      actionProps: {
        name: "Add Rooms",
        variant: "contained",
        handleClick: toggleModal,
      },
    },
  ];

  const handleSubmit = useCallback(
    function (
      formValues: AllRoomsResponseDto,
      formActions: FormikHelpers<
        PartialPick<InitialValues, "description" | "id">
      >
    ) {
      btnName === "Save"
        ? handleCreateRoom(formValues, formActions)
        : handleEditRoom(formValues, formActions);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btnName]
  );

  const dataSource: AllRoomsResponseDto[] = useMemo(() => {
    return rooms?.length ? (rooms as AllRoomsResponseDto[]) : [];
  }, [rooms]);

  const handleSearch = async (
    values: SearchKey,
    _: FormikHelpers<SearchKey>
  ) => {};

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
