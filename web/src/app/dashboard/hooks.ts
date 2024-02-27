import { useRoomApi } from "@/hooks/api/room";
import { ChartDataset } from "chart.js";
import { useEffect, useState } from "react";
import { ERoomType } from "../rooms/hooks";
import { useUserApi } from "@/hooks/api/user";
import moment from "moment";

const roomTypes = Object.values(ERoomType);
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

  useEffect(() => {
    if (availableRooms && availableRooms.length) {
      const availableRoomsLength: number[] = [];

      roomTypes.forEach((type) => {
        const rooms = availableRooms.filter((value) => value.type === type);
        availableRoomsLength.push(rooms.length);
      });

      setAvailableRoomsDataSets([{ data: availableRoomsLength }]);
    }

    setLabels(roomTypes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableRooms]);

  useEffect(() => {
    if (users && users.length) {
      const occupiedUsers: number[] = [];
      const amountReceivables: number[] = [];

      roomTypes.forEach((type) => {
        /**
         * Occupied Users per type rooms
         */
        const occupiedUser = users.filter((value) => value.type === type);

        occupiedUsers.push(occupiedUser.length);

        /**
         * Predicted Monthly amount receivables per rooms
         */
        const amountReceivable = users
          .filter((value) => value.type === type)
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
  }, [users]);

  return {
    labels,
    availableRoomsDatasets,
    availableRooms,
    occupiedUsersDatasets,
    billablesCardTitle,
    monthlyReceivables,
    users,
    totalBillables,
  };
};
