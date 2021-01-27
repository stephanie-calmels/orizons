-- Deploy orizons:0060-trip_duration_status to pg

BEGIN;

CREATE OR REPLACE VIEW "trip_with_duration_status" AS
SELECT t."id",
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
        JSON_AGG("photo") AS "cover_photo",
        JSON_AGG("member") AS "author"
FROM "trip" t
JOIN "photo" ON "photo"."id" = t."photo_id"
JOIN "member" ON "member"."id" = t."member_id"
GROUP BY t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date";


CREATE VIEW "category_trip_id" AS
SELECT *
FROM "category"
JOIN "_m2m_trip_category" tc
        ON tc."category_id" = "category"."id"

COMMIT;
