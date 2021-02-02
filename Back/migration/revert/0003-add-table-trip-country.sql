-- Revert orizons:0003-add-table-trip-country from pg

BEGIN;
DROP TABLE "_m2m_trip_country";

-- XXX Add DDLs here.

COMMIT;
