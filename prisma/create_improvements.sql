-- Create improvements tables in collab schema (idempotent)

CREATE TABLE IF NOT EXISTS collab.improvements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'medium',
  repo TEXT,
  created_by_id UUID NOT NULL REFERENCES public.users(id),
  assignee_id UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_improvements_status ON collab.improvements(status);
CREATE INDEX IF NOT EXISTS idx_improvements_priority ON collab.improvements(priority);
CREATE INDEX IF NOT EXISTS idx_improvements_created_by ON collab.improvements(created_by_id);

CREATE TABLE IF NOT EXISTS collab.improvement_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  improvement_id UUID NOT NULL REFERENCES collab.improvements(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_improvement_comments_improvement ON collab.improvement_comments(improvement_id);

CREATE TABLE IF NOT EXISTS collab.improvement_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  improvement_id UUID NOT NULL REFERENCES collab.improvements(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_improvement_attachments_improvement ON collab.improvement_attachments(improvement_id);

CREATE TABLE IF NOT EXISTS collab.improvement_github_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  improvement_id UUID NOT NULL REFERENCES collab.improvements(id) ON DELETE CASCADE,
  github_type TEXT NOT NULL,
  repo TEXT NOT NULL,
  number INTEGER NOT NULL,
  title TEXT,
  url TEXT NOT NULL,
  state TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(improvement_id, repo, number)
);

CREATE INDEX IF NOT EXISTS idx_improvement_github_links_improvement ON collab.improvement_github_links(improvement_id);
