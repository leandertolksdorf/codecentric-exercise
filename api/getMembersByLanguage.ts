import { fetchMembers } from "./fetchMembers";

export const getMembersByLanguage = async (language?: string) => {
  const members = await fetchMembers();
  if (!language) return members;

  const filteredMembers = members.filter(
    (member) =>
      member.repositories.findIndex((repository) =>
        repository.languages.includes(language)
      ) !== -1
  );
  return filteredMembers;
};
