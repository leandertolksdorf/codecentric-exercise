import type { GetServerSideProps, NextPage } from "next";
import { Member } from "../api/fetchMembers";
import { getMembersByLanguage } from "../api/getMembersByLanguage";
import { MemberListItem } from "../components/MemberListItem";

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

const Home: NextPage<ServerSideProps> = (props) => {
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

export default Home;
