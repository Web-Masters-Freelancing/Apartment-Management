import { CustomValidationSchema } from "@/schemas";
import { ModalSchema } from "../Modal";
import { SelectProps, InputProps } from "@mui/material";

/**
 * This will determine what type of field is being passed
 */
export type FieldType = "text" | "select";

/**
 * Props for `input` field, this is extending the {@link InputProps} from `@mui/material`
 * @label input label
 * @variant input variant
 */
interface InputFieldProps extends InputProps {
	label?: string;
	variant?: "outlined";
}

type OptionSelect = {
	value?: string | number;
	key?: string;
};

/**
 * Props for `select` field, this is extending the {@link SelectProps} from `@mui/material`
 * @options options for the select field, see {@link OptionSelect}
 */
export interface SelectFieldProps extends SelectProps {
	options?: OptionSelect[];
}

export interface FieldProps<T extends InputFieldProps | SelectFieldProps> {
	fieldType: FieldType;
	fields: T;
}

export const useHooksModal = ({
	contentFields,
}: {
	contentFields: ModalSchema[];
}) => {
	// Assign Initial keys
	const initialKeys: any[] = [];

	// Content Fields
	if (contentFields && contentFields.length) {
		contentFields.forEach((value) => {
			const { name } = value;
			if (name && typeof name !== "undefined") {
				// Check the type if it is a number or string
				const initial_value = value.type === "number" ? 0 : "";

				initialKeys.push({ [name]: initial_value });
			}
		});
	}

	let initialValues: object = {} as object;
	let temp = initialKeys[0] as object;

	// Loop initialKeys
	initialKeys?.length &&
		initialKeys.map((obj, key) => {
			if (key > 0) {
				initialValues = {
					...temp,
					...obj,
				}; /** <--- concat the array of objects */
				temp = initialValues;
			}
		});

	// Create custom schema for yup form validation
	const { formGroup } = CustomValidationSchema<any>(initialValues);

	return { initialValues, formGroup };
};
