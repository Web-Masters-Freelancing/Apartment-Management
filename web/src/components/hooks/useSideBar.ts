import { Routes } from "@/utils/enums";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const useHook = () => {
  // Url Name
  const urlname = usePathname();
  // Path Name
  const pathname = urlname.replace("/", "").trim();
  const [collapse, setCollapse] = useState(true);

  const handleClick = () => setCollapse(!collapse);

  const { Protected, Public } = Routes;

  const settingsRoutes = (pathname: string) => {
    const routes = [Protected.SECURITY, Protected.CATEGORY];

    return routes.includes(pathname);
  };

  return { pathname, collapse, handleClick, settingsRoutes, ...Protected };
};
