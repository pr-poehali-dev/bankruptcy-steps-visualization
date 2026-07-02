
CREATE TABLE IF NOT EXISTS t_p48458750_bankruptcy_steps_vis.pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  subtitle VARCHAR(500),
  content TEXT,
  seo_title VARCHAR(300),
  seo_description TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
