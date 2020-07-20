--Query #2

WITH query2 As (
	select day,month,sum(quant)as sum_q
	from sales 
	group by day,month),
MAXIMUM_MINIMUM As (
	SELECT max(sum_q)As MOST_PROFIT_TOTAL_Q,min(sum_q) as LEAST_PROFIT_TOTAL_Q,month
	from query2
	group by month),
MAX As(
	SELECT  MAXIMUM_MINIMUM.month, MAXIMUM_MINIMUM.MOST_PROFIT_TOTAL_Q, MAXIMUM_MINIMUM.LEAST_PROFIT_TOTAL_Q, query2.day as MOST_PROFIT_DAY
	from MAXIMUM_MINIMUM, query2
	where MAXIMUM_MINIMUM.month=query2.month and query2.sum_q=MAXIMUM_MINIMUM.MOST_PROFIT_TOTAL_Q)
SELECT  MAX.month, MAX.MOST_PROFIT_DAY, MAX.MOST_PROFIT_TOTAL_Q, query2.day as LEAST_PROFIT_DAY, MAX.LEAST_PROFIT_TOTAL_Q
from MAX, query2
where MAX.month=query2.month and MAX.LEAST_PROFIT_TOTAL_Q=query2.sum_q
order by MAX.month;