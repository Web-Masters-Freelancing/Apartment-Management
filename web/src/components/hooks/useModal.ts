import { InputProps } from "@mui/material";
import { SelectFieldProps } from "@/components/Select";

type FieldType = "text" | "select";

/**
 * Props for `input` field, this is extending the {@link InputProps} from `@mui/material`
 * @label input label
 * @variant input variant
 */
export interface InputFieldProps extends InputProps {
  label?: string;
  variant?: "outlined";
}

/**
 * Properties for field
 * @fieldType see {@link FieldType}
 * @fieldProps props for the field, see {@link InputFieldProps} | {@link SelectFieldProps}
 */
export interface Field<T extends InputFieldProps | SelectFieldProps> {
  fieldType: FieldType;
  fieldProps: T;
}

export const useHook = () => {
  const isInputField = (
    data: Field<InputFieldProps | SelectFieldProps>
  ): data is Field<InputFieldProps> => data.fieldType === "text";

  const isSelectField = (
    data: Field<InputFieldProps | SelectFieldProps>
  ): data is Field<SelectFieldProps> => data.fieldType === "select";

  return {
    isInputField,
    isSelectField,
  };
};
