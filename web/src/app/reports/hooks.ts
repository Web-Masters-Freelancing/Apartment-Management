import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import { ActionButtonProps, Column, HeaderActions } from "@/components/Table";
import { TableCellValues } from "../billables/hooks";
import moment from "moment";
import { FindAllBillableResponseDto } from "@/store/api/gen/billable";
import { CustomDateRangePickerProps } from "@/components/DateRange";

export const useHooks = () => {
  const handleSearch = (values: SearchKey, _: FormikHelpers<SearchKey>) => {};

  const columns: Column<TableCellValues>[] = [
    {
      key: "userName",
      label: "Names",
    },
    {
      key: "amountToPay",
      label: "amount due",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      key: "amount",
      label: "balance",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      key: "dueDate",
      label: "due date",
      format: (value) => moment(value).format("DD/MM/YYYY"),
    },
    {
      key: "status",
      label: "status",
    },
  ];

  const tableHeaderActions: HeaderActions<
    ActionButtonProps<any> | CustomDateRangePickerProps
  >[] = [
    {
      actionType: "dateRange",
      actionProps: <CustomDateRangePickerProps>{
        localeText: { start: "Start date", end: "End date" },
      },
    },
    {
      actionType: "button",
      actionProps: <ActionButtonProps<any>>{
        name: "Filter by date",
        variant: "contained",
      },
    },
    {
      actionType: "button",
      actionProps: <ActionButtonProps<any>>{
        name: "Print",
        variant: "outlined",
      },
    },
  ];

  const dataSource: FindAllBillableResponseDto[] = [];
  return { handleSearch, columns, dataSource, tableHeaderActions };
};
