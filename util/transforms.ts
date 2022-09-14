import { Repository } from "../pages/api/members";

/**
 *
 * @param {Repository[]} repositories List of repositories
 * @returns Array of Languages with occurences, e.g. [["Java", 2], ["Python", 1]]
 */
export function transformRepositoryListToLanguageOccurence(
  repositories: Repository[]
) {
  const languages: { [key: string]: number } = {};

  // Count up languages used in repositories
  for (const repository of repositories) {
    for (const language of repository.languages) {
      if (Object.hasOwn(languages, language)) {
        languages[language] += 1;
      } else {
        languages[language] = 1;
      }
    }
  }

  const result = Object.entries(languages);

  // Sort by descending occurence, by name when equal occurence.
  result.sort((a, b) => {
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;
    if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;
    if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
    return 0;
  });

  return result;
}
