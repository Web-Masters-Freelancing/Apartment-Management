import * as yup from "yup";

/**
 * Login Schema
 */
export const LoginSchema = yup.object().shape({
	username: yup.string().required("Required"),
	password: yup.string().required("Required"),
});
