CREATE TABLE restaurants (
  place_id     varchar(10), 
  name         varchar(50),
  reviews      jsonb,
  rating       int,
  price_level  int,
  neighborhood varchar(50),
  city         varchar(50),
  street       varchar(50)
);