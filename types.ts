export type LanguageOccurence = {
  language: string;
  occurence: number;
};

export type Repository = {
  name: string;
  languages: string[];
};

export type Member = {
  login: string;
  repositories: Repository[];
};
