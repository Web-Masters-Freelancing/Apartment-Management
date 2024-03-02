import { useCallback, useState } from "react";
import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import { Column } from "@/components/Table";
import { FindAllBillableResponseDto } from "@/store/api/gen/billable";
import { ActionButtonProps, TableActions } from "@/components/Table";
import { useBillableApi } from "@/hooks/api/billable";
import { InputFieldProps, Field } from "@/components/hooks/useModal";

enum EBillableStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface BillableValues {
  id: number;
  userId: number;
  roomId: number;
  dueDate: Date;
  amount: number;
  status: `${EBillableStatus}`;
}

interface TableCellValues extends FindAllBillableResponseDto, TableActions {}
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
  const [payeeData, setPayeeData] = useState<
    Pick<BillableValues, "id" | "amount"> | undefined
  >();

  const { billables: dataSource, isFetching } = useBillableApi();

  const handleSearch = (values: SearchKey, _: FormikHelpers<SearchKey>) => {
    console.log("values", values);
  };

  const columns: Column<TableCellValues>[] = [
    {
      key: "userName",
      label: "Names",
    },
    {
      key: "amount",
      label: "amount",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      key: "dueDate",
      label: "due date",
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

  const handlePayment = useCallback(() => {
    console.log(payeeData);
  }, [payeeData]);

  const isBillableValues = (values: object): values is BillableValues => {
    return "id" in values;
  };

  const handleToggleModal = (values?: BillableValues) => {
    if (values) {
      if (isBillableValues(values)) {
        const { id, amount } = values;
        setPayeeData({
          id,
          amount,
        });

        setInitialValues({
          ...initialFormValues,
          amountDue: amount,
        });
      } else {
        setInitialValues(initialFormValues);
      }
    }

    setOpenDialog((state) => !state);
  };

  const tableCellActions: ActionButtonProps<BillableValues>[] = [
    {
      name: "Process payment",
      variant: "contained",
      handleClick: handleToggleModal,
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
  };
};
