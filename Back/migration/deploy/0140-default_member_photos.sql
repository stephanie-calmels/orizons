-- Deploy orizons:0140-default_member_photos to pg

BEGIN;

ALTER TABLE "member"
    ALTER COLUMN "profile_photo" SET DEFAULT 'https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg',
    ALTER COLUMN "cover_member" SET DEFAULT 'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

COMMIT;
