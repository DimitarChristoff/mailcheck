-- find your most popular email domains from your user table
-- if table is called users and field is called email:
 SELECT substring_index(email, '@', -1), COUNT(*) as c FROM users where email != '' GROUP BY substring_index(email, '@', -1) ORDER BY c DESC limit 50;