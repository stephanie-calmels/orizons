-- Revert orizons:0015-member_constraint from pg

BEGIN;

ALTER TABLE "member" ALTER COLUMN "registration_date" ADD CONSTRAINT CHECK("registration_date" >= NOW());

COMMIT;
