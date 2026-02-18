-- Screen References table for bug/improvement page references with annotations
CREATE TABLE IF NOT EXISTS collab.screen_references (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  step_order INTEGER NOT NULL DEFAULT 0,
  page_id TEXT NOT NULL,
  screenshot_url TEXT,
  annotations TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_screen_references_entity
  ON collab.screen_references (entity_type, entity_id);

CREATE INDEX IF NOT EXISTS idx_screen_references_step
  ON collab.screen_references (entity_id, step_order);
