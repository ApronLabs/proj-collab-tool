export interface UserSummary {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface BugListItem {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  repo: string | null;
  createdById: string;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: UserSummary;
  assignee: UserSummary | null;
  _count: {
    comments: number;
    attachments: number;
    githubLinks: number;
  };
}

export interface BugComment {
  id: string;
  bugId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
}

export interface BugAttachment {
  id: string;
  bugId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number | null;
  mimeType: string | null;
  createdAt: string;
}

export interface BugGithubLink {
  id: string;
  bugId: string;
  githubType: string;
  repo: string;
  number: number;
  title: string | null;
  url: string;
  state: string | null;
  createdAt: string;
}

export interface BugDetail extends BugListItem {
  comments: BugComment[];
  attachments: BugAttachment[];
  githubLinks: BugGithubLink[];
}

export interface IdeaListItem {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  createdBy: UserSummary;
  tagLinks: Array<{ tag: { id: string; name: string; color: string } }>;
  _count: {
    comments: number;
    votes: number;
  };
  hasVoted: boolean;
}

export interface IdeaComment {
  id: string;
  ideaId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
}

export interface IdeaDetail extends IdeaListItem {
  comments: IdeaComment[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  _count?: { ideaLinks: number };
}

export interface GithubItem {
  id: number;
  number: number;
  title: string;
  state: string;
  url: string;
  repo: string;
  labels: (string | undefined)[];
  createdAt: string;
  updatedAt: string;
  user: string | undefined;
}
