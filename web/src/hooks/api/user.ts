import { userApi } from "@/store/enhancedApi";
import { CreateUserDto } from "@/store/api/gen/user";
import { handleErrors } from "@/utils/error";

export const useUserApi = () => {
  const [create] = userApi.useUserControllerCreateMutation();
  const [edit] = userApi.useUserControllerEditMutation();
  const [remove] = userApi.useUserControllerRemoveMutation();

  const {
    isFetching: isFetchingUsers,
    isError: isErrorFetchingUsers,
    data: users,
  } = userApi.useUserControllerFindAllQuery();

  const handleCreateUser = async (payload: CreateUserDto) => {
    try {
      const result: any = await create({
        createUserDto: payload,
      });

      handleErrors(result);
    } catch (e) {
      throw e;
    }
  };

  const handleEditUser = async (id: number, payload: CreateUserDto) => {
    try {
      const result: any = await edit({
        id,
        createUserDto: payload,
      });

      handleErrors(result);
    } catch (e) {
      throw e;
    }
  };

  const handleRemoveUser = async (id: number) => {
    try {
      const result: any = await remove({ id });

      handleErrors(result);
    } catch (e) {
      throw e;
    }
  };

  return {
    handleCreateUser,
    handleEditUser,
    handleRemoveUser,
    isFetchingUsers,
    isErrorFetchingUsers,
    users,
  };
};
