--Query#1
SELECT prod, month, Avg(quant) as avg1
Into Qy1
FROM sales s
GROUP BY prod, month
ORDER BY prod, month;

SELECT * FROM Qy1;

SELECT v1.prod, v1.month, v2.avg1 AS next
into Qy2
FROM Qy1 v1, Qy1 v2
WHERE v1.prod = v2.prod AND v1.month = v2.month-1
GROUP BY v1.prod, v1.month, v2.avg1
ORDER BY prod, month;

SELECT v1.prod, v1.month, v2.avg1 AS prev
into Qy3
FROM Qy1 v1, Qy1 v2
WHERE v1.prod = v2.prod AND v1.month = v2.month+1
GROUP BY v1.prod, v1.month, v2.avg1
ORDER BY prod, month;

SELECT * FROM Qy2;

SELECT Qy1.prod, Qy1.month, avg1, prev, next 
into Qy4
FROM Qy1 NATURAL FULL JOIN Qy2 NATURAL FULL JOIN Qy3;

SELECT * FROM Qy4;

SELECT s.prod AS "PRODUCT", s.month AS "MONTH", count(quant) AS "SALES_COUNT_BETWEEN_AVGS"
FROM Qy4, sales s
WHERE s.quant >= prev AND s.quant <= next
GROUP BY s.prod, s.month
ORDER BY s.prod, s.month;