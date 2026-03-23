-- Add resolved_at column to bugs and improvements tables
ALTER TABLE collab.bugs ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMPTZ;
ALTER TABLE collab.improvements ADD COLUMN IF NOT EXISTS resolved_at TIMESTAMPTZ;

-- Backfill: set resolved_at = updated_at for already resolved items
UPDATE collab.bugs SET resolved_at = updated_at WHERE status = 'resolved' AND resolved_at IS NULL;
UPDATE collab.improvements SET resolved_at = updated_at WHERE status = 'resolved' AND resolved_at IS NULL;
