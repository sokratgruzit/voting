CREATE TABLE IF NOT EXISTS ideas (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  votes INTEGER NOT NULL DEFAULT 0,  -- добавляем поле votes
  created_at TIMESTAMPTZ DEFAULT now()
);

-- votes: каждый голос сохраняем с привязкой к idea_id и ip (inet)
CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  idea_id INTEGER NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  ip inet NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT uniq_idea_ip UNIQUE (idea_id, ip)
);

-- счетчик голосов по IP для атомарного контроля лимита
CREATE TABLE IF NOT EXISTS ip_counters (
  ip inet PRIMARY KEY,
  cnt INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_votes_ip ON votes (ip);
CREATE INDEX IF NOT EXISTS idx_votes_idea ON votes (idea_id);
