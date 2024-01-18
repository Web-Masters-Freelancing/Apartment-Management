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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type RoomControllerCreateResponse = unknown;
export type RoomControllerCreateArgs = {
  createRoomDto: CreateRoomDto;
};
export type CreateRoomDto = {
  type: string;
  description?: string;
  amount: number;
};
export const { useRoomControllerCreateMutation } = injectedRtkApi;
