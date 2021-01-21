-- Deploy orizons:0015-member_constraint to pg

BEGIN;

ALTER TABLE member DROP CONSTRAINT member_registration_date_check;

COMMIT;
