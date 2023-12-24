import * as yup from "yup";

/**
 * This field is required.
 */
export const LoginSchema = yup.object().shape({
	username: yup.string().required("Required"),
	password: yup.string().required("Required"),
});
