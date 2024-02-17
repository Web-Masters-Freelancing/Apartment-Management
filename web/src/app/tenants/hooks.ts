import { FormikHelpers } from "formik";
import { RoomsFormValues, SearchRoom } from "../rooms/hooks";
import { ActionButtonProps, Column, TableActions } from "@/components/Table";
import { useCallback, useEffect, useState } from "react";
import { OptionSelect, SelectFieldProps } from "@/components/Select";
import { InputFieldProps, Field } from "@/components/hooks/useModal";

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
  extends Partial<Pick<RoomHistoryValues, "roomId">>,
    Partial<Pick<RoomsFormValues, "amount">> {
  id?: number;
  name: string;
  contact: string;
  address: string;
}

const inititialFormValues: TenantFormValues = {
  name: "",
  contact: "",
  address: "",
  roomId: undefined,
  amount: undefined,
};

/**
 * Schema properties
 * extend {@link TenantFormValues} {@link TableActions}
 */
interface Schema
  extends TenantFormValues,
    TableActions,
    Pick<RoomsFormValues, "type"> {}

export const useHook = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [btnName, setBtnName] = useState("");

  const [initialValues, setInitialValues] =
    useState<TenantFormValues>(inititialFormValues);

  const toggleModal = () => setOpen((modalState) => !modalState);

  const roomsAvailable: OptionSelect[] = [
    {
      key: 1,
      value: "Bedspacer Abutor viridis defendo consuasor ambulo supra apto",
    },
  ];

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
    {
      fieldType: "text",
      fieldProps: <InputFieldProps>{
        label: "Amount",
        name: "amount",
        id: "amount",
        type: "text",
        margin: "dense",
        disabled: true,
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

  const handleSave = (
    { name, contact, address, roomId }: TenantFormValues,
    { resetForm, setSubmitting }: FormikHelpers<TenantFormValues>
  ) => {};

  const handleChanges = (
    { id, name, contact, address, roomId }: TenantFormValues,
    { resetForm, setSubmitting }: FormikHelpers<TenantFormValues>
  ) => {};

  const handleSubmit = useCallback(
    () => (btnName === "Save" ? handleSave : handleChanges),
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
      key: "type", // base of roomId
      label: "Assigned room",
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
      roomId: 1,
    },
    {
      name: "Al Olitres",
      contact: "000 000 000",
      address: "Tukuran Zamboanga del sur",
      roomId: 1,
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
