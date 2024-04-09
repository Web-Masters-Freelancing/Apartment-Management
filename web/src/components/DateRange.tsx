import * as React from "react";
import {
  LocalizationProvider,
  PickersInputComponentLocaleText,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateRangePicker,
  DateRangePickerProps,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { FormikHelpers } from "formik";

export interface CustomDateRangePickerProps extends DateRangePickerProps<Date> {
  localeText?: PickersInputComponentLocaleText<unknown> | undefined;
  onSubmit?: (value: any, helpers: FormikHelpers<any>) => void;
}
const CustomDateRangePicker = ({
  name,
  localeText,
}: CustomDateRangePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker label={name} name={name} localeText={localeText} />
    </LocalizationProvider>
  );
};
export default CustomDateRangePicker;
