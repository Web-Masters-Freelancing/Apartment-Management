import { Routes } from "@/utils/enums";
import { usePathname } from "next/navigation";

export const useHook = () => {
	// Url Name
	const urlname = usePathname();
	// Path Name
	const pathname = urlname.replace("/", "").trim();

	const { Protected, Public } = Routes;

	return { pathname, ...Protected };
};
