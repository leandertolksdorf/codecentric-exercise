import type { GetServerSideProps, NextPage } from "next";

import { getMembersByLanguage } from "../api/getMembersByLanguage";
import { MemberListItem } from "../components/MemberListItem";
import { Member } from "../types";

type ServerSideProps = {
  members: Member[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const language = context.query.language as string;
  const members = await getMembersByLanguage(language);
  return {
    props: {
      members,
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
