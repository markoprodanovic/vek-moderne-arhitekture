CREATE TABLE eras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE architects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  era_id UUID NOT NULL REFERENCES eras(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  architect_id UUID NOT NULL REFERENCES architects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_architects_era_id ON architects(era_id, sort_order);
CREATE INDEX idx_links_architect_id ON links(architect_id, sort_order);

ALTER TABLE eras ENABLE ROW LEVEL SECURITY;
ALTER TABLE architects ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "public_read_eras"       ON eras       FOR SELECT USING (true);
CREATE POLICY "public_read_architects" ON architects FOR SELECT USING (true);
CREATE POLICY "public_read_links"      ON links      FOR SELECT USING (true);

-- Authenticated write
CREATE POLICY "auth_insert_eras"       ON eras       FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "auth_update_eras"       ON eras       FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "auth_delete_eras"       ON eras       FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "auth_insert_architects" ON architects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "auth_update_architects" ON architects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "auth_delete_architects" ON architects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "auth_insert_links"      ON links      FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "auth_update_links"      ON links      FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "auth_delete_links"      ON links      FOR DELETE USING (auth.role() = 'authenticated');
