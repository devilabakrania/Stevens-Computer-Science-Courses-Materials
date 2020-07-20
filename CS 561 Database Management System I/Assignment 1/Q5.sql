--Query #5
WITH nj_sales As
(
	SELECT cust As Customer, prod As Product, quant As nj_max, day As nj_day, month As nj_month, year As nj_year
	from sales s
	where quant = (SELECT MAX(quant) 
				   from sales 
				   where state = 'NJ' and (cust,prod) = (s.cust, s.prod))
),  ny_sales As
(
	SELECT cust As Customer, prod As Product, quant As ny_max, day As ny_day, month As ny_month, year As ny_year
	from sales s
	where quant = (SELECT MAX(quant) 
				   from sales 
				   where state = 'NY'and (cust,prod) = (s.cust,s.prod))
), ct_sales As
(	
	SELECT cust As Customer, prod As Product, quant As ct_max, day As ct_day, month As ct_month, year As ct_year
	from sales s
	where quant = (select MAX(quant) 
				   from sales 
				   where state = 'CT' and (cust,prod)= (s.cust,s.prod))
	)
	SELECT * from nj_sales NATURAL FULL JOIN ny_sales NATURAL FULL JOIN ct_sales
	WHERE ny_max > nj_max or ny_max > ct_max
	ORDER BY CUSTOMER, PRODUCT;