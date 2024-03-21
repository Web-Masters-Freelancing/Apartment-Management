import { useState } from "react";
import { ActionButtonProps, HeaderActions } from "../Table";
import { CustomDateRangePickerProps } from "../DateRange";

export const useHook = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  const isButton = (
    component: HeaderActions<
      ActionButtonProps<any> | CustomDateRangePickerProps
    >
  ): component is HeaderActions<ActionButtonProps<any>> =>
    component.actionType === "button";

  const isDateRange = (
    component: HeaderActions<
      ActionButtonProps<any> | CustomDateRangePickerProps
    >
  ): component is HeaderActions<CustomDateRangePickerProps> =>
    component.actionType === "dateRange";

  return {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    isButton,
    isDateRange,
  };
};
