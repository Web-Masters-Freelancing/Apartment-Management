import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import { ActionButtonProps, Column, TableActions } from "@/components/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { InputFieldProps, Field } from "@/components/hooks/useModal";
import { useRoomApi } from "@/hooks/api/room";
import { useUserApi } from "@/hooks/api/user";
import { useSnackbar } from "@/hooks/useSnackbar";
import { CreateUserDto, FindAllUsersResponseDto } from "@/store/api/gen/user";
import { red } from "@mui/material/colors";

interface TenantFormValues extends CreateUserDto {
  id?: number;
}

const inititialFormValues: TenantFormValues = {
  name: "",
  contact: "",
  address: "",
  roomId: 0,
  role: "TENANT",
};

export const useHook = () => {
  const [title, setTitle] = useState("");
  const [btnName, setBtnName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | undefined>(
    undefined
  );

  const [initialValues, setInitialValues] =
    useState<TenantFormValues>(inititialFormValues);

  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen((modalState) => !modalState);

  const { availableRooms } = useRoomApi();

  const {
    handleCreateUser: createUser,
    users,
    isFetchingUsers,
    handleEditUser: editUser,
    handleRemoveUser: removeUser,
  } = useUserApi();
  const { setSnackbarProps } = useSnackbar();

  const roomsAvailable = useMemo(
    (): OptionSelect[] | undefined =>
      availableRooms?.map((value) => {
        const { id, type, description } = value;
        return {
          key: id,
          value: `${type} ${description}`,
        };
      }),
    [availableRooms]
  );

  const fields: Field<InputFieldProps | SelectFieldProps>[] = [
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        placeholder: "ex: John Doe",
        label: "Name",
        name: "name",
        id: "name",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Contact",
        name: "contact",
        id: "contact",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Address",
        name: "address",
        id: "address",
        type: "text",
        margin: "dense",
      },
    },
    {
      fieldType: "select",
      fieldProps: <SelectFieldProps>{
        id: "roomId",
        label: "Assign room",
        options: roomsAvailable,
        inputLabelId: "roomId",
        labelId: "roomId",
        margin: "dense",
        name: "roomId",
        defaultValue: 0,
      },
    },
  ];

  const handleSearch = async (
    values: SearchKey,
    _: FormikHelpers<SearchKey>
  ) => {
    console.log("values", values);
  };

  const searchActions: ActionButtonProps<any>[] = [
    {
      name: "Add Tenant",
      variant: "contained",
      handleClick: toggleModal,
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

  const handleCreateUser = async (
    { name, contact, address, roomId }: TenantFormValues,
    { resetForm, setSubmitting }: FormikHelpers<TenantFormValues>
  ) => {
    try {
      await createUser({
        name,
        contact,
        address,
        roomId,
        role: "TENANT",
      });
      showSnackbar("Tenant is successfully created!");
      setSubmitting(false);
      resetForm({ values: initialValues });

      toggleModal();
    } catch (e: any) {
      handleCatchError(e);
    }
  };

  const handleEditUser = async (
    { id, ...payload }: TenantFormValues,
    { resetForm, setSubmitting }: FormikHelpers<TenantFormValues>
  ) => {
    try {
      id && (await editUser(id, { ...payload, role: "TENANT" }));

      showSnackbar("Tenant is successfully updated.");

      setSubmitting(false);
      resetForm();
      toggleModal();
    } catch (e: any) {
      handleCatchError(e);
    }
  };

  const handleRemoveUser = useCallback(async () => {
    if (userToDelete) {
      try {
        await removeUser(userToDelete);

        showSnackbar("User is removed.");

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
  }, [userToDelete]);

  const handleSubmit = useCallback(
    function (
      formValues: TenantFormValues,
      formActions: FormikHelpers<TenantFormValues>
    ) {
      btnName === "Save"
        ? handleCreateUser(formValues, formActions)
        : handleEditUser(formValues, formActions);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btnName]
  );

  const columns: Column<FindAllUsersResponseDto & TableActions>[] = [
    {
      key: "name",
      label: "name",
    },
    {
      key: "contact",
      label: "contact",
    },
    {
      key: "address",
      label: "address",
    },
    {
      key: "type", // base of roomId
      label: "Assigned room",
    },
    {
      key: "roomNumber",
      label: "Door Number",
      format: (value) => `Door ${value}`,
    },
    {
      key: "cellActions",
      label: "actions",
    },
  ];

  const dataSource: TenantFormValues[] = useMemo(
    () => (users?.length ? (users as TenantFormValues[]) : []),
    [users]
  );

  const handleEdit = (values: TenantFormValues | undefined) => {
    if (values) {
      const { id, name, contact, address, roomId } = values;

      setTitle("EDIT TENANT");
      setBtnName("Save Changes");
      setInitialValues({
        id,
        name,
        contact,
        address,
        roomId,
        role: "TENANT",
      });
      toggleModal();
    }
  };

  const tableHeaderActions: ActionButtonProps<any>[] = [
    {
      name: "Add Tenant",
      variant: "contained",
      handleClick: toggleModal,
    },
  ];

  const handleToggleDialog = (values?: TenantFormValues) => {
    if (values && values.id) {
      setUserToDelete(values.id);
    }

    setOpenDialog((state) => !state);
  };

  const tableCellActions: ActionButtonProps<TenantFormValues>[] = [
    {
      name: "edit",
      variant: "contained",
      handleClick: handleEdit,
    },
    {
      name: "remove",
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

  useEffect(() => {
    if (!open) {
      setTitle("CREATE TENANT");
      setInitialValues(inititialFormValues);
      setBtnName("Save");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return {
    handleSearch,
    searchActions,
    open,
    fields,
    toggleModal,
    btnName,
    initialValues,
    title,
    handleSubmit,
    columns,
    dataSource,
    tableHeaderActions,
    tableCellActions,
    isFetchingUsers,
    openDialog,
    handleRemoveUser,
    handleToggleDialog,
  };
};
