"use client";
import { useState } from "react";
import { LoginFormValues } from "../login/hooks";
import { FormikHelpers } from "formik";

interface PasswordSettingsValues extends Pick<LoginFormValues, "password"> {
  newPassword: string;
}

export const useHook = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  const handleSubmit = (
    values: PasswordSettingsValues,
    {}: FormikHelpers<PasswordSettingsValues>
  ) => {};

  return { handleSubmit, handleClick, open };
};
