import { User } from "@/store/api/gen/category";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

export const tokenKey = "token" as const;

/**
 * get token from local storage.
 */
export function getToken() {
  return getCookie(tokenKey);
}

export function decodeToken() {
  const token = getToken();

  if (token) {
    return jwtDecode(token);
  }
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

const userKey = "user";
export function setLocalStorage(value: User): void {
  localStorage.setItem(userKey, JSON.stringify(value));
}

export function getLocalStorage() {
  const user = localStorage.getItem(userKey);

  const data = user ? (JSON.parse(user) as User) : ({} as User);
  return data;
}
