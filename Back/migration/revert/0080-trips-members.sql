-- Revert orizons:0080-trips-members from pg

BEGIN;




SELECT nickname, biography, cover_member, profile_photo, registration_date, localisation,
        JSON_AGG("trip")
FROM member
LEFT OUTER JOIN trip ON trip.member_id = member.id
GROUP BY nickname, biography, cover_member, profile_photo, registration_date, localisation;

COMMIT;
