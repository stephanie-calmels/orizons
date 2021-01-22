-- Deploy orizons:0030-trips-functions to pg

BEGIN;

CREATE VIEW trip_step AS
SELECT trip.id, trip.member_id, trip.title, JSON_AGG(step.title ||' '|| step.number_step) AS steps FROM trip JOIN step ON trip.id = step.trip_id GROUP BY trip.id, trip.member_id, trip.title;



COMMIT;
