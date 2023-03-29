Tab1
START TRANSACTION;

SELECT * FROM brand WHERE name = 'Gottone' FOR UPDATE;
SELECT SLEEP(20);

COMMIT

Tab2
update brand set contact = 'yy' WHERE name = 'Gottone'

822
263540161660