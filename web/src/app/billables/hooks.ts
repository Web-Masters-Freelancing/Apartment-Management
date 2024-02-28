import { FormikHelpers } from "formik";
import { SearchKey } from "../rooms/hooks";
import { Column } from "@/components/Table";
import { FindAllBillableResponseDto } from "@/store/api/gen/billable";

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

export const useHook = () => {
  const handleSearch = (values: SearchKey, _: FormikHelpers<SearchKey>) => {
    console.log("values", values);
  };

  const columns: Column<FindAllBillableResponseDto>[] = [
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
  ];

  const dataSource: FindAllBillableResponseDto[] = [
    {
      userName: "sime aga",
      amount: 1000,
      dueDate: new Date().toString(),
      status: "ACTIVE",
    },
  ];

  return { handleSearch, columns, dataSource };
};
