import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    userControllerCreate: build.mutation<
      UserControllerCreateResponse,
      UserControllerCreateArgs
    >({
      query: (queryArg) => ({
        url: `/api/user/create`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    userControllerFindAll: build.query<
      UserControllerFindAllResponse,
      UserControllerFindAllArgs
    >({
      query: () => ({ url: `/api/user` }),
    }),
    userControllerEdit: build.mutation<
      UserControllerEditResponse,
      UserControllerEditArgs
    >({
      query: (queryArg) => ({
        url: `/api/user/edit/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createUserDto,
      }),
    }),
    userControllerRemove: build.mutation<
      UserControllerRemoveResponse,
      UserControllerRemoveArgs
    >({
      query: (queryArg) => ({
        url: `/api/user/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type UserControllerCreateResponse = unknown;
export type UserControllerCreateArgs = {
  createUserDto: CreateUserDto;
};
export type UserControllerFindAllResponse =
  /** status 200  */ FindAllUsersResponseDto[];
export type UserControllerFindAllArgs = void;
export type UserControllerEditResponse = unknown;
export type UserControllerEditArgs = {
  id: number;
  createUserDto: CreateUserDto;
};
export type UserControllerRemoveResponse = unknown;
export type UserControllerRemoveArgs = {
  id: number;
};
export type UserRole = "ADMIN" | "TENANT";
export type CreateUserDto = {
  name: string;
  contact: string;
  address: string;
  role: UserRole;
  startDate?: string;
  email?: string;
  password?: string;
  roomId?: number;
  deposit: number;
  advancePayment: number;
};
export type FindAllUsersResponseDto = {
  id: number;
  name: string;
  contact: string;
  address: string;
  role: UserRole;
  startDate?: string;
  categoryId: number;
  roomId: number;
  roomNumber: number;
  amount: number;
  email: string;
  deposit: number;
  dueDate: string;
};
export const {
  useUserControllerCreateMutation,
  useUserControllerFindAllQuery,
  useUserControllerEditMutation,
  useUserControllerRemoveMutation,
} = injectedRtkApi;
