import classNames from "classnames";
import { LanguageOccurence as LanguageOccurenceType } from "../types";

type LanguageOccurenceProps = {
  languageOccurence: LanguageOccurenceType;
};

export const LanguageOccurence = (props: LanguageOccurenceProps) => {
  return (
    <span
      className={classNames(
        "text-xs",
        "font-bold",
        "inline-block",
        "bg-gray-200",
        "pl-2",
        "py-1",
        "mr-2",
        "mb-2",
        "rounded-full"
      )}
    >
      {props.languageOccurence.language}
      <span
        className={classNames("bg-cc", "py-1", "px-2", "ml-2", "rounded-full")}
      >
        {props.languageOccurence.occurence}
      </span>
    </span>
  );
};
