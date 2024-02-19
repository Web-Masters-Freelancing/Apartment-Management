import { userApi } from "@/store/enhancedApi";
import { CreateUserDto } from "@/store/api/gen/user";

export const useUserApi = () => {
  const [create] = userApi.useUserControllerCreateMutation();

  const {
    isFetching: isFetchingUsers,
    isError: isUsersError,
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

  return { handleCreateUser, isFetchingUsers, isUsersError, users };
};
