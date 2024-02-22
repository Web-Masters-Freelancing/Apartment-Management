import { userApi } from "@/store/enhancedApi";
import { CreateUserDto } from "@/store/api/gen/user";

export const useUserApi = () => {
  const [create] = userApi.useUserControllerCreateMutation();
  const [edit] = userApi.useUserControllerEditMutation();

  const {
    isFetching: isFetchingUsers,
    isError: isErrorFetchingUsers,
    data: users,
  } = userApi.useUserControllerFindAllQuery();

  const handleCreateUser = async (payload: CreateUserDto) => {
    try {
      await create({
        createUserDto: payload,
      });
    } catch (e) {
      throw e;
    }
  };

  const handleEditUser = async (id: number, payload: CreateUserDto) => {
    try {
      await edit({
        id,
        createUserDto: payload,
      });
    } catch (e) {
      throw e;
    }
  };

  return {
    handleCreateUser,
    handleEditUser,
    isFetchingUsers,
    isErrorFetchingUsers,
    users,
  };
};
