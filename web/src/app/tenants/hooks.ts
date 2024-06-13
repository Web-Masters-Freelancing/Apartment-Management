import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import {
  ActionButtonProps,
  Column,
  HeaderActions,
  TableActions,
} from "@/components/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { InputFieldProps, Field } from "@/components/hooks/useModal";
import { useRoomApi } from "@/hooks/api/room";
import { useUserApi } from "@/hooks/api/user";
import { useSnackbar } from "@/hooks/useSnackbar";
import { CreateUserDto, FindAllUsersResponseDto } from "@/store/api/gen/user";
import { red } from "@mui/material/colors";
import { TextareaAutosizeProps } from "@mui/material";
import { CustomDatePickerProps } from "@/components/DatePicker";
import moment from "moment";
import { Payments } from "@/store/api/gen/category";

interface TenantFormValues
  extends CreateUserDto,
    Pick<Payments, "advancePayment"> {
  id?: number;
  description?: string;
  deposit: number;
}

const inititialFormValues: TenantFormValues = {
  name: "",
  contact: "",
  address: "",
  roomId: 0,
  description: "",
  email: "",
  startDate: "",
  role: "TENANT",
  deposit: 0,
  advancePayment: 0,
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
        const { id, name, amount } = value;
        return {
          key: id,
          value: `${name} ${amount}`,
        };
      }),
    [availableRooms]
  );

  const fields: Field<
    | InputFieldProps
    | SelectFieldProps
    | TextareaAutosizeProps
    | CustomDatePickerProps
  >[] = [
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
        label: "Email",
        name: "email",
        id: "email",
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
        defaultValue: "",
        handleSelectChange: (id) => {
          if (availableRooms && availableRooms.length) {
            const filteredRoom = availableRooms.find(
              (value) => value.id === id
            );

            if (filteredRoom) {
              const { description } = filteredRoom;
              return {
                propertyName: "description",
                value: description,
              };
            }
          }
        },
      },
    },
    {
      fieldType: "textarea",
      fieldProps: <TextareaAutosizeProps>{
        label: "Room description",
        name: "description",
        id: "description",
        type: "textarea",
        margin: "dense",
        placeholder: "Room Description",
        disabled: true,
      },
    },

    {
      fieldType: "date",
      fieldProps: <CustomDatePickerProps>{
        label: "Select start date",
        name: "startDate",
      },
    },

    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Deposit",
        name: "deposit",
        id: "deposit",
        type: "number",
        margin: "dense",
      },
    },
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Advance payment",
        name: "advancePayment",
        id: "advancePayment",
        type: "number",
        margin: "dense",
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
    { password, role, id, description, ...payload }: TenantFormValues,
    { resetForm, setSubmitting }: FormikHelpers<TenantFormValues>
  ) => {
    try {
      await createUser({
        ...payload,
        password: "tenant",
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
      id &&
        (await editUser(id, { ...payload, role: "TENANT" } as CreateUserDto));

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
      key: "startDate",
      label: "start date",
      format: (value) => moment(value).format("YYYY/MM/DD"),
    },
    {
      key: "dueDate",
      label: "next due date",
      format: (value) => moment(value).format("YYYY/MM/DD"),
    },
    {
      key: "roomNumber",
      label: "Door Number",
      format: (value) => `Door ${value}`,
    },
    {
      key: "deposit",
      label: "amount deposit",
    },
    {
      key: "name",
      label: "name",
    },
    {
      key: "email",
      label: "email",
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
      key: "cellActions",
      label: "actions",
    },
  ];

  const dataSource: TenantFormValues[] = useMemo(
    () => (users?.length ? (users as unknown as TenantFormValues[]) : []),
    [users]
  );

  const handleEdit = (
    values: (FindAllUsersResponseDto & { description?: string }) | undefined
  ) => {
    if (values) {
      const { role, description, deposit, startDate, ...payload } = values;

      setTitle("EDIT TENANT");
      setBtnName("Save Changes");
      setInitialValues({
        ...payload,
        deposit,
        advancePayment: deposit,
        description: description ?? "",
        role: "TENANT",
      } as any);
      toggleModal();
    }
  };

  const tableHeaderActions: HeaderActions<ActionButtonProps<any>>[] = [
    {
      actionType: "button",
      actionProps: {
        name: "Add Tenant",
        variant: "contained",
        handleClick: toggleModal,
      },
    },
  ];

  const handleToggleDialog = (values?: FindAllUsersResponseDto | undefined) => {
    if (values && values.id) {
      setUserToDelete(values.id);
    }

    setOpenDialog((state) => !state);
  };

  const tableCellActions: ActionButtonProps<FindAllUsersResponseDto>[] = [
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
