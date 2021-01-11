import React, { Fragment, ReactNode } from "react";
import HeaderBar from "./HeaderBar";

export default function Layout(children: { children: ReactNode }) {
  return (
    <div>
      <HeaderBar />
      <Fragment>{children}</Fragment>
    </div>
  );
}
