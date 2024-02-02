import { roomApi } from "@/store/enhancedApi";
import { CreateRoomDto } from "../../store/api/gen/room";

/**
 * This hook is dedicated to calling room endpoints via RTK query
 * @returns methods to manage room
 */
export const useRoomApi = () => {
  const [create] = roomApi.useRoomControllerCreateMutation();

  const handleCreateRoom = async (payload: CreateRoomDto) => {
    try {
      await create({
        createRoomDto: payload,
      });
    } catch (e) {
      throw e;
    }
  };

  return {
    handleCreateRoom,
  };
};
