export type LanguageOccurence = {
  language: string;
  occurence: number;
};

export type Repository = {
  name: string;
  languages: string[];
};

export type Member = {
  name: string | null;
  email: string | null;
  url: string;
  login: string;
  repositories: Repository[];
};
