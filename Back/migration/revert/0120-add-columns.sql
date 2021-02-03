-- Revert orizons:0120-add-columns from pg

BEGIN;

ALTER TABLE "_m2m_trip_country" DROP COLUMN "trip";

ALTER TABLE "step" DROP COLUMN "step_date";


COMMIT;
