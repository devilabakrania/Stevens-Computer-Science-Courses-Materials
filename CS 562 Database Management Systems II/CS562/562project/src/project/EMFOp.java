package project;
import java.sql.*;
import java.util.*;
import java.io.*;

/**Auto-generated File! 
**/

class dbTuple{
	String	prod;
	int	month;
	int	year;
	String	state;
	int	quant;
	String	cust;
	int	day;
}

class MF_structure{
	String	cust;
	String	prod;
	int	month;
	int	sum_quant_1;
	int	count_quant_1;
	int	sum_quant_2;
	int	count_quant_2;
	void output(){
		System.out.printf("\t"+cust);
		System.out.printf("\t"+prod);
		System.out.printf("\t"+month);
		if (count_quant_1 == 0)
			System.out.printf("\t0");
		else
			System.out.printf("\t"+sum_quant_1/count_quant_1);
		if (count_quant_2 == 0)
			System.out.printf("\t0");
		else
			System.out.printf("\t"+sum_quant_2/count_quant_2);
		System.out.printf("\n");
	}
}

class EMFOutput {
	String usr ="postgres";
	String pwd ="1234";
	String url = "jdbc:postgresql://localhost/project";
	ArrayList<MF_structure> result_list = new ArrayList<MF_structure>();
	int	sum_quant_1 = 0;
	int	count_quant_1 = 0;
	int	sum_quant_2 = 0;
	int	count_quant_2 = 0;

	public static void main(String[] args) {
		EMFOutput emf = new EMFOutput();
		emf.connect();
		emf.retrieve();
		emf.output();
	}
	public void connect(){
		try {
		Class.forName("org.postgresql.Driver");
		System.out.println("Success loading Driver!");
		} catch(Exception exception) {
		exception.printStackTrace();
		}
	}
	void retrieve(){
		try {
		Connection con = DriverManager.getConnection(url, usr, pwd);
		System.out.println("Success connecting server!");
		ResultSet rs;
		boolean more;
		Statement st = con.createStatement();
		String ret = "select * from sales";
		rs = st.executeQuery(ret);
		more=rs.next();
		while(more){
			dbTuple nextrow = new dbTuple();
			nextrow.prod = rs.getString("prod");
			nextrow.month = rs.getInt("month");
			nextrow.year = rs.getInt("year");
			nextrow.state = rs.getString("state");
			nextrow.quant = rs.getInt("quant");
			nextrow.cust = rs.getString("cust");
			nextrow.day = rs.getInt("day");
			sum_quant_1 += nextrow.quant;
			count_quant_1 ++;
			sum_quant_2 += nextrow.quant;
			count_quant_2 ++;
			if(true){
				boolean found = false;
				for (MF_structure temp : result_list){
					 if(compare(temp.cust,nextrow.cust) && compare(temp.prod,nextrow.prod) && compare(temp.month,nextrow.month)){
						found=true;
						break;
					}
				}
				if (found == false){
					MF_structure newrow = new MF_structure();
					newrow.cust = nextrow.cust;
					newrow.prod = nextrow.prod;
					newrow.month = nextrow.month;
					newrow.sum_quant_1 = 0;
					newrow.count_quant_1 = 0;
					newrow.sum_quant_2 = 0;
					newrow.count_quant_2 = 0;
					result_list.add(newrow);
				}
			}
			more=rs.next();
		}

		rs = st.executeQuery(ret);
		more=rs.next();
		while(more){
			dbTuple nextrow = new dbTuple();
			nextrow.prod = rs.getString("prod");
			nextrow.month = rs.getInt("month");
			nextrow.year = rs.getInt("year");
			nextrow.state = rs.getString("state");
			nextrow.quant = rs.getInt("quant");
			nextrow.cust = rs.getString("cust");
			nextrow.day = rs.getInt("day");
			if(true){
				for (MF_structure temp : result_list){
					if (nextrow.cust.equals(temp.cust)&&nextrow.prod.equals(temp.prod)&&nextrow.month+1 == temp.month){
						temp.sum_quant_1 += nextrow.quant;
						temp.count_quant_1 ++;
					}
				}
			}
			more=rs.next();
		}

		rs = st.executeQuery(ret);
		more=rs.next();
		while(more){
			dbTuple nextrow = new dbTuple();
			nextrow.prod = rs.getString("prod");
			nextrow.month = rs.getInt("month");
			nextrow.year = rs.getInt("year");
			nextrow.state = rs.getString("state");
			nextrow.quant = rs.getInt("quant");
			nextrow.cust = rs.getString("cust");
			nextrow.day = rs.getInt("day");
			if(true){
				for (MF_structure temp : result_list){
					if (nextrow.cust.equals(temp.cust)&&nextrow.prod.equals(temp.prod)&&nextrow.month-1 == temp.month){
						temp.sum_quant_2 += nextrow.quant;
						temp.count_quant_2 ++;
					}
				}
			}
			more=rs.next();
		}

		}catch(Exception e) {
			System.out.println("errors!");
			e.printStackTrace();
		}
	}
	void output(){
		for (MF_structure temp : result_list)
			temp.output();
	}
	boolean compare(String s1, String s2){
		return s1.equals(s2);
	}
	boolean compare(int i1, int i2){
		return (i1 == i2);
	}
}
		
		
		
		
		
