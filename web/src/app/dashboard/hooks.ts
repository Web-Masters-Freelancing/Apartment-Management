import { useRoomApi } from "@/hooks/api/room";
import { ChartDataset } from "chart.js";
import { useEffect, useState } from "react";
import { ERoomType } from "../rooms/hooks";
import { useUserApi } from "@/hooks/api/user";

const roomTypes = Object.values(ERoomType);

export const useHook = () => {
  const [availableRoomsDatasets, setAvailableRoomsDataSets] = useState<
    ChartDataset[]
  >([]);
  const [] = useState<ChartDataset[]>([]);

  const [labels, setLabels] = useState<string[]>([]);

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
      roomTypes.forEach((type) => {
        // users.filter((value) => value)
      });
    }
  }, [users]);

  return { labels, availableRoomsDatasets, availableRooms };
};
