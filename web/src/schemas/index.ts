import { IRoomsFormValues } from "@/app/rooms/hooks";
import * as yup from "yup";
import { ObjectShape } from "yup";

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

export const CustomValidationSchema = <T extends IRoomsFormValues>(
	objects: T
) => {
	const formArray: any[] = [];

	Object.values(objects).map((value, index) => {
		const keys = Object.keys(objects);

		formArray.push({
			[keys[index]]:
				value && typeof value === "number"
					? yup.number().required("This field is required")
					: yup.string().required("This field is required"),
		});
	}) as any;

	let formBuilder =
			{} /*** <-- initialize formbuilder to get the form object from yup schema  */,
		temp =
			formArray[0]; /** <--- initialize and assign the index[0] of form array to merge the other object to make as one  */

	formArray.map((form, index) => {
		if (index > 0) {
			formBuilder = { ...temp, ...form };

			temp = formBuilder;
		}
	});

	return {
		formGroup: yup.object().shape({
			...formBuilder,
		}),
	};
};
