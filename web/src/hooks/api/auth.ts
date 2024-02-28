import { ResetPasswordDto } from "@/store/api/gen/auth";
import { authApi } from "@/store/enhancedApi";
import { handleErrors } from "@/utils/error";

export const useAuthApi = () => {
  const [resetPassword] = authApi.useAppControllerResetPasswordMutation();

  const handleResetPassword = async (
    token: string,
    payload: ResetPasswordDto
  ) => {
    try {
      const response = await resetPassword({
        resetPasswordDto: payload,
        token,
      });

      handleErrors(response);
    } catch (err) {
      throw err;
    }
  };

  return { handleResetPassword };
};
