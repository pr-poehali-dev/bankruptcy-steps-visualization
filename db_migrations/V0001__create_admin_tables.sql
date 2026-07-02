
CREATE TABLE IF NOT EXISTS t_p48458750_bankruptcy_steps_vis.admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p48458750_bankruptcy_steps_vis.leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(50),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p48458750_bankruptcy_steps_vis.site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p48458750_bankruptcy_steps_vis.page_views (
  id SERIAL PRIMARY KEY,
  path VARCHAR(255) NOT NULL,
  viewed_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p48458750_bankruptcy_steps_vis.site_settings (key, value) VALUES
  ('hero_title', 'Избавьтесь от долгов законно и навсегда'),
  ('hero_subtitle', 'Адвокатское бюро «Правовой статус» проведёт процедуру банкротства под ключ — от первичного анализа до полного списания задолженности.'),
  ('phone', '+7 (800) 123-45-67'),
  ('email', 'info@pravovoy-status.ru'),
  ('address', 'Москва, ул. Примерная, д. 1'),
  ('seo_title', 'Банкротство физических лиц — АБ Правовой статус'),
  ('seo_description', 'Профессиональное сопровождение процедуры банкротства физических лиц. Бесплатная консультация. Списание долгов под ключ.'),
  ('seo_keywords', 'банкротство физических лиц, списание долгов, арбитражный суд, адвокат'),
  ('form_title', 'Расскажите о своей ситуации'),
  ('form_subtitle', 'Первая консультация — бесплатно')
ON CONFLICT (key) DO NOTHING;

INSERT INTO t_p48458750_bankruptcy_steps_vis.admin_users (username, password_hash)
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;
