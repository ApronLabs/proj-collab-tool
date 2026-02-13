import { Octokit } from "octokit";

const globalForOctokit = globalThis as unknown as {
  octokit: Octokit | undefined;
};

function createOctokit() {
  return new Octokit({
    auth: process.env.GITHUB_PAT,
  });
}

export const octokit = globalForOctokit.octokit ?? createOctokit();

if (process.env.NODE_ENV !== "production") globalForOctokit.octokit = octokit;

export function getConfiguredRepos(): string[] {
  const repos = process.env.GITHUB_REPOS || "";
  return repos.split(",").map((r) => r.trim()).filter(Boolean);
}

export function parseRepo(fullName: string) {
  const [owner, repo] = fullName.split("/");
  return { owner, repo };
}
