import { enhancedApi as roomApi } from "./api/gen/room";
import { enhancedApi as userApi } from "./api/gen/user";
import { enhancedApi as billableApi } from "./api/gen/billable";

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

const enhancedUserApi = userApi.enhanceEndpoints({
  addTagTypes: ["users", "billables"],
  endpoints: {
    userControllerCreate: {
      invalidatesTags: ["users", "billables"],
    },
    userControllerFindAll: {
      providesTags: ["users"],
    },
    userControllerEdit: {
      invalidatesTags: ["users"],
    },
  },
});

const enhancedBillableApi = billableApi.enhanceEndpoints({
  addTagTypes: ["billables"],
  endpoints: {
    billableControllerFindAll: {
      providesTags: ["billables"],
    },
  },
});

export {
  enhancedRoomApi as roomApi,
  enhancedUserApi as userApi,
  enhancedBillableApi as billableApi,
};
