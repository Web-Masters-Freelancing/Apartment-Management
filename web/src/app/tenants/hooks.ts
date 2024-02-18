import { FormikHelpers } from "formik";
import { RoomsFormValues, SearchRoom } from "../rooms/hooks";
import { ActionButtonProps, Column, TableActions } from "@/components/Table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { InputFieldProps, Field } from "@/components/hooks/useModal";
import { useRoomApi } from "@/hooks/api/room";
import { useUserApi } from "@/hooks/api/user";
import { useSnackbar } from "@/hooks/useSnackbar";
import { CreateUserDto } from "@/store/api/gen/user";

interface RoomHistoryValues {
  id: number;
  roomId: number;
  userId: number;
}

/**
 * TenantFormValues properties
 * extends of {@link RoomHistoryValues}  pick only property roomId
 * extends of {@link RoomsFormValues} pick only property amount
 */
interface TenantFormValues
  extends Pick<RoomHistoryValues, "roomId">,
    Partial<Pick<RoomsFormValues, "amount">>,
    Partial<Pick<CreateUserDto, "role">> {
  id?: number;
  name: string;
  contact: string;
  address: string;
}

const inititialFormValues: TenantFormValues = {
  name: "",
  contact: "",
  address: "",
  roomId: 0,
};

/**
 * Schema properties
 * extend {@link TenantFormValues} {@link TableActions}
 */
interface Schema extends TenantFormValues, TableActions {}

export const useHook = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [btnName, setBtnName] = useState("");

  const [initialValues, setInitialValues] =
    useState<TenantFormValues>(inititialFormValues);

  const toggleModal = () => setOpen((modalState) => !modalState);

  const { availableRooms } = useRoomApi();

  const { handleCreateUser: createUser } = useUserApi();
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
        defaultValue: "",
      },
    },
  ];

  const handleSearch = async (
    values: SearchRoom,
    _: FormikHelpers<SearchRoom>
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
      setSnackbarProps({
        open: true,
        message: "Tenant is successfully created!",
        severity: "success",
      });
      setSubmitting(false);
      resetForm();

      toggleModal();
    } catch (e: any) {
      console.error(e);
      setSnackbarProps({
        open: true,
        message: e.message || "Something went wrong, please try again later.",
        severity: "error",
      });

      toggleModal();
    }
  };

  const handleEditUser = (
    { id, name, contact, address, roomId }: TenantFormValues,
    { resetForm, setSubmitting }: FormikHelpers<TenantFormValues>
  ) => {};

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

  const columns: Column<Schema>[] = [
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
      key: "roomId", // base of roomId
      label: "Assigned room",
    },

    {
      key: "amount",
      label: "amount",
      format: (value: number) => value.toLocaleString("en-US"),
    },

    {
      key: "cellActions",
      label: "actions",
    },
  ];

  const dataSource: TenantFormValues[] = [
    {
      name: "Dexter Louie Aniez",
      contact: "0926 3919 834",
      address: "Tawagan Zamboang del sur",
      roomId: 2,
      amount: 10000,
    },
    {
      name: "Al Olitres",
      contact: "000 000 000",
      address: "Tukuran Zamboanga del sur",
      roomId: 2,
      amount: 9000,
    },
  ];

  const handleEdit = (values: TenantFormValues | undefined) => {
    if (values) {
      setTitle("EDIT TENANT");
      setBtnName("Save Changes");
      setInitialValues({ ...values });
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

  const tableCellActions: ActionButtonProps<TenantFormValues>[] = [
    {
      name: "edit",
      variant: "contained",
      handleClick: handleEdit,
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
  };
};
