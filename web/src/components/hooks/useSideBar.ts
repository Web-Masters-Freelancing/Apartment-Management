import { getLocalStorage } from "@/lib/tokenStorage";
import { Routes } from "@/utils/enums";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const useHook = () => {
  // Url Name
  const urlname = usePathname();
  // Path Name
  const pathname = urlname.replace("/", "").trim();

  const { Protected, Public } = Routes;
  const routes = [Protected.SECURITY, Protected.CATEGORY];

  const [collapse, setCollapse] = useState(false || routes.includes(pathname));

  const handleClick = () => setCollapse(!collapse);

  const settingsRoutes = (pathname: string) => {
    return routes.includes(pathname);
  };

  const { name, role } = getLocalStorage();

  return {
    pathname,
    collapse,
    handleClick,
    settingsRoutes,
    ...Protected,
    role,
  };
};
