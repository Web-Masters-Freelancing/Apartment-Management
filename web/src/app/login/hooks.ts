import { FormikHelpers } from "formik";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EPathName } from "../../utils/enums";
import { useSnackbar } from "../../hooks/useSnackbar";

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

		await axios.post("http://localhost:3031/api/login", values);

		setSubmitting(false);
		resetForm();

		setSnackbarProps({
			open: true,
			message: "Logged in successfully!",
		});
		push(EPathName.DASHBOARD);
	};

	return {
		handleSubmit,
	};
};
