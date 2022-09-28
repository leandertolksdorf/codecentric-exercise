import { GetServerSideProps, NextPage } from "next";
import { fetchMembers, filterByLanguage } from "../api/members";
import { LanguageSelector } from "../components/LanguageSelector";
import { Layout } from "../components/Layout";
import { MemberTable } from "../components/MemberTable";
import { MemberTableRow } from "../components/MemberTableRow";
import { Member } from "../types";
import { getAllLanguages, getLanguageOccurence } from "../util/transforms";

type ServerSideProps = {
  members: Member[];
  languages: string[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const language = context.query.language as string;
  const members = await fetchMembers();
  const filteredMembers = filterByLanguage(members, language);
  const languages = getAllLanguages(members);

  if (language) {
    filteredMembers.sort((a, b) => {
      const languageOccurencesA = getLanguageOccurence(a.repositories);
      const languageOccurencesB = getLanguageOccurence(b.repositories);
      const languageRankA = languageOccurencesA.find(
        (item) => item.language === language
      )?.occurence!;
      const languageRankB = languageOccurencesB.find(
        (item) => item.language === language
      )?.occurence!;
      if (languageRankA < languageRankB) return 1;
      if (languageRankA > languageRankB) return -1;
      return 0;
    });
  }

  return {
    props: {
      members: filteredMembers,
      languages,
    },
  };
};

const Home: NextPage<ServerSideProps> = (props) => {
  return (
    <Layout>
      <LanguageSelector languages={props.languages} />
      <MemberTable>
        {props.members.map((member, i) => (
          <MemberTableRow key={i} member={member} />
        ))}
      </MemberTable>
    </Layout>
  );
};

export default Home;
