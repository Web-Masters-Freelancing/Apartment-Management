import { baseApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    billableControllerFindAll: build.query<
      BillableControllerFindAllResponse,
      BillableControllerFindAllArgs
    >({
      query: () => ({ url: `/api/billable` }),
    }),
    billableControllerProcessPayment: build.mutation<
      BillableControllerProcessPaymentResponse,
      BillableControllerProcessPaymentArgs
    >({
      query: (queryArg) => ({
        url: `/api/billable/pay`,
        method: "POST",
        body: queryArg.processPaymentDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as enhancedApi };
export type BillableControllerFindAllResponse =
  /** status 200  */ FindAllBillableResponseDto[];
export type BillableControllerFindAllArgs = void;
export type BillableControllerProcessPaymentResponse = unknown;
export type BillableControllerProcessPaymentArgs = {
  processPaymentDto: ProcessPaymentDto;
};
export type BillableStatus = "ACTIVE" | "INACTIVE";
export type FindAllPaymentsForFindAllBillableResponseDto = {
  paidOn: string;
  amount: number;
};
export type FindAllBillableResponseDto = {
  id: number;
  dueDate: string;
  amount: number;
  status: BillableStatus;
  userName: string;
  payments: FindAllPaymentsForFindAllBillableResponseDto[];
};
export type ProcessPaymentDto = {
  id: number;
  amount: number;
};
export const {
  useBillableControllerFindAllQuery,
  useBillableControllerProcessPaymentMutation,
} = injectedRtkApi;
