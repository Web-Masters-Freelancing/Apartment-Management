import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import { ActionButtonProps, Column, HeaderActions } from "@/components/Table";
import moment from "moment";
import { FindAllPaymentsDto } from "@/store/api/gen/billable";
import { CustomDateRangePickerProps } from "@/components/DateRange";
import { openPdfMake } from "@/lib/pdfMake";
import { useBillableApi } from "@/hooks/api/billable";
import { useMemo } from "react";

export const useHooks = () => {
  const { payments, isFetchingPayments } = useBillableApi();

  const handleSearch = (values: SearchKey, _: FormikHelpers<SearchKey>) => {};

  const handlePDF = () => {
    const tableColumns = columns.map((value) => value.label);

    if (payments && payments.length) {
      const totalAmount: Pick<
        FindAllPaymentsDto,
        "advance" | "amountPaid" | "balance"
      > = {
        advance: 0,
        amountPaid: 0,
        balance: 0,
      };
      const tableRows = payments.map((value) => {
        totalAmount.advance += value.advance;
        totalAmount.amountPaid += value.amountPaid;
        totalAmount.balance += value.balance;

        return [
          value.userName,
          value.categoryName,
          value.description,
          value.roomNumber,
          value.balance,
          value.advance,
          value.amountPaid,
          value.balance,
          moment(value.dueDate).format("DD/MM/YYYY"),
        ];
      });

      const { advance, amountPaid, balance } = totalAmount;
      const totalRows = [
        "TOTAL",
        "",
        "",
        "",
        "",
        advance,
        amountPaid,
        balance,
        "",
      ];
      openPdfMake({ tableColumns, tableRows, totalRows });
    }
  };

  const dataSource: FindAllPaymentsDto[] = useMemo(
    () => (payments?.length ? payments : []),
    [payments]
  );

  const columns: Column<FindAllPaymentsDto>[] = [
    {
      key: "userName",
      label: "TENANT",
    },
    {
      key: "categoryName",
      label: "CATEGORY",
    },
    {
      key: "description",
      label: "DESCRIPTION",
    },
    {
      key: "roomNumber",
      label: "ROOM NUMBER",
    },
    {
      key: "amountToPay",
      label: "AMOUNT TO PAY / MONTH",
      format: (value: number) => value.toLocaleString("en-US"),
    },

    {
      key: "advance",
      label: "ADVANCE",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      key: "amountPaid",
      label: "AMOUNT PAID",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      key: "balance",
      label: "BALANCE",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      key: "dueDate",
      label: "DUE DATE",
      format: (value) => moment(value).format("DD/MM/YYYY"),
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
        handleClick: handlePDF,
      },
    },
  ];

  return {
    handleSearch,
    columns,
    dataSource,
    tableHeaderActions,
    isFetchingPayments,
  };
};
