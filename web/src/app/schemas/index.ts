import * as yup from "yup";

export const LoginSchema = yup.object().shape({
	username: yup.string().required("This field is required"),
	password: yup.string().required("This field is required"),
});

export const RoomSchema = yup.object().shape({
	room: yup.string().required("This field is required"),
	type: yup.string().required("This field is required"),
	description: yup.string().optional(),
	amount: yup.number().required("This field is required"),
});
