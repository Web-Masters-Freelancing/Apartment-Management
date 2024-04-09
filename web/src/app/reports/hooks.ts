import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import {
  ActionButtonProps,
  Column,
  DateRangeValues,
  HeaderActions,
  TableActions,
} from "@/components/Table";
import moment from "moment";
import { FindAllPaymentsDto } from "@/store/api/gen/billable";
import { CustomDateRangePickerProps } from "@/components/DateRange";
import { formatNumber, openPdfMake, styles } from "@/lib/pdfMake";
import { useBillableApi } from "@/hooks/api/billable";
import { useMemo } from "react";
import { ContentColumns, TableCell } from "pdfmake/interfaces";

export const useHooks = () => {
  const { payments, isFetchingPayments } = useBillableApi();

  const handleSearch = (values: SearchKey, _: FormikHelpers<SearchKey>) => {};

  const handlePDF = () => {
    const tableColumns = columns
      .filter((value) => value.label !== "Action")
      .map((value) => value.label);

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
      ].map((value, index): TableCell => {
        const tableCell: TableCell = !index
          ? {
              text: value,
              colSpan: 5,
              style: { alignment: "right", fontSize: 10, bold: true },
            }
          : {
              text:
                value && typeof value === "number"
                  ? formatNumber(value)
                  : value,
            };
        return tableCell;
      });

      const documentHeader: ContentColumns = {
        columns: [
          [
            {
              text: "Whitehouse Apartment Management",
              style: { alignment: "left" },
            },
            {
              text: "Income Report",
              style: { alignment: "left" },
            },
          ],
        ],
        columnGap: 10,
      };
      openPdfMake({ documentHeader, tableColumns, tableRows, totalRows });
    }
  };

  const dataSource: FindAllPaymentsDto[] = useMemo(
    () => (payments?.length ? payments : []),
    [payments]
  );

  const columns: Column<FindAllPaymentsDto & TableActions>[] = [
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
    {
      key: "cellActions",
      label: "Action",
    },
  ];

  const handleTenantSoa = (payload: FindAllPaymentsDto | undefined) => {
    if (payload) {
      const {
        userName,
        contact,
        address,
        dueDate,
        categoryName,
        description,
        payments,
        amountToPay,
        balance,
      } = payload;
      const documentHeader: ContentColumns = {
        columns: [
          [
            {
              text: "STATEMENT OF ACCOUNT",
              style: { alignment: "center" },
            },
            {
              text: "Whitehouse Apartment Management",
              style: { alignment: "center" },
            },
            {
              text: "To:",
              style: { alignment: "left", bold: true },
            },
            {
              text: userName,
              style: styles["HEADERLEFT"],
            },
            {
              text: contact,
              style: styles["HEADERLEFT"],
            },
            {
              text: address,
              style: styles["HEADERLEFT"],
            },
          ],
        ],
        columnGap: 10,
      };

      const tableColumns: string[] = [
        "Issue Date",
        "Due Date",
        "Category",
        "Description",
        "Amount",
        "Payment",
        "Balance",
      ];

      let totalPayments: number = 0;

      const tableRows = payments.map((value) => {
        totalPayments += value.amount;
        return [
          moment(value.paidOn).format("l"),
          moment(dueDate).format("l"),
          categoryName,
          description,
          amountToPay,
          value.amount,
          balance,
        ];
      });

      const totalRows = ["Total", "", "", "", "", totalPayments, balance].map(
        (value, key): TableCell => {
          return !key
            ? {
                text: value,
                colSpan: 5,
                style: { alignment: "right", fontSize: 10, bold: true },
                border: [false, false, false, false],
              }
            : {
                text:
                  value && typeof value === "number"
                    ? formatNumber(value)
                    : value,
              };
        }
      );

      openPdfMake({ documentHeader, tableColumns, tableRows, totalRows });
    }
  };

  const handleFilterDate = (payload: any, helpers: FormikHelpers<any>) => {
    console.log("payload", payload);
  };

  const tableCellActions: ActionButtonProps<FindAllPaymentsDto>[] = [
    {
      name: "View SOA",
      variant: "outlined",
      handleClick: handleTenantSoa,
    },
  ];

  const tableHeaderActions: HeaderActions<
    ActionButtonProps<any> | CustomDateRangePickerProps
  >[] = [
    {
      actionType: "dateRange",
      actionProps: <CustomDateRangePickerProps>{
        localeText: { start: "Start date", end: "End date" },
        onSubmit: handleFilterDate,
        name: "dateRange",
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
    tableCellActions,
  };
};
