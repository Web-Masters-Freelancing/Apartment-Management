import { useCallback, useState } from "react";
import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import { Column } from "@/components/Table";
import {
  FindAllBillableResponseDto,
  ProcessPaymentDto,
  FindAllPaymentsForFindAllBillableResponseDto,
} from "@/store/api/gen/billable";
import { ActionButtonProps, TableActions } from "@/components/Table";
import { useBillableApi } from "@/hooks/api/billable";
import { InputFieldProps, Field } from "@/components/hooks/useModal";
import { useSnackbar } from "@/hooks/useSnackbar";
import moment from "moment";
import { Payments } from "@/store/api/gen/category";
import { CustomDatePickerProps } from "@/components/DatePicker";

export interface BillableValues extends FindAllBillableResponseDto {
  userId: number;
  roomId: number;
  paidOn: string;
}

export interface TableCellValues
  extends FindAllBillableResponseDto,
    TableActions {}

interface ModalFormValues {
  amount: number;
  amountDue?: number;
  advancePayment?: number;
  paidOn: string;
}

export const useHook = () => {
  const initialFormValues: ModalFormValues = {
    amount: 0,
    amountDue: 0,
    advancePayment: 0,
    paidOn: "",
  };

  const [initialValues, setInitialValues] =
    useState<ModalFormValues>(initialFormValues);

  const [openModal, setOpenDialog] = useState(false);
  const [openPaymentListModal, setOpenPaymentListModal] = useState(false);

  const [payeeData, setPayeeData] = useState<
    (ProcessPaymentDto & Pick<Payments, "advancePayment">) | undefined
  >();
  const [listOfPayments, setListOfPayments] = useState<
    FindAllPaymentsForFindAllBillableResponseDto[]
  >([]);

  const { setSnackbarProps } = useSnackbar();

  const {
    billables: dataSource,
    isFetching,
    processPayment,
  } = useBillableApi();

  const handleSearch = (values: SearchKey, _: FormikHelpers<SearchKey>) => {
    console.log("values", values);
  };

  const paymentListColumns: Column<FindAllPaymentsForFindAllBillableResponseDto>[] =
    [
      {
        key: "paidOn",
        label: "Date paid",
        format: (value) => moment(value).format("MM/DD/YYYY"),
      },
      {
        key: "advancePayment",
        label: "Advance payment",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        key: "balance",
        label: "Balance",
        format: (value) => value.toLocaleString("en-US"),
      },
      {
        key: "amountPaid",
        label: "Amount paid",
        format: (value) => value.toLocaleString("en-US"),
      },
    ];

  const columns: Column<TableCellValues>[] = [
    {
      key: "userName",
      label: "Names",
    },
    {
      key: "roomPrice", // Room price
      label: "Room Price",
      format: (value: number) => value.toLocaleString("en-US"),
    },

    {
      key: "deposit",
      label: "Deposit",
    },

    {
      key: "startDate",
      label: "start date",
      format: (value) => moment(value).format("MM/DD/YYYY"),
    },
    {
      key: "dueDate",
      label: "due date",
      format: (value) => moment(value).format("MM/DD/YYYY"),
    },
    {
      key: "amountDue",
      label: "amount due",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      key: "status",
      label: "status",
    },
    {
      key: "cellActions",
      label: "actions",
    },
  ];

  const fields: Field<InputFieldProps | CustomDatePickerProps>[] = [
    {
      fieldType: "text",
      fieldProps: {
        placeholder: "",
        label: "Advance payment",
        name: "advancePayment",
        id: "advancePayment",
        type: "number",
        margin: "dense",
        disabled: true,
      },
    },
    {
      fieldType: "text",
      fieldProps: {
        placeholder: "Amount due",
        label: "Amount due",
        name: "amountDue",
        id: "amountdue",
        type: "number",
        margin: "dense",
        disabled: true,
      },
    },

    {
      fieldType: "text",
      fieldProps: {
        placeholder: "Enter amount",
        label: "Amount",
        name: "amount",
        id: "amount",
        type: "number",
        margin: "dense",
      },
    },

    {
      fieldType: "date",
      fieldProps: <CustomDatePickerProps>{
        label: "Select date",
        name: "paidOn",
      },
    },
  ];

  const handlePayment = useCallback(
    async (
      {
        amount: amountString,
        amountDue,
        advancePayment: advanced,
        paidOn,
      }: { amount: number } & BillableValues,
      { setSubmitting }: FormikHelpers<BillableValues>
    ) => {
      if (payeeData) {
        try {
          const amount = parseFloat(amountString.toString());

          let advancePayment = 0;
          let balance = 0;
          if (amount > amountDue) {
            advancePayment = amount - amountDue + advanced;
          }
          if (amount < amountDue) {
            balance = amountDue - amount;
          }

          setSubmitting(true);
          await processPayment({
            id: payeeData.id,
            amount,
            advancePayment,
            balance,
            paidOn,
          });

          setSnackbarProps({
            open: true,
            message: "Payment is successfully processed.",
            severity: "success",
          });

          setInitialValues(initialFormValues);
          setOpenDialog((state) => !state);
          setSubmitting(false);
        } catch (e: any) {
          console.error(e);

          setSnackbarProps({
            open: true,
            message:
              e.message || "Something went wrong, please try again later.",
            severity: "error",
          });

          setInitialValues(initialFormValues);
          setOpenDialog((state) => !state);
          setSubmitting(false);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payeeData]
  );

  const isBillableValues = (values: object): values is BillableValues => {
    return "id" in values;
  };

  const handleToggleModal = (values?: BillableValues) => {
    if (values) {
      if (isBillableValues(values)) {
        const { id, amountDue, advancePayment, paidOn } = values;

        setPayeeData({
          id,
          amount: amountDue, // amountDue is the Balance amount
          advancePayment,
          balance: 0,
          paidOn,
        });

        setInitialValues({
          ...initialFormValues,
          amountDue: amountDue,
          advancePayment,
        });
      } else {
        setInitialValues(initialFormValues);
      }
    }

    setOpenDialog((state) => !state);
  };

  const handleTogglePaymentsModal = (values?: BillableValues) => {
    if (values) {
      if (isBillableValues(values)) {
        setListOfPayments(values.payments);
      }
    }

    setOpenPaymentListModal((state) => !state);
  };

  const tableCellActions: ActionButtonProps<BillableValues>[] = [
    {
      name: "Process payment",
      variant: "contained",
      handleClick: handleToggleModal,
    },
    {
      name: "Show payments",
      variant: "contained",
      handleClick: handleTogglePaymentsModal,
    },
  ];

  return {
    handleSearch,
    columns,
    dataSource,
    tableCellActions,
    isFetching,
    handleToggleModal,
    open: openModal,
    handlePayment,
    fields,
    initialValues,
    paymentListColumns,
    listOfPayments,
    handleTogglePaymentsModal,
    openPaymentListModal,
  };
};
