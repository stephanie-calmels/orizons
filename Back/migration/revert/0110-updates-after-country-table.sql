-- Revert orizons:0110-updates-after-country-table from pg

BEGIN;

ALTER TABLE "member" ADD COLUMN "localisation_id" INT REFERENCES "localisation"("id");
ALTER TABLE "step" ADD COLUMN "localisation_id" INT REFERENCES "localisation"("id");

DROP VIEW "step_by_step";

--DROP TABLE "_m2m_trip_country";

ALTER TABLE "step" ALTER COLUMN "member_id" SET NOT NULL;

ALTER TABLE "step" DROP COLUMN "country_id";

COMMIT;
