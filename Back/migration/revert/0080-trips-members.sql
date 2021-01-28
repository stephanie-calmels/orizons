-- Revert orizons:0080-trips-members from pg

BEGIN;


DROP VIEW "category_by_trip";

ALTER TABLE "step" DROP COLUMN "step_date";

COMMIT;
