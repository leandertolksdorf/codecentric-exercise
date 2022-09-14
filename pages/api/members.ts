import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

export type Repository = {
  name: string;
  languages: string[];
};

export type Member = {
  login: string;
  repositories: Repository[];
};

export type MembersDTO = Member[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MembersDTO>
) {
  if (existsSync("./data/data.json")) {
    console.log("Returning existing data.json");
    const raw = readFileSync("./data/data.json").toString();
    const parsed = JSON.parse(raw);
    return res.json(parsed);
  }

  console.log("data.json missing. Fetching now.");

  const octokit = new Octokit({
    auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  });
  const members = await octokit.paginate(octokit.rest.orgs.listMembers, {
    org: "codecentric",
    per_page: 100,
  });

  const result = await Promise.all(
    members.map(async (member) => {
      const repositories = await octokit.paginate(
        octokit.rest.repos.listForUser,
        {
          username: member.login,
        }
      );

      const repositoriesWithLanguages = await Promise.all(
        repositories.map(async (repository) => {
          const languages = await octokit.paginate(
            octokit.rest.repos.listLanguages,
            { owner: repository.owner.login, repo: repository.name }
          );

          return {
            name: repository.name,
            languages: Object.keys(languages[0]),
          };
        })
      );

      return {
        login: member.login,
        repositories: repositoriesWithLanguages,
      };
    })
  );

  if (!existsSync("./data")) {
    mkdirSync("./data");
  }
  writeFileSync("./data/data.json", JSON.stringify(result));

  return res.json(result);
}
