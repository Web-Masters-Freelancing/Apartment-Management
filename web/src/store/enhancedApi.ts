import { enhancedApi as roomApi } from "./api/gen/room";

const enhancedRoomApi = roomApi.enhanceEndpoints({
  addTagTypes: ["rooms"],
  endpoints: {
    roomControllerCreate: {
      invalidatesTags: ["rooms"],
    },
    roomControllerGetRooms: {
      providesTags: ["rooms"],
    },
  },
});

export { enhancedRoomApi as roomApi };
