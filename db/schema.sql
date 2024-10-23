create TABLE users(
    id SERIAL PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    gender text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    position text NOT NULL,
    activationLink text NOT NULL,
    isActivated BOOLEAN DEFAULT FALSE
);

create TABLE tokens(
    id SERIAL PRIMARY KEY,
    userID INTEGER NOT NULL,
    refresh_token text NOT NULL,
    time INTEGER
);

create TABLE items(
    id SERIAL PRIMARY KEY,
    ean text NOT NULL,
    brand text NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    under_type text NOT NULL,
    size text[] NOT NULL,
    material text NOT NULL,
    price INTEGER NOT NULL,
    cent INTEGER,
    gender text NOT NULL,
    color text NOT NULL,
    fasion text,
	cutting text,
    img text[] NOT NULL
);

create TABLE cart(
    id SERIAL PRIMARY KEY,
    userid INTEGER NOT NULL,
    itemid INTEGER NOT NULL,
    size text NOT NULL,
    number INTEGER DEFAULT 1
);
