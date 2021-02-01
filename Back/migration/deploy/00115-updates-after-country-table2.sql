-- Deploy orizons:00115-updates-after-country-table2 to pg

BEGIN;

DROP VIEW IF EXISTS "trip_with_duration_status_steps";
DROP VIEW IF EXISTS "trip_with_duration_status";
DROP VIEW IF EXISTS "category_country_by_trip";
DROP VIEW IF EXISTS "step_photo";

CREATE OR REPLACE VIEW "category_country_by_trip" AS
SELECT "trip"."id" AS trip_id,
     JSON_AGG(DISTINCT "category") AS "categories",
     JSON_AGG(DISTINCT "country") AS "trip_localisation"
FROM "trip"
JOIN "_m2m_trip_category" tc ON "tc"."trip_id" = "trip"."id"
JOIN "category" ON "category"."id" = "tc"."category_id"
JOIN "_m2m_trip_country" tl ON tl."trip_id" = "trip"."id"
JOIN "country" ON "country"."id" = "tl"."country_id"
GROUP BY "trip"."id";


CREATE OR REPLACE VIEW "step_photo" AS
SELECT "step"."id" AS "id_step",
    "longitude","latitude", "step"."title" AS "step_title", "number_step", "content", "step_date",
    "step"."trip_id" AS "trip_id",
    JSON_AGG("photo") AS "photos"
    FROM "step"
    JOIN "photo" ON "photo"."step_id" = "step"."id"
    GROUP BY "id_step",
    "longitude","latitude", "step_title", "number_step", "content", "trip_id"
    ORDER BY "step"."number_step";


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
        t."cover_trip",
        JSON_AGG(DISTINCT "member") AS "author",
        JSON_AGG("category_country_by_trip") AS "trips"
FROM "trip" t
LEFT OUTER JOIN "photo" ON "photo"."id" = t."photo_id"
LEFT OUTER JOIN "member" ON "member"."id" = t."member_id"
LEFT OUTER JOIN "category_country_by_trip" ON "category_country_by_trip"."trip_id" = t."id"
GROUP BY t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date";

CREATE OR REPLACE VIEW "trip_with_duration_status_steps" AS
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
        t."cover_trip",
        JSON_AGG(DISTINCT "member") AS "author",
        JSON_AGG("category_country_by_trip") AS "trips",
        JSON_AGG("step_photo") AS "steps"
FROM "trip" t
LEFT OUTER JOIN "photo" ON "photo"."id" = t."photo_id"
LEFT OUTER JOIN "member" ON "member"."id" = t."member_id"
LEFT OUTER JOIN "category_country_by_trip" ON "category_country_by_trip".
"trip_id" = t."id"
LEFT OUTER JOIN "step_photo" ON "step_photo"."trip_id" = t."id"
GROUP BY t."id",
        t."title",
        t."summary",
        t."departure_date",
        t."arrival_date";

CREATE OR REPLACE VIEW "category_by_trip" AS
SELECT "trip"."id",
     "title", "summary","departure_date", "arrival_date", "score", "cover_trip",
     JSON_AGG(DISTINCT "category") AS "categories",
     JSON_AGG(DISTINCT "country") AS "trip_localisation"
FROM "trip"
JOIN "_m2m_trip_category" tc ON "tc"."trip_id" = "trip"."id"
JOIN "category" ON "category"."id" = "tc"."category_id"
JOIN "_m2m_trip_country" tl ON "tl"."trip_id" = "trip"."id"
JOIN "country" ON "country"."id" = "tl"."country_id"
GROUP BY "trip"."id",
     "title", "summary","departure_date", "arrival_date", "score", "cover_trip";        
COMMIT;

