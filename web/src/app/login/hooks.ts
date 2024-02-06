import { FormikHelpers } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks/useSnackbar";
import { setToken } from "@/lib/tokenStorage";
import { Routes } from "@/utils/enums";

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
		push(Routes.Protected.DASHBOARD);
	};

	return {
		handleSubmit,
	};
};
