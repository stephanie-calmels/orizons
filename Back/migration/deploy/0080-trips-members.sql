-- Deploy orizons:0080-trips-members to pg

BEGIN;

ALTER TABLE "step" ADD COLUMN "step_date" DATE;

CREATE OR REPLACE VIEW "category_by_trip" AS
SELECT "trip"."id",
     "title", JSON_AGG("category") FROM "trip"
JOIN "_m2m_trip_category" tc ON "tc"."trip_id" = "trip"."id"
JOIN "category" ON "category"."id" = "tc"."category_id"
GROUP BY "trip"."id", "title";



COMMIT;
