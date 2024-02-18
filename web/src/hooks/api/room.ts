import { roomApi } from "@/store/enhancedApi";
import { CreateRoomDto } from "@/store/api/gen/room";

/**
 * This hook is dedicated to calling room endpoints via RTK query
 * @returns methods to manage room
 */
export const useRoomApi = () => {
  const [create] = roomApi.useRoomControllerCreateMutation();
  const [edit] = roomApi.useRoomControllerEditMutation();
  const [deleteRoom] = roomApi.useRoomControllerDeleteRoomMutation();
  const {
    isFetching: isFetchingRooms,
    data: rooms,
    isError,
  } = roomApi.useRoomControllerGetRoomsQuery();

  const {
    isFetching: isFetchingAvailableRooms,
    data: availableRooms,
    isError: isAvailableRoomsError,
  } = roomApi.useRoomControllerGetAvailableRoomsQuery();

  const handleCreateRoom = async (payload: CreateRoomDto) => {
    try {
      return await create({
        createRoomDto: payload,
      });
    } catch (e) {
      throw e;
    }
  };

  const handleEditRoom = async (id: number, payload: CreateRoomDto) => {
    try {
      return await edit({
        id,
        createRoomDto: payload,
      });
    } catch (e) {
      throw e;
    }
  };

  const handleDeleteRoom = async (id: number) => {
    try {
      return await deleteRoom({ id });
    } catch (e) {
      throw e;
    }
  };

  return {
    handleCreateRoom,
    handleEditRoom,
    isFetchingRooms,
    rooms,
    isError,
    isFetchingAvailableRooms,
    availableRooms,
    isAvailableRoomsError,
    handleDeleteRoom,
  };
};
