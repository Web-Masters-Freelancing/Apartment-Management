import { usePathname, useRouter } from "next/navigation";

import { removeToken } from "@/lib/tokenStorage";

/**
 * Logout function that can be called to trigger logout of a user
 */
export type LogoutUserFn = () => void;

export const LogoutUser: LogoutUserFn = () => {
  removeToken();

  const pathName = usePathname();
  const router = useRouter();

  if (!pathName.includes("/login")) {
    router.push("/login");
  }
};
