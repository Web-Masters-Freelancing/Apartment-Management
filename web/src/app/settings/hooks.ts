import { FormikHelpers } from "formik";
import { useState } from "react";

interface SecurityValues {
  currentPassword: string;
  newPassword: string;
}

export const useHook = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  const handleSubmit = (
    { currentPassword, newPassword }: SecurityValues,
    { resetForm, setSubmitting }: FormikHelpers<SecurityValues>
  ) => {};

  return { open, handleClick, handleSubmit };
};
