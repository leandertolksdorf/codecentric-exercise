import type { NextPage } from "next";
import { MemberListItem } from "../components/MemberListItem";
import { MembersDTO } from "./api/members";

type ServerSideProps = {
  members: MembersDTO;
};

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/members");
  const members: MembersDTO = await response.json();
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
