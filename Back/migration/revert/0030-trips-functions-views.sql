-- Revert orizons:0030-trips-functions from pg

BEGIN;

DROP VIEW "trip_step";

COMMIT;
