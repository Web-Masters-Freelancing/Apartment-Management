import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    appControllerLogin: build.mutation<
      AppControllerLoginResponse,
      AppControllerLoginArgs
    >({
      query: () => ({ url: `/api/login`, method: "POST" }),
    }),
    appControllerResetPassword: build.mutation<
      AppControllerResetPasswordResponse,
      AppControllerResetPasswordArgs
    >({
      query: (queryArg) => ({
        url: `/api/reset-password/${queryArg.token}`,
        method: "POST",
        body: queryArg.resetPasswordDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type AppControllerLoginResponse = unknown;
export type AppControllerLoginArgs = void;
export type AppControllerResetPasswordResponse = unknown;
export type AppControllerResetPasswordArgs = {
  token: string;
  resetPasswordDto: ResetPasswordDto;
};
export type ResetPasswordDto = {
  currentPassword: string;
  newPassword: string;
};
export const {
  useAppControllerLoginMutation,
  useAppControllerResetPasswordMutation,
} = injectedRtkApi;
