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
      <td>{props.member.login}</td>
      <td>
        {languages.map((language, i) => (
          <LanguageOccurence key={i} languageOccurence={language} />
        ))}
      </td>
    </tr>
  );
};
