import { fetchMembers } from "./fetchMembers";

export const getMembersByLanguage = async (language?: string) => {
  const members = await fetchMembers();
  const filteredMembers = members;
  return filteredMembers;
};
