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
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type UserControllerCreateResponse = unknown;
export type UserControllerCreateArgs = {
  createUserDto: CreateUserDto;
};
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
export const { useUserControllerCreateMutation } = injectedRtkApi;
