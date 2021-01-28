-- Deploy orizons:0080-trips-members to pg

BEGIN;

SELECT VIEW 
SELECT "trip"."id", "title", JSON_AGG("category") FROM "trip"
JOIN "_m2m_trip_category" tc ON "tc"."trip_id" = "trip"."id"
JOIN "category" ON "category"."id" = "tc"."category_id"
GROUP BY "trip"."id", "title";



SELECT nickname, biography, cover_member, profile_photo, registration_date, localisation,
        JSON_AGG("trip")
FROM member
LEFT OUTER JOIN trip ON trip.member_id = member.id
LEFT OUTER JOIN category_trip_id ON 
GROUP BY nickname, biography, cover_member, profile_photo, registration_date, localisation;


COMMIT;
