-- Revert orizons:0023-Modifying_tables_structures from pg

BEGIN;

DROP TABLE "trips" ADD COLUMN "category_id" INT NOT NULL REFERENCES "category"("id");

COMMIT;
