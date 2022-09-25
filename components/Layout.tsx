import classNames from "classnames";
import { ReactNode } from "react";
import { Header } from "./Header";

type LayoutProps = {
  children?: ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <div className={classNames("container", "mx-auto", "pt-16")}>
      <Header />
      {props.children}
    </div>
  );
};
