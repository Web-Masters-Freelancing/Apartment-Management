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

export interface BillableValues extends FindAllBillableResponseDto {
  userId: number;
  roomId: number;
}

export interface TableCellValues
  extends FindAllBillableResponseDto,
    TableActions {}

interface ModalFormValues {
  amount: number;
  amountDue?: number;
}

export const useHook = () => {
  const initialFormValues: ModalFormValues = {
    amount: 0,
    amountDue: 0,
  };

  const [initialValues, setInitialValues] =
    useState<ModalFormValues>(initialFormValues);

  const [openModal, setOpenDialog] = useState(false);
  const [openPaymentListModal, setOpenPaymentListModal] = useState(false);

  const [payeeData, setPayeeData] = useState<ProcessPaymentDto | undefined>();
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
        format: (value) => moment(value).format("DD/MM/YYYY hh:MM:ss"),
      },
      {
        key: "amount",
        label: "Amount",
        format: (value) => value.toLocaleString("en-US"),
      },
    ];

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
    {
      key: "cellActions",
      label: "actions",
    },
  ];

  const fields: Field<InputFieldProps>[] = [
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
  ];

  const handlePayment = useCallback(
    async (
      { amount }: BillableValues,
      { setSubmitting }: FormikHelpers<BillableValues>
    ) => {
      if (payeeData) {
        try {
          setSubmitting(true);
          await processPayment({
            id: payeeData.id,
            amount,
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
        const { id, amountToPay } = values;
        setPayeeData({
          id,
          amount: amountToPay,
        });

        setInitialValues({
          ...initialFormValues,
          amountDue: amountToPay,
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
