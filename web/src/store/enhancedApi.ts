import { enhancedApi as roomApi } from "./api/gen/room";
import { enhancedApi as userApi } from "./api/gen/user";
import { enhancedApi as billableApi } from "./api/gen/billable";
import { enhancedApi as authApi } from "./api/gen/auth";
import { enhancedApi as categoryApi } from "./api/gen/category";

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
      invalidatesTags: ["rooms", "available-rooms"],
    },
  },
});

const enhancedUserApi = userApi.enhanceEndpoints({
  addTagTypes: ["users", "billables", "rooms", "available-rooms"],
  endpoints: {
    userControllerCreate: {
      invalidatesTags: ["users", "billables", "rooms", "available-rooms"],
    },
    userControllerFindAll: {
      providesTags: ["users"],
    },
    userControllerEdit: {
      invalidatesTags: ["users", "rooms", "available-rooms"],
    },
    userControllerRemove: {
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
    billableControllerProcessPayment: {
      invalidatesTags: ["billables"],
    },
    billableControllerFindAllPayments: {
      providesTags: ["billables"],
    },
  },
});

const enchancedAuthApi = authApi.enhanceEndpoints({
  addTagTypes: ["auth"],
  endpoints: {
    appControllerResetPassword: {
      invalidatesTags: ["auth"],
    },
  },
});

const enchancedCategoryApi = categoryApi.enhanceEndpoints({
  addTagTypes: ["category", "rooms", "available-rooms"],
  endpoints: {
    categoryControllerCreate: {
      invalidatesTags: ["category", "rooms", "available-rooms"],
    },
    categoryControllerFindAll: {
      providesTags: ["category"],
    },

    categoryControllerEdit: {
      invalidatesTags: ["category", "rooms", "available-rooms"],
    },
    categoryControllerDeleteCategory: {
      invalidatesTags: ["category"],
    },
  },
});

export {
  enhancedRoomApi as roomApi,
  enhancedUserApi as userApi,
  enhancedBillableApi as billableApi,
  enchancedAuthApi as authApi,
  enchancedCategoryApi as categoryApi,
};
