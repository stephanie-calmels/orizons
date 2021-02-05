-- Revert orizons:0130-add_country_code from pg

BEGIN;



ALTER TABLE "country" DROP COLUMN "code_2";

COMMIT;
