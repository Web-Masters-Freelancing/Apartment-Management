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
    roomControllerEdit: build.mutation<
      RoomControllerEditResponse,
      RoomControllerEditArgs
    >({
      query: (queryArg) => ({
        url: `/api/room/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createRoomDto,
      }),
    }),
    roomControllerGetAvailableRooms: build.query<
      RoomControllerGetAvailableRoomsResponse,
      RoomControllerGetAvailableRoomsArgs
    >({
      query: () => ({ url: `/api/room/available` }),
    }),
    roomControllerGetRooms: build.query<
      RoomControllerGetRoomsResponse,
      RoomControllerGetRoomsArgs
    >({
      query: () => ({ url: `/api/room/all` }),
    }),
    roomControllerDeleteRoom: build.mutation<
      RoomControllerDeleteRoomResponse,
      RoomControllerDeleteRoomArgs
    >({
      query: (queryArg) => ({
        url: `/api/room/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type RoomControllerCreateResponse = unknown;
export type RoomControllerCreateArgs = {
  createRoomDto: CreateRoomDto;
};
export type RoomControllerEditResponse = unknown;
export type RoomControllerEditArgs = {
  id: number;
  createRoomDto: CreateRoomDto;
};
export type RoomControllerGetAvailableRoomsResponse =
  /** status 200  */ AvailableRoomsResponseDto[];
export type RoomControllerGetAvailableRoomsArgs = void;
export type RoomControllerGetRoomsResponse =
  /** status 200  */ AllRoomsResponseDto[];
export type RoomControllerGetRoomsArgs = void;
export type RoomControllerDeleteRoomResponse = unknown;
export type RoomControllerDeleteRoomArgs = {
  id: number;
};
export type CreateRoomDto = {
  categoryId: number;
  amount: number;
  roomNumber: number;
};
export type AvailableRoomsResponseDto = {
  id: number;
  categoryId: number;
  amount: number;
  roomNumber: number;
  name: string;
  description: string;
};
export type RoomStatus = "AVAILABLE" | "NOT_AVAILABLE";
export type AllRoomsResponseDto = {
  id: number;
  categoryId: number;
  amount: number;
  status: RoomStatus;
  roomNumber: number;
};
export const {
  useRoomControllerCreateMutation,
  useRoomControllerEditMutation,
  useRoomControllerGetAvailableRoomsQuery,
  useRoomControllerGetRoomsQuery,
  useRoomControllerDeleteRoomMutation,
} = injectedRtkApi;
