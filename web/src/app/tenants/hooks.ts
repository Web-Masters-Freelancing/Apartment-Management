import { FormikHelpers } from "formik";
import { SearchRoom } from "../rooms/hooks";
import { ActionButtonProps, Column, TableActions } from "@/components/Table";
import { useCallback, useState } from "react";
import { SelectFieldProps } from "@/components/Select";
import { InputFieldProps, Field } from "@/components/hooks/useModal";

interface TenantFormValues {
  id?: number;
  name: string;
  contact: string;
  address: string;
}

/**
 * Schema properties
 * extend {@link TenantFormValues} {@link TableActions}
 */
interface Schema extends TenantFormValues, TableActions {}

export const useHook = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("CREATE TENANT");

  const [btnName, setBtnName] = useState("Save");
  const [initialValues, setInitialValues] = useState<TenantFormValues>({
    name: "",
    contact: "",
    address: "",
  });

  const toggleModal = () => setOpen((modalState) => !modalState);

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
    { name, contact, address }: TenantFormValues,
    { resetForm, setSubmitting }: FormikHelpers<TenantFormValues>
  ) => {};

  const handleChanges = (
    { id, name, contact, address }: TenantFormValues,
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
      key: "cellActions",
      label: "actions",
    },
  ];

  const dataSource: TenantFormValues[] = [
    {
      name: "Dexter Louie Aniez",
      contact: "0926 3919 834",
      address: "Tawagan Zamboang del sur",
    },
    {
      name: "Al Olitres",
      contact: "000 000 000",
      address: "Tukuran Zamboanga del sur",
    },
  ];

  const handleEdit = (values: TenantFormValues | undefined) => {
    if (values) {
      setTitle("EDIT ROOMS");
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
