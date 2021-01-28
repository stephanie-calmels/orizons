-- Deploy orizons:0080-trips-members to pg

BEGIN;

ALTER TABLE "step" ADD COLUMN "step_date" DATE;

CREATE VIEW "category_by_trip" AS
SELECT "trip"."id", "title", JSON_AGG("category") FROM "trip"
JOIN "_m2m_trip_category" tc ON "tc"."trip_id" = "trip"."id"
JOIN "category" ON "category"."id" = "tc"."category_id"
GROUP BY "trip"."id", "title";



SELECT "nickname", "biography", "cover_member", "profile_photo", "registration_date", "localisation",
        JSON_AGG("trip"),
        JSON_AGG("category_by_trip")
FROM "member"
LEFT OUTER JOIN "trip" ON "trip"."member_id" = "member"."id"
LEFT OUTER JOIN "category_by_trip" cbt ON cbt."id" = "trip"."id"
GROUP BY "nickname", "biography", "cover_member", "profile_photo", "registration_date", "localisation";


COMMIT;
