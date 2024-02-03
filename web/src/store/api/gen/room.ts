import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    roomControllerCreate: build.mutation<
      RoomControllerCreateResponse,
      RoomControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/room/create`,
        method: "POST",
        body: queryArg.createRoomDto,
      }),
    }),
    roomControllerGetAvailableRooms: build.query<
      RoomControllerGetAvailableRoomsResponse,
      RoomControllerGetAvailableRoomsArgs
    >({
      query: () => ({ url: `/api/room/available-rooms` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type RoomControllerCreateResponse = unknown;
export type RoomControllerCreateArgs = {
  createRoomDto: CreateRoomDto;
};
export type RoomControllerGetAvailableRoomsResponse =
  /** status 200  */ AvailableRoomsResponseDto[];
export type RoomControllerGetAvailableRoomsArgs = void;
export type CreateRoomDto = {
  type: string;
  description?: string;
  amount: number;
};
export type AvailableRoomsResponseDto = {
  id: number;
  type: string;
  description?: string;
  amount: number;
};
export const {
  useRoomControllerCreateMutation,
  useRoomControllerGetAvailableRoomsQuery,
} = injectedRtkApi;
