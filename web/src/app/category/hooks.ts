import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import {
  ActionButtonProps,
  Column,
  HeaderActions,
  TableActions,
} from "@/components/Table";
import { useCallback, useMemo, useState } from "react";
import { SelectFieldProps } from "@/components/Select";
import { InputFieldProps, Field } from "@/components/hooks/useModal";
import { useCategoryApi } from "@/hooks/api/category";
import { useSnackbar } from "@/hooks/useSnackbar";
import { TextareaAutosizeProps } from "@mui/material";
import { FindAllCategoryResponseDto } from "../../store/api/gen/category";
import { red } from "@mui/material/colors";

export const useHook = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [btnName, setBtnName] = useState("");
  const { setSnackbarProps } = useSnackbar();
  const [categoryToDelete, setCategoryToDelete] = useState<number | undefined>(
    undefined
  );
  const [openDialog, setOpenDialog] = useState(false);
  const {
    handleCreateCategory: create,
    categories,
    isFetchingCategory,
    handleEditCategory: edit,
    handleDeleteCategory: deleteCategory,
  } = useCategoryApi();

  const initialFormValues: Pick<
    FindAllCategoryResponseDto,
    "name" | "description"
  > = {
    name: "",
    description: "",
  };

  const [initialValues, setInitialValues] =
    useState<Pick<FindAllCategoryResponseDto, "name" | "description">>(
      initialFormValues
    );

  const toggleModal = (values?: FindAllCategoryResponseDto | undefined) => {
    setTitle(values?.id ? "EDIT CATEGORY" : "CREATE CATEGORY");
    setBtnName(values?.id ? "Save Changes" : "Save");
    setInitialValues(values?.id ? values : initialFormValues);

    setOpen((modalState) => !modalState);
  };

  const handleSearch = (values: SearchKey, _: FormikHelpers<SearchKey>) => {};

  const columns: Column<FindAllCategoryResponseDto & TableActions>[] = [
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dataSource = useMemo(
    () => (categories?.length ? categories : []),
    [categories]
  );

  const tableHeaderActions: HeaderActions<ActionButtonProps<any>>[] = [
    {
      actionType: "button",
      actionProps: {
        name: "Add Category",
        variant: "contained",
        handleClick: toggleModal,
      },
    },
  ];

  const fields: Field<
    InputFieldProps | SelectFieldProps | TextareaAutosizeProps
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
      fieldType: "textarea",
      fieldProps: <TextareaAutosizeProps>{
        label: "Description",
        name: "description",
        id: "description",
        type: "textarea",
        margin: "dense",
        placeholder: "Description",
      },
    },
  ];

  const handleCreateCategory = async (
    { name, description }: FindAllCategoryResponseDto,
    { setSubmitting, resetForm }: FormikHelpers<FindAllCategoryResponseDto>
  ) => {
    try {
      await create({ name, description });
      setSnackbarProps({
        open: true,
        message: "Category is successfully created!",
        severity: "success",
      });
      setSubmitting(false);
      resetForm();
      toggleModal();
    } catch (e: any) {
      setSnackbarProps({
        open: true,
        message: e.message || "Something went wrong, please try again later.",
        severity: "error",
      });

      toggleModal();
    }
  };

  const handleEditCategory = async (
    { id, ...payload }: FindAllCategoryResponseDto,
    { setSubmitting, resetForm }: FormikHelpers<FindAllCategoryResponseDto>
  ) => {
    try {
      await edit(id, payload);
      setSnackbarProps({
        open: true,
        message: "Category is successfully updated!",
        severity: "success",
      });
      setSubmitting(false);
      resetForm();
      toggleModal();
    } catch (e: any) {
      setSnackbarProps({
        open: true,
        message: e.message || "Something went wrong, please try again later.",
        severity: "error",
      });

      toggleModal();
    }
  };

  const handleDeleteCategory = useCallback(async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete);
        setSnackbarProps({
          open: true,
          severity: "success",
          message: "Category is successfully deleted.",
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
  }, [categoryToDelete]);

  const handleToggleDialog = (
    values?: FindAllCategoryResponseDto | undefined
  ) => {
    if (values && values.id) {
      setCategoryToDelete(values.id);
    }

    setOpenDialog((state) => !state);
  };

  const tableCellActions: ActionButtonProps<FindAllCategoryResponseDto>[] = [
    {
      name: "edit",
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

  const handleSubmit = useCallback(
    function (
      formValues: FindAllCategoryResponseDto,
      formActions: FormikHelpers<FindAllCategoryResponseDto>
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
    isFetchingCategory,
    handleToggleDialog,
    handleDeleteCategory,
    openDialog,
  };
};
