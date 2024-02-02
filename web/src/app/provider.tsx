"use client";

import { PropsWithChildren } from "react";
import Snackbar from "@/components/Snackbar";
import { ReduxProvider } from "./redux-provider";

export const Providers = ({ children }: PropsWithChildren<any>) => {
  return (
    <ReduxProvider>
      <Snackbar />
      {children}
    </ReduxProvider>
  );
};
