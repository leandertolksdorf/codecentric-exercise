// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { existsSync, readFile, readFileSync, writeFileSync } from "fs";
import { Octokit } from "octokit";
import type { NextApiRequest, NextApiResponse } from "next";

export type FetchResponse = {
  login: string;
  repositories: {
    name: string;
    languages: string[];
  }[];
}[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchResponse>
) {
  if (existsSync("./data/data.json")) {
    console.log("Returning existing data.json");
    return res.json(JSON.parse(readFileSync("./data/data.json").toString()));
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

  writeFileSync("./data/data.json", JSON.stringify(result));
  return res.json(result);
}