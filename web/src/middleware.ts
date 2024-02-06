import { Routes } from "@/utils/enums";
import { NextRequest, NextResponse } from "next/server";
import { tokenKey } from "./lib/tokenStorage";

const protectedRoutes = Object.values(Routes.Protected).map(
	(value) => `/${value}`
);

const mainRoutes = ["/", `/${Routes.Public.LOGIN}`];

export default function middleware(req: NextRequest) {
	const isAuth = req.cookies.get(tokenKey);

	if (!isAuth?.name && protectedRoutes.includes(req.nextUrl.pathname)) {
		const url = new URL("/", req.nextUrl.origin);

		return NextResponse.redirect(url.toString());
	}

	if (isAuth?.name && mainRoutes.includes(req.nextUrl.pathname)) {
		const url = new URL(`/${Routes.Protected.DASHBOARD}`, req.nextUrl.origin);
		return NextResponse.redirect(url.toString());
	}
}
