--Query#3
WITH tbl_avg_cust AS 
(
	SELECT cust, prod, state, count(quant) AS C1, sum(quant) AS S1, round(avg(quant),0) AS CUST_AVG
	FROM sales
	GROUP BY cust, prod, state
	
), tbl_other_state AS
(
	SELECT cust, prod, count(quant) AS C2, sum(quant) AS S2
	FROM sales
	GROUP BY cust, prod
		
), tbl_other_product AS
(
	SELECT cust, state, count(quant) AS C3, sum(quant) AS S3, round(avg(quant),0) AS PROD_AVG
	FROM sales
	GROUP BY cust, state
)
SELECT t1.cust AS "CUSTOMER", t1.prod AS "PRODUCT", t1.state AS "STATE", PROD_AVG AS "PROD_AVG", (S3-S1)/(C3-C1) AS "OTHER_CUST_AVG", (S3-S1)/(C3-C1) AS "OTHER_PROD_AVG"
FROM tbl_avg_cust t1, tbl_other_state t2, tbl_other_product t3
WHERE t1.cust = t2.cust AND t1.prod = t2.prod AND t1.cust = t3.cust AND t1.state = t3.state