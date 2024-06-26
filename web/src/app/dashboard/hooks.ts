import { useRoomApi } from "@/hooks/api/room";
import { ChartDataset } from "chart.js";
import { useEffect, useState } from "react";
import { useUserApi } from "@/hooks/api/user";
import moment from "moment";
import { useCategoryApi } from "@/hooks/api/category";
import { getLocalStorage } from "@/lib/tokenStorage";
import { Payments, Room } from "@/store/api/gen/category";
import { FindAllPaymentsDto } from "@/store/api/gen/billable";
import { ActionButtonProps, Column, TableActions } from "@/components/Table";

const currentMonth = moment(new Date()).format("MMMM");

export const useHook = () => {
  const [availableRoomsDatasets, setAvailableRoomsDataSets] = useState<
    ChartDataset[]
  >([]);
  const [occupiedUsersDatasets, setOccupiedUsersDataSets] = useState<
    ChartDataset[]
  >([]);

  const [monthlyReceivables, setMonthlyReceivables] = useState<ChartDataset[]>(
    []
  );
  const [totalBillables, setTotalBillables] = useState(
    Number(0).toLocaleString("en-US")
  );

  const [labels, setLabels] = useState<string[]>([]);
  const [billablesCardTitle, setBillablesCardTitle] = useState<string>(
    `Month of ${currentMonth} Receivables`
  );
  const { availableRooms } = useRoomApi();
  const { users } = useUserApi();
  const { categories } = useCategoryApi();

  useEffect(() => {
    if (
      availableRooms &&
      availableRooms.length &&
      categories &&
      categories.length
    ) {
      const availableRoomsLength: number[] = [];

      categories.forEach((category) => {
        const rooms = availableRooms.filter(
          (value) => value.categoryId === category.id
        );
        availableRoomsLength.push(rooms.length);
      });

      setAvailableRoomsDataSets([{ data: availableRoomsLength }]);

      const categoryNames = categories.map((value) => value.name);
      setLabels(categoryNames);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableRooms, categories]);

  useEffect(() => {
    if (users && users.length && categories && categories.length) {
      const occupiedUsers: number[] = [];
      const amountReceivables: number[] = [];
      categories.forEach((category) => {
        /**
         * Occupied Users per type rooms
         */
        const occupiedUser = users.filter(
          (value) => value.categoryId === category.id
        );

        occupiedUsers.push(occupiedUser.length);

        /**
         * Predicted Monthly amount receivables per rooms
         */
        const amountReceivable = users
          .filter((value) => value.categoryId === category.id)
          .reduce((accumulator, currentValue) => {
            return accumulator + currentValue.amount;
          }, 0);

        amountReceivables.push(amountReceivable);
      });

      const allTotalBillables = users.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );

      setTotalBillables(allTotalBillables.toLocaleString("en-US"));
      setOccupiedUsersDataSets([{ data: occupiedUsers }]);
      setMonthlyReceivables([
        { label: "receivables", data: amountReceivables },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, categories]);

  const { role, billable } = getLocalStorage();

  const columns: Column<Payments>[] = [
    {
      key: "paidOn",
      label: "Paid on",
      format: (value) => moment(value).format("MM/DD/YYYY"),
    },
    {
      key: "advancePayment",
      label: "Advance payment",
    },
    {
      key: "balance",
      label: "Balance",
    },
    {
      key: "amountPaid",
      label: "Amount paid",
    },
  ];

  const dataSource = billable ? billable.payments : [];

  return {
    labels,
    availableRoomsDatasets,
    availableRooms,
    occupiedUsersDatasets,
    billablesCardTitle,
    monthlyReceivables,
    users,
    totalBillables,
    billable,
    role,
    columns,
    dataSource,
  };
};
