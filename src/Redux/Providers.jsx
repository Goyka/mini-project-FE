"use client";

import store from "./configStore";
import { Provider } from "react-redux";

export const Providers = ({ children }) => {
  return <Provider store={store}> {children}</Provider>;
};
