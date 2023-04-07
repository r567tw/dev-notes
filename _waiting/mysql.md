Tab1
START TRANSACTION;

SELECT * FROM brand WHERE name = 'Gottone' FOR UPDATE;
SELECT SLEEP(20);

COMMIT

Tab2
update brand set contact = 'yy' WHERE name = 'Gottone'


mysql JSON_QUOTE JSON_OBJECT GROUP_CONCAT 設定 Max GroupConcat len SQL mode https://vocus.cc/article/615ffe32fd8978000126804a