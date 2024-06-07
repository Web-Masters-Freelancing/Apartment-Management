import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    categoryControllerCreate: build.mutation<
      CategoryControllerCreateResponse,
      CategoryControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/category/create`,
        method: "POST",
        body: queryArg.createCategoryDto,
      }),
    }),
    categoryControllerFindAll: build.query<
      CategoryControllerFindAllResponse,
      CategoryControllerFindAllArgs
    >({
      query: () => ({ url: `/api/category` }),
    }),
    categoryControllerEdit: build.mutation<
      CategoryControllerEditResponse,
      CategoryControllerEditArgs
    >({
      query: (queryArg) => ({
        url: `/api/category/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createCategoryDto,
      }),
    }),
    categoryControllerDeleteCategory: build.mutation<
      CategoryControllerDeleteCategoryResponse,
      CategoryControllerDeleteCategoryArgs
    >({
      query: (queryArg) => ({
        url: `/api/category/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type CategoryControllerCreateResponse = unknown;
export type CategoryControllerCreateArgs = {
  createCategoryDto: CreateCategoryDto;
};
export type CategoryControllerFindAllResponse =
  /** status 200  */ FindAllCategoryResponseDto[];
export type CategoryControllerFindAllArgs = void;
export type CategoryControllerEditResponse = unknown;
export type CategoryControllerEditArgs = {
  id: number;
  createCategoryDto: CreateCategoryDto;
};
export type CategoryControllerDeleteCategoryResponse = unknown;
export type CategoryControllerDeleteCategoryArgs = {
  id: number;
};
export type CreateCategoryDto = {
  name: string;
  description: string;
};
export type RoomStatus = "AVAILABLE" | "NOT_AVAILABLE" | "OCCUPIED";
export type BillableStatus = "ACTIVE" | "INACTIVE";
export type UserRole = "ADMIN" | "TENANT";
export type Auth = {
  id: number;
  email: string;
  password: string;
  userId: number;
  token?: string;
  lastLoggedIn: string;
  user: User;
};
export type RoomHistory = {
  id: number;
  roomId: number;
  userId: number;
  occupiedOn: string;
  room: Room;
  user: User;
};
export type User = {
  id: number;
  name: string;
  contact: string;
  address: string;
  role: UserRole;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  auth?: Auth;
  billable?: Billable;
  roomhistory?: RoomHistory;
};
export type Payments = {
  id: number;
  billableId: number;
  paidOn: string;
  advancePayment: number;
  balance: number;
  amountPaid: number;
  billable: Billable;
};
export type Billable = {
  id: number;
  userId: number;
  roomId: number;
  dueDate: string;
  amountDue: number;
  status: BillableStatus;
  startDate: string;
  room: Room;
  user: User;
  payments: Payments[];
};
export type Category = {
  id: number;
  name: string;
  description: string;
  isArchived: boolean;
  Room: Room[];
};
export type Room = {
  id: number;
  categoryId: number;
  amount: number;
  status: RoomStatus;
  isArchived: boolean;
  roomNumber: number;
  billable: Billable[];
  roomhistory: RoomHistory[];
  category: Category;
};
export type FindAllCategoryResponseDto = {
  id: number;
  name: string;
  description: string;
  isArchived: boolean;
  Room: Room[];
};
export const {
  useCategoryControllerCreateMutation,
  useCategoryControllerFindAllQuery,
  useCategoryControllerEditMutation,
  useCategoryControllerDeleteCategoryMutation,
} = injectedRtkApi;
