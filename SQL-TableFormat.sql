--------------------ONE TABLE-----------------------
CREATE TABLE restaurants (
  place_id     varchar(10) PRIMARY KEY, 
  name         varchar(50),
  reviews      jsonb,
  rating       int,
  price_level  int,
  neighborhood varchar(50),
  city         varchar(50),
  street       varchar(50)
);

-------------------TWO TABLES------------------------

CREATE TABLE restaurants (
  place_id     varchar(10) PRIMARY KEY, 
  name         varchar(50),
  rating       int,
  price_level  int,
  neighborhood varchar(50),
  city         varchar(50),
  street       varchar(50)
);

CREATE TABLE reviews (
  review_id                  varchar(10) PRIMARY KEY,
  restaurant_id              varchar(10),
  author_name                varchar(50),
  profile_photo_url          text,
  rating                     int,
  relative_time_description  varchar(50),
  comment                    text
);

