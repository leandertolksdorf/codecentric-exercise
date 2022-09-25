import { Member, Repository } from "../api/fetchMembers";

export type LanguageOccurence = {
  language: string;
  occurence: number;
};

/**
 *
 * @param {Repository[]} repositories List of repositories
 * @returns Array of Languages with occurences, e.g. [["Java", 2], ["Python", 1]]
 */
export function getLanguageOccurence(
  repositories: Repository[]
): LanguageOccurence[] {
  const languageOccurences: LanguageOccurence[] = [];

  // Count up languages used in repositories
  for (let repository of repositories) {
    for (let repositoryLanguage of repository.languages) {
      const index = languageOccurences.findIndex(
        ({ language }) => language === repositoryLanguage
      );
      if (index === -1) {
        languageOccurences.push({
          language: repositoryLanguage,
          occurence: 1,
        });
      } else {
        languageOccurences[index].occurence += 1;
      }
    }
  }

  // Sort by descending occurence, by name when equal occurence.
  languageOccurences.sort((a, b) => {
    if (a.occurence > b.occurence) return -1;
    if (a.occurence < b.occurence) return 1;
    if (a.language.toLowerCase() < b.language.toLowerCase()) return -1;
    if (a.language.toLowerCase() > b.language.toLowerCase()) return 1;
    return 0;
  });

  return languageOccurences;
}

export const getAllLanguages = (members: Member[]) => {
  const languages = new Set<string>();

  for (let member of members) {
    for (let repo of member.repositories) {
      for (let language of repo.languages) {
        languages.add(language);
      }
    }
  }
  const result = Array.from(languages);
  result.sort();
  return result;
};
