-- Revert orizons:0060-trip_duration_status from pg
BEGIN;

CREATE OR REPLACE VIEW step_author AS
SELECT "member"."id" AS "id_member",
    "member"."nickname",
    "step"."trip_id" AS "trip_id",
    JSON_AGG("step") AS "steps"
    FROM "member"
    JOIN "step" ON "step"."member_id" = "member"."id"
    GROUP BY "member"."id", "member"."nickname", "step"."trip_id";

DROP VIEW "trip_with_duration_status";

DROP VIEW "category_trip_id";


COMMIT;
