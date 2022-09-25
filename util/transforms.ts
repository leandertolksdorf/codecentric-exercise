import { Repository } from "../pages/api/members";

type LanguageOccurence = {
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
