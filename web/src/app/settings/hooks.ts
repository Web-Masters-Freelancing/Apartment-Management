import { FormikHelpers } from "formik";
import { useState } from "react";

interface SecurityValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const useHook = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  const handleSubmit = async (
    { currentPassword, newPassword, confirmPassword }: SecurityValues,
    { resetForm, setSubmitting }: FormikHelpers<SecurityValues>
  ) => {
    console.log("====================================");
    console.log("values", currentPassword);
    console.log("====================================");
  };

  const initialValues: SecurityValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  return { open, handleClick, handleSubmit, initialValues };
};
