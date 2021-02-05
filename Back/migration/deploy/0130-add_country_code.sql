-- Deploy orizons:0130-add_country_code to pg

BEGIN;

ALTER TABLE "country" ADD COLUMN "code_2" TEXT DEFAULT '_';



COMMIT;
