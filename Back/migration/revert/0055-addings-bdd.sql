-- Revert orizons:0055-addings-bdd from pg

BEGIN;

ALTER TABLE photo DROP COLUMN "step_id";

ALTER TABLE "step" ALTER COLUMN "localisation_id" SET NOT NULL;

COMMIT;
