import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { Octokit } from "octokit";
import { Member } from "../types";

export const fetchMembers = async () => {
  if (existsSync("./data/data.json")) {
    console.log("Returning existing data.json");
    const raw = readFileSync("./data/data.json").toString();
    const parsed = JSON.parse(raw);
    return parsed as Member[];
  }

  console.log("data.json missing. Fetching now.");

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });
  const members = await octokit.paginate(octokit.rest.orgs.listMembers, {
    org: "codecentric",
    per_page: 100,
  });

  const result: Member[] = [];

  for (let member of members) {
    const user = await octokit.rest.users.getByUsername({
      username: member.login,
    });
    const newMember: Member = {
      name: user.data.name,
      email: user.data.email,
      login: member.login,
      url: member.html_url,
      repositories: [],
    };

    const reposOfMemberRaw = await octokit.paginate(
      octokit.rest.repos.listForUser,
      {
        username: member.login,
        per_page: 100,
      }
    );

    for (let repo of reposOfMemberRaw) {
      const languagesOfRepositoryRaw = await octokit.paginate(
        octokit.rest.repos.listLanguages,
        { owner: repo.owner.login, repo: repo.name }
      );

      const languagesOfRepository = Object.keys(languagesOfRepositoryRaw[0]);

      newMember.repositories.push({
        name: repo.name,
        languages: languagesOfRepository,
      });
    }
    result.push(newMember);
  }

  if (!existsSync("./data")) {
    mkdirSync("./data");
  }
  writeFileSync("./data/data.json", JSON.stringify(result));

  return result;
};

export const filterByLanguage = async (
  members: Member[],
  language?: string
) => {
  if (!language) return members;

  const filteredMembers = members.filter(
    (member) =>
      member.repositories.findIndex((repository) =>
        repository.languages.includes(language)
      ) !== -1
  );
  return filteredMembers;
};
