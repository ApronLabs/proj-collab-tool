-- Add service field to bugs and improvements tables
ALTER TABLE collab.bugs ADD COLUMN IF NOT EXISTS service VARCHAR(20) DEFAULT 'nosim';
ALTER TABLE collab.improvements ADD COLUMN IF NOT EXISTS service VARCHAR(20) DEFAULT 'nosim';

-- Add indexes
CREATE INDEX IF NOT EXISTS bugs_service_idx ON collab.bugs(service);
CREATE INDEX IF NOT EXISTS improvements_service_idx ON collab.improvements(service);
