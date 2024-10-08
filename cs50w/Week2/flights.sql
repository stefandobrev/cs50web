CREATE TABLE flights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    duration INTEGER NOT NULL
);

INSERT INTO flights (origin, destination, duration) VALUES ('New York', 'London', 415);
INSERT INTO flights (origin, destination, duration) VALUES ('Shanghai', 'Paris', 760);
INSERT INTO flights (origin, destination, duration) VALUES ('Istanbul', 'Tokyo', 700);
INSERT INTO flights (origin, destination, duration) VALUES ('New York', 'Paris', 435);
INSERT INTO flights (origin, destination, duration) VALUES ('Moscow', 'Paris', 415);
INSERT INTO flights (origin, destination, duration) VALUES ('Lima', 'New York', 415);

.mode columns
.headers yes

SELECT * FROM flights WHERE origin = 'New York';
SELECT * FROM flights WHERE duration > 500;
SELECT * FROM flights WHERE duration > 500 AND destination = 'Paris';
SELECT * FROM flights WHERE origin LIKE '%a%';

FUNCTION:
-AVERAGE
-SUM
-COUNT
-MIN/MAX

UPDATE flights
    SET duration = 225
    WHERE origin = 'Moscow'
    AND destination = 'Paris';

DELETE FROM flights WHERE destination = 'Tokyo';

OTHER CLAUSES:
-LIMIT
-ORDER BY
-GROUP BY
-HAVING

SELECT first, origin, destination FROM flights JOIN passangers ON passangers.flight_id = flights.id;

JOINs

JOIN / INNER JOIN
LEFT OUTER JOIN
RIGHT OUTER JOIN
FULL OUTER JOIN

CREATE INDEX name_index ON passangers (last);