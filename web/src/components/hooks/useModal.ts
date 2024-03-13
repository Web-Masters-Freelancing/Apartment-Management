import { InputProps, TextareaAutosizeProps } from "@mui/material";
import { SelectFieldProps } from "@/components/Select";

type FieldType = "text" | "select" | "textarea";

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
export interface Field<
  T extends InputFieldProps | SelectFieldProps | TextareaAutosizeProps
> {
  fieldType: FieldType;
  fieldProps: T;
}

export const useHook = () => {
  const isInputField = (
    data: Field<InputFieldProps | SelectFieldProps | TextareaAutosizeProps>
  ): data is Field<InputFieldProps> => data.fieldType === "text";

  const isSelectField = (
    data: Field<InputFieldProps | SelectFieldProps | TextareaAutosizeProps>
  ): data is Field<SelectFieldProps> => data.fieldType === "select";

  const isTextAreaField = (
    data: Field<InputFieldProps | SelectFieldProps | TextareaAutosizeProps>
  ): data is Field<TextareaAutosizeProps> => data.fieldType === "textarea";

  return {
    isInputField,
    isSelectField,
    isTextAreaField,
  };
};
