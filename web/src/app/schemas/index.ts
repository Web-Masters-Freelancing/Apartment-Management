import * as yup from "yup";

/**
 * Login Schema
 */
export const LoginSchema = yup.object().shape({
	username: yup.string().required("This field is required"),
	password: yup.string().required("This field is required"),
});
