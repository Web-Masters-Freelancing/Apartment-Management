import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    appControllerGetHello: build.query<
      AppControllerGetHelloResponse,
      AppControllerGetHelloArgs
    >({
      query: () => ({ url: `/api` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type AppControllerGetHelloResponse = unknown;
export type AppControllerGetHelloArgs = void;
export const { useAppControllerGetHelloQuery } = injectedRtkApi;
