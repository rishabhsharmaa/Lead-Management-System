CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  source VARCHAR(20) NOT NULL CHECK (source IN ('Call', 'WhatsApp', 'Field')),
  status VARCHAR(20) NOT NULL DEFAULT 'Interested' CHECK (status IN ('Interested', 'Not Interested', 'Converted')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
