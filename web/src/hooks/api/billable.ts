import { billableApi } from "@/store/enhancedApi";

export const useBillableApi = () => {
  const { isFetching, data: billables } =
    billableApi.useBillableControllerFindAllQuery();

  return {
    isFetching,
    billables,
  };
};
