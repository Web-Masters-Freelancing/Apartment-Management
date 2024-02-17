import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import styled from "@emotion/styled";
import { useField } from "formik";

export type OptionSelect = {
  value?: string | number;
  key?: string | number;
};

export interface SelectFieldProps extends SelectProps {
  options?: OptionSelect[];
  inputLabelId: string;
}

const ErrorWrapper = styled("div")({
  color: "#fc8181",
  fontSize: 10,
});

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
      {meta.touched && meta.error && <ErrorWrapper>*{meta.error}</ErrorWrapper>}
    </FormControl>
  );
};

export default CustomSelect;
