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
    billableControllerFindAllPayments: build.query<
      BillableControllerFindAllPaymentsResponse,
      BillableControllerFindAllPaymentsArgs
    >({
      query: () => ({ url: `/api/billable/payments` }),
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
export type BillableControllerFindAllPaymentsResponse =
  /** status 200  */ FindAllPaymentsDto[];
export type BillableControllerFindAllPaymentsArgs = void;
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
  amountToPay: number;
};
export type ProcessPaymentDto = {
  id: number;
  amount: number;
};
export type FindAllPaymentsDto = {
  id: number;
  dueDate: string;
  roomNumber: number;
  description: string;
  userName: string;
  contact: string;
  address: string;
  categoryName: string;
  amountToPay: number;
  amountPaid: number;
  balance: number;
  advance: number;
  payments: FindAllPaymentsForFindAllBillableResponseDto[];
};
export const {
  useBillableControllerFindAllQuery,
  useBillableControllerProcessPaymentMutation,
  useBillableControllerFindAllPaymentsQuery,
} = injectedRtkApi;
