-- Deploy orizons:0003-add-table-trip-country to pg

BEGIN;
CREATE TABLE IF NOT EXISTS "_m2m_trip_country"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"trip_id" INT NOT NULL REFERENCES "trip"("id"),
"country_id" INT NOT NULL REFERENCES "country"("id")
);

COMMIT;
