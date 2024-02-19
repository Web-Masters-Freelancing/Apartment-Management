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
  useUserControllerFindAllQuery,
} = injectedRtkApi;
