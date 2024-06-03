import { getLocalStorage, removeToken } from "@/lib/tokenStorage";
import { Routes } from "@/utils/enums";
import { useRouter } from "next/navigation";
export const useHook = () => {
  const router = useRouter();

  const { name, role } = getLocalStorage();

  const logOutUser = () => {
    removeToken();
    router.push(`/${Routes.Public.LOGIN}`);
  };

  return { logOutUser, name, role };
};
