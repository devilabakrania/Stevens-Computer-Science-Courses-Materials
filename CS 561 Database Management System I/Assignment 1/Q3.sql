--Query #3

CREATE VIEW report3 As
	SELECT prod, SUM(quant) As SUM_Q, month
	from sales
	group by prod, month
	ORDER BY MONTH, prod;
 
CREATE VIEW query3 As
	SELECT MAX(SUM_Q) as MAX_Q, MIN(SUM_Q) As MIN_Q, prod
	from report3
	group by prod;

WITH MAX_Q As(
	SELECT report3.prod,query3.MAX_Q,report3.month As MOST_FAV_MO,query3.MIN_Q
	from report3, query3
	WHERE report3.SUM_Q=query3.MAX_Q and report3.prod=query3.prod)
	
SELECT MAX_Q.prod,MAX_Q.max_q,MAX_Q.MOST_FAV_MO,MAX_Q.MIN_Q,report3.month As LEAST_FAV_MO
from report3,MAX_Q
WHERE report3.prod=MAX_Q.prod and report3.SUM_Q=MAX_Q.MIN_Q;