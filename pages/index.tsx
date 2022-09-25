import { GetServerSideProps, NextPage } from "next";
import { Member } from "../api/fetchMembers";
import { getMembersByLanguage } from "../api/getMembersByLanguage";
import { Layout } from "../components/Layout";
import { MemberTable } from "../components/MemberTable";
import { MemberTableRow } from "../components/MemberTableRow";

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
    <Layout>
      <MemberTable>
        {props.members.map((member, i) => (
          <MemberTableRow key={i} member={member} />
        ))}
      </MemberTable>
    </Layout>
  );
};

export default Home;
