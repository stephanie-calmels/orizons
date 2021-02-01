-- Deploy orizons:0110-updates-after-country-table to pg

BEGIN;

-- creating new table _m2m_trip_country
--DROP TABLE IF EXISTS "_m2m_trip_country";
ALTER TABLE "step" ALTER COLUMN "member_id" DROP NOT NULL;


CREATE TABLE IF NOT EXISTS "_m2m_trip_country"(
"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
"trip_id" INT NOT NULL REFERENCES "trip"("id"),
"country_id" INT NOT NULL REFERENCES "country"("id")
);

-- add column country_id in step table
ALTER TABLE "step" ADD COLUMN "country_id" INT NOT NULL REFERENCES "country"("id") ;

CREATE OR REPLACE VIEW "step_by_step" AS
SELECT s."id" AS "step_id", s."longitude", s."latitude", s."title", s."number_step", s."content", s."trip_id",
    JSON_AGG("country") AS "country",
    JSON_AGG ("photo") AS "photos"
FROM "step" s
JOIN "country" ON "country"."id" = s."country_id"
JOIN "photo" ON "photo"."step_id" = s."id"
GROUP BY s."id", s."longitude", s."latitude", s."title", s."number_step", s."content";

ALTER TABLE "step" DROP COLUMN "localisation_id";
ALTER TABLE "member" DROP COLUMN "localisation_id";

COMMIT;
