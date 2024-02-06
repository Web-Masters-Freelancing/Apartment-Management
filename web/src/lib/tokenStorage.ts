import { getCookie, deleteCookie, setCookie } from "cookies-next";

export const tokenKey = "token" as const;

/**
 * get token from local storage.
 */
export function getToken() {
	return getCookie(tokenKey);
}

/**
 * save token to local storage.
 */
export function setToken(token: string): void {
	setCookie(tokenKey, token);
}

/**
 * remove token from local storage.
 */
export function removeToken(): void {
	deleteCookie(tokenKey);
}
