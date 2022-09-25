import classNames from "classnames";
import { ReactNode } from "react";

type ButtonLinkProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  dark?: boolean;
};

export const ButtonLink = (props: ButtonLinkProps) => {
  return (
    <a
      href={props.href}
      onClick={props.onClick}
      className={classNames(
        props.dark ? "bg-black text-white hover:text-black" : "bg-gray-200",
        "hover:bg-cc",
        "mb-2",
        "mr-2",
        "py-1",
        "px-2",
        "inline-block"
      )}
    >
      {props.children}
    </a>
  );
};
