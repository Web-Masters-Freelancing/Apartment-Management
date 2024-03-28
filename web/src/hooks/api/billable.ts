import { billableApi } from "@/store/enhancedApi";
import { handleErrors } from "@/utils/error";
import { ProcessPaymentDto } from "@/store/api/gen/billable";

export const useBillableApi = () => {
  const { isFetching, data: billables } =
    billableApi.useBillableControllerFindAllQuery();

  const [pay] = billableApi.useBillableControllerProcessPaymentMutation();

  const { isFetching: isFetchingPayments, data: payments } =
    billableApi.useBillableControllerFindAllPaymentsQuery();

  const processPayment = async (payload: ProcessPaymentDto) => {
    try {
      const result: any = await pay({
        processPaymentDto: payload,
      });

      handleErrors(result);
    } catch (e) {
      handleErrors(e);
    }
  };

  return {
    isFetching,
    billables,
    processPayment,
    isFetchingPayments,
    payments,
  };
};
