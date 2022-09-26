import classNames from "classnames";
import { Member } from "../types";
import { getLanguageOccurence } from "../util/transforms";
import { LanguageOccurence } from "./LanguageOccurence";

type MemberTableRowProps = {
  member: Member;
};

export const MemberTableRow = (props: MemberTableRowProps) => {
  const languages = getLanguageOccurence(props.member.repositories);
  return (
    <tr>
      <td>
        {props.member.name && <b>{props.member.name}</b>}
        <div>
          <i className={classNames("lni", "lni-github-original", "mr-1")}></i>
          <a href={props.member.url} className={classNames("underline")}>
            {props.member.login}
          </a>
        </div>
        {props.member.email && (
          <div>
            <i className={classNames("lni", "lni-envelope", "mr-1")}></i>
            <a
              href={`mailto:${props.member.email}`}
              className={classNames("underline")}
            >
              {props.member.email}
            </a>
          </div>
        )}
      </td>
      <td>
        {languages.map((language, i) => (
          <LanguageOccurence key={i} languageOccurence={language} />
        ))}
      </td>
    </tr>
  );
};
