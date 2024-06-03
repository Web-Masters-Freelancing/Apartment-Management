import { FormikHelpers } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/useSnackbar";
import { decodeToken, setLocalStorage, setToken } from "@/lib/tokenStorage";
import { Routes } from "@/utils/enums";
import { User } from "@/store/api/gen/category";

export type LoginFormValues = {
  username: string;
  password: string;
};

export const useHooks = () => {
  const { push } = useRouter();
  const { setSnackbarProps } = useSnackbar();

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting, resetForm }: FormikHelpers<LoginFormValues>
  ) => {
    setSubmitting(true);

    const response = await axios.post(
      "http://localhost:3031/api/login",
      values
    );

    setToken(response.data.access_token);
    setSubmitting(false);
    resetForm();

    setSnackbarProps({
      open: true,
      message: "Logged in successfully!",
    });

    const secretUser = decodeToken();
    if (secretUser) {
      const { user } = secretUser as { user: User };

      setLocalStorage(user);
      push(Routes.Protected.DASHBOARD);
    }
  };

  return {
    handleSubmit,
  };
};
