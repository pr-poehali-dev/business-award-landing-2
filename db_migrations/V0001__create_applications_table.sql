CREATE TABLE t_p17302868_business_award_landi.applications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  nomination TEXT,
  about TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);