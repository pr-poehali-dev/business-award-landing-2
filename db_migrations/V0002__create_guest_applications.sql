CREATE TABLE IF NOT EXISTS t_p17302868_business_award_landi.guest_applications (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    tickets TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);