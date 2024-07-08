import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useField } from "formik";
import { Box } from "@mui/material";
import { ErrorWrapper } from "./Input";

export interface CustomDatePickerProps extends DatePickerProps<Date> {}

const CustomDatePicker = ({ ...props }: CustomDatePickerProps) => {
  const [field, meta] = useField(props.name as string);

  return (
    <Box sx={{ marginY: 1 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} {...field}>
        <DatePicker sx={{ width: "100%" }} {...props} />
      </LocalizationProvider>
      {meta.touched && meta.error && <ErrorWrapper>*{meta.error}</ErrorWrapper>}
    </Box>
  );
};

export default CustomDatePicker;
