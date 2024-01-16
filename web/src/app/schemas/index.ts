import * as yup from "yup";

/**
 * Login Schema
 */
export const LoginSchema = yup.object().shape({
	username: yup.string().required("This field is required"),
	password: yup.string().required("This field is required"),
});

/**
 * type IRoomsFormValues = {
	id?: number;
	room: string;
	type: string;
	description?: string;
	amount: number;
};
 */
export const RoomSchema = yup.object().shape({
	room: yup.string().required("This field is required"),
	type: yup.string().required("This field is required"),
	description: yup.string().optional(),
	amount: yup.number().required("This field is required"),
});
