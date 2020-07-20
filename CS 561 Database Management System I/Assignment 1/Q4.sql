--Query #4
	
	select cust As CUSTOMER, prod As PRODUCT,
	ROUND(AVG(case when month < 4 then quant end),0) As Q1_AVG,
	ROUND(AVG(case when month > 3 and month < 7  then quant end),0) As Q2_AVG,
	ROUND(AVG(case when month > 6 and month < 10 then quant end),0) As Q3_AVG,
	ROUND(AVG(case when month > 9 then quant end),0) As Q4_AVG,
	ROUND(AVG(quant),0) as AVERAGE, SUM(quant) as TOTAL, COUNT(quant) As COUNT
	from sales
	group by cust, prod;