import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useField } from "formik";
import { ErrorStyle } from "./Input";

export type OptionSelect = {
  value?: string | number;
  key?: string | number;
};

export interface SelectFieldProps extends SelectProps {
  options?: OptionSelect[];
  inputLabelId: string;
}

const CustomSelect = ({
  options,
  inputLabelId,
  ...props
}: SelectFieldProps) => {
  const [field, meta] = useField({ name: props.name! });

  return (
    <FormControl
      variant="outlined"
      sx={{ width: "100%" }}
      margin={props.margin}
    >
      <InputLabel id={inputLabelId}>{props.label}</InputLabel>
      <Select {...props} {...field}>
        <MenuItem key="" value="">
          <em>None</em>
        </MenuItem>
        {options?.length &&
          options.map((item) => {
            return (
              <MenuItem key={item.key} value={item.key}>
                {item.value}
              </MenuItem>
            );
          })}
      </Select>
      {meta.touched && meta.error && <ErrorStyle>*{meta.error}</ErrorStyle>}
    </FormControl>
  );
};

export default CustomSelect;
