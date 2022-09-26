import type { GetServerSideProps, NextPage } from "next";
import { fetchMembers, filterByLanguage } from "../api/members";

import { MemberListItem } from "../components/MemberListItem";
import { Member } from "../types";

type ServerSideProps = {
  members: Member[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const language = context.query.language as string;
  const members = await fetchMembers();
  const filteredMembers = filterByLanguage(members, language);
  return {
    props: {
      members: filteredMembers,
    },
  };
};

const Raw: NextPage<ServerSideProps> = (props) => {
  return (
    <div>
      <ul>
        {props.members.map((member, i) => (
          <MemberListItem key={i} member={member} />
        ))}
      </ul>
    </div>
  );
};

export default Raw;
