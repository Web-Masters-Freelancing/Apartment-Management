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
	console.log("contentFields", contentFields);
};
