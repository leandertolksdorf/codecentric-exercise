import { Member } from "../pages/api/members";
import { transformRepositoryListToLanguageOccurence } from "../util/transforms";

type MemberListItemProps = {
  member: Member;
};

export const MemberListItem = (props: MemberListItemProps) => {
  const languageOccurences = transformRepositoryListToLanguageOccurence(
    props.member.repositories
  );

  return (
    <li>
      <div>
        <b>{props.member.login}</b>
      </div>
      <div>
        {languageOccurences.map((entry, i) => (
          <div key={i}>
            {entry[0]}: {entry[1]}
          </div>
        ))}
      </div>
    </li>
  );
};
