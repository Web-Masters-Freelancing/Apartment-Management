export const handleErrors = (result: any) => {
  if (result.error) {
    throw result.error.data;
  }
};
