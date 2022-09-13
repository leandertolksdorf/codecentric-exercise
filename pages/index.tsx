import type { GetServerSideProps, NextPage } from "next";
import { FetchResponse } from "./api/fetch";

type ServerSideProps = {
  members: FetchResponse;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/fetch");
  const members: FetchResponse = await response.json();
  return {
    props: {
      members,
    },
  };
};

const Home: NextPage<ServerSideProps> = (props) => {
  return <p>Hello World</p>;
};

export default Home;
