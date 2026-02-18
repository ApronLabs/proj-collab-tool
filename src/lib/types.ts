export interface UserSummary {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface GithubLinkSummary {
  id: string;
  githubType: string;
  number: number;
  title: string | null;
  url: string;
  state: string | null;
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
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: UserSummary;
  assignee: UserSummary | null;
  githubLinks: GithubLinkSummary[];
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

export interface IdeaAttachment {
  id: string;
  ideaId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number | null;
  mimeType: string | null;
  createdAt: string;
}

export interface IdeaDetail extends IdeaListItem {
  comments: IdeaComment[];
  attachments: IdeaAttachment[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  _count?: { ideaLinks: number };
}

export interface ImprovementListItem {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  repo: string | null;
  createdById: string;
  assigneeId: string | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: UserSummary;
  assignee: UserSummary | null;
  githubLinks: GithubLinkSummary[];
  _count: {
    comments: number;
    attachments: number;
    githubLinks: number;
  };
}

export interface ImprovementComment {
  id: string;
  improvementId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserSummary;
}

export interface ImprovementAttachment {
  id: string;
  improvementId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number | null;
  mimeType: string | null;
  createdAt: string;
}

export interface ImprovementGithubLink {
  id: string;
  improvementId: string;
  githubType: string;
  repo: string;
  number: number;
  title: string | null;
  url: string;
  state: string | null;
  createdAt: string;
}

export interface ImprovementDetail extends ImprovementListItem {
  comments: ImprovementComment[];
  attachments: ImprovementAttachment[];
  githubLinks: ImprovementGithubLink[];
}

// ============================================================================
// Screen Reference + Annotation types
// ============================================================================

export type AnnotationType = 'arrow' | 'circle' | 'rect' | 'text';

export interface Annotation {
  id: string;
  type: AnnotationType;
  x: number;
  y: number;
  color: string;
  props: Record<string, number | string>;
}

export interface ScreenReferenceData {
  id: string;
  entityType: string;
  entityId: string;
  stepOrder: number;
  pageId: string;
  screenshotUrl: string | null;
  annotations: string | null; // JSON string of Annotation[]
  description: string | null;
  createdAt: string;
}

export interface PendingScreenRef {
  pageId: string;
  stepOrder: number;
  screenshotUrl: string | null;
  annotations: Annotation[];
  description: string;
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
