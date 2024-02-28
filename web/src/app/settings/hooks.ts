import { useAuthApi } from "@/hooks/api/auth";
import { useSnackbar } from "@/hooks/useSnackbar";
import { getToken } from "@/lib/tokenStorage";
import { ResetPasswordDto } from "@/store/api/gen/auth";
import { FormikHelpers } from "formik";
import { useState } from "react";

interface SecurityValues extends ResetPasswordDto {
  confirmPassword: string;
}

export const useHook = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);
  const { setSnackbarProps } = useSnackbar();

  const { handleResetPassword: resetPassword } = useAuthApi();

  const handleResetPassword = async (
    { currentPassword, newPassword }: SecurityValues,
    { resetForm, setSubmitting }: FormikHelpers<SecurityValues>
  ) => {
    try {
      const token = getToken();

      await resetPassword(token as string, {
        currentPassword,
        newPassword,
      });

      setSubmitting(false);
      resetForm();

      setSnackbarProps({
        open: true,
        message: "Password successfully changed!",
        severity: "success",
      });
    } catch (err: any) {
      setSnackbarProps({
        open: true,
        message: err.message || "Something went wrong, please try again later.",
        severity: "error",
      });
    }
  };

  const initialValues: SecurityValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  return { open, handleClick, handleResetPassword, initialValues };
};
