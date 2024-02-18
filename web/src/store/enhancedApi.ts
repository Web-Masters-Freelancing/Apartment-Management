import { enhancedApi as roomApi } from "./api/gen/room";
import { enhancedApi as userApi } from "./api/gen/user";

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
  },
});

const enhancedUserApi = userApi.enhanceEndpoints({
  addTagTypes: ["users"],
  endpoints: {
    userControllerCreate: {
      invalidatesTags: ["users"],
    },
  },
});

export { enhancedRoomApi as roomApi, enhancedUserApi as userApi };
