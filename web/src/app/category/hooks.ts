import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import { ActionButtonProps, Column, TableActions } from "@/components/Table";
import { useCallback, useState } from "react";
import { SelectFieldProps } from "@/components/Select";
import { InputFieldProps, Field } from "@/components/hooks/useModal";

export interface CreateCategory {
  id?: number;
  name: string;
  description: string;
}

export const useHook = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [btnName, setBtnName] = useState("");

  const initialFormValues: CreateCategory = {
    name: "",
    description: "",
  };

  const [initialValues, setInitialValues] =
    useState<CreateCategory>(initialFormValues);

  const toggleModal = (values?: CreateCategory | undefined) => {
    if (values) {
      setTitle(values.id ? "EDIT CATEGORY" : "CREATE CATEGORY");
      setBtnName(values.id ? "Save Changes" : "Save");
      setInitialValues(values.id ? values : initialFormValues);
    }

    setOpen((modalState) => !modalState);
  };

  const handleSearch = (values: SearchKey, _: FormikHelpers<SearchKey>) => {};

  const columns: Column<CreateCategory & TableActions>[] = [
    {
      key: "name",
      label: "name",
    },
    {
      key: "description",
      label: "description",
    },
    {
      key: "cellActions",
      label: "actions",
    },
  ];

  const dataSource: CreateCategory[] = [
    {
      id: 1,
      name: "Medium Door Units 8",
      description: "One bedroom, aircon outlet",
    },
  ];

  const tableHeaderActions: ActionButtonProps<any>[] = [
    {
      name: "Add Category",
      variant: "contained",
      handleClick: toggleModal,
    },
  ];

  const tableCellActions: ActionButtonProps<CreateCategory>[] = [
    {
      name: "edit",
      variant: "contained",
      handleClick: toggleModal,
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
        label: "Description",
        name: "description",
        id: "description",
        type: "text",
        margin: "dense",
      },
    },
  ];

  const handleCreateCategory = (
    formValues: CreateCategory,
    formActions: FormikHelpers<CreateCategory>
  ) => {};

  const handleEditCategory = (
    formValues: CreateCategory,
    formActions: FormikHelpers<CreateCategory>
  ) => {};

  const handleSubmit = useCallback(
    function (
      formValues: CreateCategory,
      formActions: FormikHelpers<CreateCategory>
    ) {
      btnName === "Save"
        ? handleCreateCategory(formValues, formActions)
        : handleEditCategory(formValues, formActions);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [btnName]
  );

  return {
    handleSearch,
    columns,
    dataSource,
    open,
    toggleModal,
    tableHeaderActions,
    tableCellActions,
    fields,
    title,
    btnName,
    initialValues,
    handleSubmit,
  };
};
