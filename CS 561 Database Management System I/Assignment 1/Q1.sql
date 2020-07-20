--Query #1

WITH MINQUANT As(
WITH report As(
		SELECT cust,MIN(quant) As MIN_Q,MAX(quant) As MAX_Q, AVG(quant) As AVG_Q
		from sales
		group by cust
	)
	SELECT report.cust, report.MIN_Q, sales.prod As MIN_PROD, 
		sales.month As MIN_MONTH, sales.day As MIN_DAY, sales.year As MIN_YEAR,
		sales.state As MIN_ST, report.MAX_Q, report.AVG_Q
	from sales,report
	where sales.cust=report.cust and sales.quant=report.MIN_Q)
SELECT MINQUANT.cust As Customer, MINQUANT.MIN_Q, MINQUANT.MIN_PROD, 
		MINQUANT.MIN_MONTH, MINQUANT.MIN_DAY, MINQUANT.MIN_YEAR, MINQUANT.MIN_ST As ST, 
		MINQUANT.MAX_Q, sales.prod As MAX_PROD, 
		sales.month As MAX_MONTH, sales.day As MAX_DAY, sales.year As MAX_YEAR, 
		sales.state As MAX_ST,
		ROUND(MINQUANT.AVG_Q) As AVG_Q
from sales,MINQUANT
where sales.cust=MINQUANT.cust and sales.quant=MINQUANT.MAX_Q;