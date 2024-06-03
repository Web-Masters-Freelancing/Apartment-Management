import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useField } from "formik";
import { ErrorWrapper } from "./Input";
import { useState } from "react";

export type OptionSelect = {
  value?: string | number;
  key?: string | number;
};

interface SelectChangeEvent {
  propertyName: string;
  value: any;
}

export interface SelectFieldProps extends SelectProps {
  options?: OptionSelect[];
  inputLabelId: string;
  handleChange?: (value: any) => void;
  handleSelectChange?: (value: any) => SelectChangeEvent;
}

const CustomSelect = ({
  options,
  inputLabelId,
  handleChange,
  onChange,
  value,
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
      <Select
        {...props}
        {...field}
        value={value}
        onChange={(e) => {
          if (handleChange) {
            handleChange(e.target.value);
          }
        }}
      >
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
