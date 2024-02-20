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
    userControllerGetUsers: build.query<
      UserControllerGetUsersResponse,
      UserControllerGetUsersArgs
    >({
      query: () => ({ url: `/api/user/all` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type UserControllerCreateResponse = unknown;
export type UserControllerCreateArgs = {
  createUserDto: CreateUserDto;
};
export type UserControllerGetUsersResponse =
  /** status 200  */ FindAllUsersResponseDto[];
export type UserControllerGetUsersArgs = void;
export type UserRole = "ADMIN" | "TENANT";
export type CreateUserDto = {
  name: string;
  contact: string;
  address: string;
  role: UserRole;
  email?: string;
  password?: string;
  roomId?: number;
};
export type FindAllUsersResponseDto = {
  id: number;
  name: string;
  contact: string;
  address: string;
  role: UserRole;
};
export const {
  useUserControllerCreateMutation,
  useUserControllerGetUsersQuery,
} = injectedRtkApi;
