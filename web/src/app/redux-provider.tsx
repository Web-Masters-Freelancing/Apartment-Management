"use client";

import { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import { store } from "@/store/store";

export const ReduxProvider = ({ children }: PropsWithChildren<any>) => {
  return <Provider store={store}>{children}</Provider>;
};
