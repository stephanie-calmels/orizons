-- Deploy orizons:0120-add-columns to pg

BEGIN;

ALTER TABLE "_m2m_trip_country" ADD COLUMN "trip" BOOLEAN DEFAULT TRUE;

--ALTER TABLE "step" ADD COLUMN "step_date" DATE;

COMMIT;
