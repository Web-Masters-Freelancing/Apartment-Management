import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { useField } from "formik";

export interface CustomDatePickerProps extends DatePickerProps<Date> {}

const CustomDatePicker = ({ ...props }: CustomDatePickerProps) => {
  const [field, meta] = useField(props.name as string);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker sx={{ width: "100%" }} {...props} />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
