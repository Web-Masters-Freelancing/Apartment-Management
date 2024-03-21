import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  LocalizationProvider,
  PickersInputComponentLocaleText,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export interface CustomDateRangePickerProps {
  localeText?: PickersInputComponentLocaleText<unknown> | undefined;
}
const CustomDateRangePicker = ({ localeText }: CustomDateRangePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker"]}>
        <DateRangePicker localeText={localeText} />
      </DemoContainer>
    </LocalizationProvider>
  );
};
export default CustomDateRangePicker;
