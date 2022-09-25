import { Member } from "../api/fetchMembers";
import { getLanguageOccurence } from "../util/transforms";

type MemberListItemProps = {
  member: Member;
};

export const MemberListItem = (props: MemberListItemProps) => {
  const languageOccurences = getLanguageOccurence(props.member.repositories);

  return (
    <li>
      <div>
        <b>{props.member.login}</b>
      </div>
      <div>
        {languageOccurences.map((entry, i) => (
          <div key={i}>
            {entry.language}: {entry.occurence}
          </div>
        ))}
      </div>
    </li>
  );
};
