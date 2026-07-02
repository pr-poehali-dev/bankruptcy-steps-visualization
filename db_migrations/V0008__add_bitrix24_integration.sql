
ALTER TABLE t_p48458750_bankruptcy_steps_vis.leads
  ADD COLUMN IF NOT EXISTS bitrix24_id VARCHAR(64),
  ADD COLUMN IF NOT EXISTS bitrix24_status VARCHAR(64),
  ADD COLUMN IF NOT EXISTS bitrix24_synced_at TIMESTAMP;

INSERT INTO t_p48458750_bankruptcy_steps_vis.site_settings (key, value) VALUES
  ('bitrix24_enabled', 'false'),
  ('bitrix24_entity_type', 'lead'),
  ('bitrix24_responsible_id', ''),
  ('bitrix24_source', 'WEB'),
  ('bitrix24_status_map_new', 'NEW'),
  ('bitrix24_status_map_in_progress', 'IN_WORK'),
  ('bitrix24_status_map_done', 'CONVERTED')
ON CONFLICT (key) DO NOTHING;
