import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    billableControllerFindAll: build.query<
      BillableControllerFindAllResponse,
      BillableControllerFindAllArgs
    >({
      query: () => ({ url: `/api/billable` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type BillableControllerFindAllResponse =
  /** status 200  */ FindAllBillableResponseDto[];
export type BillableControllerFindAllArgs = void;
export type BillableStatus = "ACTIVE" | "INACTIVE";
export type FindAllBillableResponseDto = {
  dueDate: string;
  status: BillableStatus;
  userName: string;
  amount: number;
};
export const { useBillableControllerFindAllQuery } = injectedRtkApi;
