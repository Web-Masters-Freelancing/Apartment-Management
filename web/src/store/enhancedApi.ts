import { enhancedApi as roomApi } from "./api/gen/room";

const enhancedRoomApi = roomApi.enhanceEndpoints({
  addTagTypes: ["rooms", "available-rooms"],
  endpoints: {
    roomControllerCreate: {
      invalidatesTags: ["rooms"],
    },
    roomControllerGetRooms: {
      providesTags: ["rooms"],
    },
    roomControllerGetAvailableRooms: {
      providesTags: ["available-rooms"],
    },
    roomControllerEdit: {
      invalidatesTags: ["rooms"],
    },
    roomControllerDeleteRoom: {
      invalidatesTags: ["rooms"],
    },
  },
});

export { enhancedRoomApi as roomApi };
