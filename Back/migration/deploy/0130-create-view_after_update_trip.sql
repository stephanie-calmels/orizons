-- Deploy orizons:0130-create-view_after_update_trip to pg

BEGIN;
CREATE OR REPLACE VIEW "trip_with_duration_status_steps_2" AS
SELECT t."id",
-- XXX Add DDLs here.
       t."title",
        t."summary",
        t."departure_date",
        t."arrival_date",(t."arrival_date"-t."departure_date" + 1) AS "duration",
        (CASE 
            WHEN t."arrival_date" IS NULL 
                THEN 'En cours'
            WHEN CURRENT_DATE > t."departure_date" 
                    AND CURRENT_DATE < t."arrival_date"
                THEN 'En cours'
                ELSE 'Terminé'
                END) AS "status",
        t."score",
        t."cover_trip",
        JSON_AGG(DISTINCT "member") AS "author",
        JSON_AGG(DISTINCT "category") AS "categories",
        JSON_AGG(DISTINCT "country") AS "trip_localisation",
        JSON_AGG(DISTINCT "step_photo") AS "steps"
FROM "trip" t
LEFT OUTER JOIN "photo" ON "photo"."id" = t."photo_id"
LEFT OUTER JOIN "member" ON "member"."id" = t."member_id"
JOIN "_m2m_trip_category" tc ON "tc"."trip_id" = t."id"
JOIN "category" ON "category"."id" = "tc"."category_id"
JOIN "_m2m_trip_country" tl ON tl."trip_id" = t."id"
JOIN "country" ON "country"."id" = "tl"."country_id"
LEFT OUTER JOIN "step_photo" ON "step_photo"."trip_id" = t."id"
GROUP BY t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date";


COMMIT;
