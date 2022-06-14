import React from "react";
import { Fragment } from "react";

export default function RootLayout({ children }) {
  return (
    <Fragment>
      <div className="w-full">{children}</div>
    </Fragment>
  );
}
