import classNames from "classnames";
import { ReactNode } from "react";

type MemberTableProps = {
  children: ReactNode;
};

export const MemberTable = (props: MemberTableProps) => {
  return (
    <table
      className={classNames(
        "w-full",
        "border",
        "border-gray-300",
        "rounded",
        "table-auto"
      )}
    >
      <thead className={classNames("bg-gray-200", "font-bold")}>
        <tr>
          <td>Member</td>
          <td>Languages</td>
        </tr>
      </thead>
      <tbody className={classNames("bg-gray-100")}>{props.children}</tbody>
    </table>
  );
};
