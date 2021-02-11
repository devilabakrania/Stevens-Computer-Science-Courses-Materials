package project;
import java.sql.*;
import java.util.*;
public class MF {
	//Variables to connect to DB
	private static final String usr = "postgres";
	private static final String pwd = "1234";
	private static final String url = "jdbc:postgresql://localhost/project";
	//Variables to generate the output
	List<Result> output_attributes = new ArrayList<Result>();
	List<MF_Structure> mfStruct = new ArrayList<MF_Structure>();

	 /** 
	 * This class contains the DB schema 
	 */ 
	public class DBStruct{
		String prod;
		int month;
		int year;
		String state;
		int quant;
		String cust;
		int day;
	}

	 /** 
	 *  Selection attributes 
	 */ 
	public class Result{
		String cust;
		String prod;
		int sum_quant_1;
		int sum_quant_2;
		int sum_quant_3;
	}

	 /** 
	 * f-vect attributes 
	 * and group by attribues 
	 */ 
	public class MF_Structure{
		String cust;
		String prod;
		int sum_quant_1;
		int sum_quant_2;
		int sum_quant_3;
	}

	 /** 
	 * The Main method 
	 */ 
	public static void main(String [] args){

		MF mf = new MF();
		try {
			Class.forName("org.postgresql.Driver");
			System.out.println("Success loading Driver!");
		} catch(Exception exception) {
		exception.printStackTrace();
		}
		mf.retrive();

		mf.addToOutput();

		mf.outputTable();
	}

	 /** 
	 * Data set 
	 */ 
	public void retrive(){
		try {
			Connection con = DriverManager.getConnection(url, usr, pwd);
			ResultSet result_set;
			boolean more;
			Statement st = con.createStatement();
			String query = "select * from sales";


			 /** 
			 * Generating while loops for each grouping variable. 
			 */ 

			//While loop for grouping variable 1.
			result_set = st.executeQuery(query);
			more = result_set.next();
			while(more){
				DBStruct currentRow = new DBStruct();
				currentRow.prod = result_set.getString("prod");
				currentRow.month = result_set.getInt("month");
				currentRow.year = result_set.getInt("year");
				currentRow.state = result_set.getString("state");
				currentRow.quant = result_set.getInt("quant");
				currentRow.cust = result_set.getString("cust");
				currentRow.day = result_set.getInt("day");
				if(true){
					if (currentRow.state.equals("NY")){
						boolean found = false;
						for(MF_Structure row: mfStruct){
							if(compare(row.cust,currentRow.cust) && compare(row.prod,currentRow.prod)){
								found = true;
								row.sum_quant_1 += currentRow.quant;
							}
						}
						if(found == false){
							MF_Structure addCurrentRow = new MF_Structure();
							addCurrentRow.cust = currentRow.cust;
							addCurrentRow.prod = currentRow.prod;
							addCurrentRow.sum_quant_1 = currentRow.quant;
							mfStruct.add(addCurrentRow);
						}
					}
				}
				more = result_set.next();
			}

			//While loop for grouping variable 2.
			result_set = st.executeQuery(query);
			more = result_set.next();
			while(more){
				DBStruct currentRow = new DBStruct();
				currentRow.prod = result_set.getString("prod");
				currentRow.month = result_set.getInt("month");
				currentRow.year = result_set.getInt("year");
				currentRow.state = result_set.getString("state");
				currentRow.quant = result_set.getInt("quant");
				currentRow.cust = result_set.getString("cust");
				currentRow.day = result_set.getInt("day");
				if(true){
					if (currentRow.state.equals("NJ")){
						boolean found = false;
						for(MF_Structure row: mfStruct){
							if(compare(row.cust,currentRow.cust) && compare(row.prod,currentRow.prod)){
								found = true;
								row.sum_quant_2 += currentRow.quant;
							}
						}
						if(found == false){
							MF_Structure addCurrentRow = new MF_Structure();
							addCurrentRow.cust = currentRow.cust;
							addCurrentRow.prod = currentRow.prod;
							addCurrentRow.sum_quant_2 = currentRow.quant;
							mfStruct.add(addCurrentRow);
						}
					}
				}
				more = result_set.next();
			}

			//While loop for grouping variable 3.
			result_set = st.executeQuery(query);
			more = result_set.next();
			while(more){
				DBStruct currentRow = new DBStruct();
				currentRow.prod = result_set.getString("prod");
				currentRow.month = result_set.getInt("month");
				currentRow.year = result_set.getInt("year");
				currentRow.state = result_set.getString("state");
				currentRow.quant = result_set.getInt("quant");
				currentRow.cust = result_set.getString("cust");
				currentRow.day = result_set.getInt("day");
				if(true){
					if (currentRow.state.equals("CT")){
						boolean found = false;
						for(MF_Structure row: mfStruct){
							if(compare(row.cust,currentRow.cust) && compare(row.prod,currentRow.prod)){
								found = true;
								row.sum_quant_3 += currentRow.quant;
							}
						}
						if(found == false){
							MF_Structure addCurrentRow = new MF_Structure();
							addCurrentRow.cust = currentRow.cust;
							addCurrentRow.prod = currentRow.prod;
							addCurrentRow.sum_quant_3 = currentRow.quant;
							mfStruct.add(addCurrentRow);
						}
					}
				}
				more = result_set.next();
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	 /** 
	 * These are comapare methods to compare two string values orinteger values. 
	 * @return boolean true if same or else false. 
	 */ 
	boolean compare(String str1, String str2){
		return str1.equals(str2);
	}
	boolean compare(int num1, int num2){
		return (num1 == num2);
	}

	 /** 
	 * filtering output data if having conditions exist. 
	 */ 
	public void addToOutput(){
		for(MF_Structure ms: mfStruct){
			Result ra = new Result();
				ra.cust = ms.cust;
				ra.prod = ms.prod;
			if(( ms.sum_quant_1 > ms.sum_quant_2) && ( ms.sum_quant_1 > ms.sum_quant_2) && (ms.sum_quant_1 > ms.sum_quant_3)){
				ra.sum_quant_1 = ms.sum_quant_1;
				ra.sum_quant_2 = ms.sum_quant_2;
				ra.sum_quant_3 = ms.sum_quant_3;
			}
			output_attributes.add(ra);
		}
	}

	 /** 
	 * This method will create format for outputting the data table. 
	 */ 
	public void outputTable(){
		System.out.printf("%-4s","cust\t");
		System.out.printf("%-4s","prod\t");
		System.out.printf("%-11s","sum_quant_1\t");
		System.out.printf("%-11s","sum_quant_2\t");
		System.out.printf("%-11s","sum_quant_3\t");
		System.out.printf("\n");
		System.out.printf("====\t====\t===========\t===========\t===========\t ");
		for(Result ra: output_attributes){
			System.out.printf("\n");
			System.out.printf("%-4s\t", ra.cust);
			System.out.printf("%-4s\t", ra.prod);
			System.out.printf("%11s\t", ra.sum_quant_1);
			System.out.printf("%11s\t", ra.sum_quant_2);
			System.out.printf("%11s\t", ra.sum_quant_3);
		}
	}
}
