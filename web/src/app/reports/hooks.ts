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
      key: "amountDue",
      label: "amount due",
    },

    {
      key: "dueDate",
      label: "DUE DATE",
      format: (value) => moment(value).format("MM/DD/YYYY"),
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
        amountDue,
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
            {
              text: `Due Date: ${moment(dueDate).format("YYYY-MM-DD")}`,
              style: styles["HEADERLEFT"],
            },
          ],
        ],
        columnGap: 10,
      };

      const tableColumns: string[] = [
        "Paid on",
        "Category",
        "Description",
        "Advance payment",
        "Balance",
        "Amount paid",
      ];

      let totalAmountPaid: number = 0;

      const tableRows = payments.map((value) => {
        totalAmountPaid += value.amountPaid;
        return [
          moment(value.paidOn).format("l"),
          categoryName,
          description,
          value.advancePayment ?? 0,
          value.balance ?? 0,
          value.amountPaid,
        ];
      });

      const totalRows = ["Total", "", "", "", "", totalAmountPaid].map(
        (value, key): TableCell => {
          return !key
            ? {
                text: value,
                colSpan: 6,
                style: { alignment: "right", fontSize: 10, bold: true },
                border: [false, false, false, false],
              }
            : {
                text:
                  value && typeof value === "number"
                    ? formatNumber(value)
                    : value,
                border: [false, false, false, false],
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
