package project;

import java.io.File;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * MFCode class to generate MF.java file
 *
 */
public class MFCode {

	/**
	 * First method of the code, where execution begins
	 * 
	 * @param dataType
	 */
	public static void codeMF(HashMap<String, String> dataType) {
		try {
			File output = new File("/Users/vyom/git/cs562/562project/src/project/MF.java");
			PrintWriter writer = new PrintWriter(output);
			writer.print("package project;\n");
			writer.print("import java.sql.*;\n");
			writer.print("import java.util.*;\n");
			// creating main class
			writer.print("public class MF {\n");
			writer.print("\t//Variables to connect to DB\n");
			writer.print("\tprivate static final String usr = \"postgres\";\n"
					+ "	private static final String pwd = \"1234\";\n"
					+ "	private static final String url = \"jdbc:postgresql://localhost/project\";\n");

			writer.print("\t//Variables to generate the output\n");
			writer.print("\tList<Result> output_attributes = new ArrayList<Result>();\n");
			writer.print("\tList<MF_Structure> mfStruct = new ArrayList<MF_Structure>();\n");
			writer.print("\n");
			// Generate DataBase Structure of sales table
			writer.print("\t /** \n\t * This class contains the DB schema \n\t */ \n");
			writer.print("\tpublic class DBStruct{\n");
			for (Map.Entry<String, String> entry : dataType.entrySet())
				writer.print("\t\t" + entry.getValue() + " " + entry.getKey() + ";\n");

			writer.print("\t}\n");

			// Generating select attributes
			writer.print("\n\t /** \n\t *  Selection attributes \n\t */ \n");
			Main_class mc = new Main_class();

			// Class Result
			writer.print("\tpublic class Result{\n");
			for (String str : mc.getSelect()) {
				if (dataType.get(str) != null) {
					writer.print("\t\t" + dataType.get(str) + " " + str + ";\n");
				} else {
					writer.print("\t\tint " + str + ";\n");
				}
			}
			writer.print("\t}\n");

			// generate f-vect and groupby attributes
			writer.print("\n\t /** \n\t * f-vect attributes \n\t * and group by attribues \n\t */ \n");
			List<String> added_elements = new ArrayList<String>();

			// Class MF_Structure
			writer.print("\tpublic class MF_Structure{\n");
			for (String str : mc.getGroupby()) {
				for (Map.Entry<String, String> entry : dataType.entrySet())
					if (str.equals(entry.getKey()))
						writer.print("\t\t" + entry.getValue() + " " + entry.getKey() + ";\n");
			}
			for (GroupVariable gv : mc.getFvect()) {
				if (gv.aggregate.equals("avg")) {
					String sum = "sum_" + gv.attribute + "_" + gv.index;
					String count = "count_" + gv.attribute + "_" + gv.index;
					if (!added_elements.contains(sum)) {
						added_elements.add(sum);
						writer.print("\t\tint" + " sum_" + gv.attribute + "_" + gv.index + ";\n");
					}
					if (!added_elements.contains(count)) {
						added_elements.add(count);
						writer.print("\t\tint" + " count_" + gv.attribute + "_" + gv.index + ";\n");
					}
					if (!added_elements.contains(gv.getString())) {
						writer.print("\t\tint " + gv.getString() + ";\n");
						added_elements.add(gv.getString());
					}

				} 
				else {
					if (!added_elements.contains(gv.getString())) {
						writer.print("\t\tint " + gv.getString() + ";\n");
						added_elements.add(gv.getString());
					}
				}
			}
			writer.print("\t}\n");
			// Writing the main method in the output file.
			writer.print("\n\t /** \n\t * The Main method \n\t */ \n");
			writer.print("\tpublic static void main(String [] args){\n");

			writer.print("\n\t\tMF mf = new MF();\n");
			writer.print("\t\ttry {\n");
			writer.print("\t\t\tClass.forName(\"org.postgresql.Driver\");\n");
			writer.print("\t\t\tSystem.out.println(\"Success loading Driver!\");\n");
			writer.print("\t\t} catch(Exception exception) {\n");
			writer.print("\t\texception.printStackTrace();\n");
			writer.print("\t\t}\n");
			writer.print("\t\tmf.retrive();\n\n");
			writer.print("\t\tmf.addToOutput();\n\n");
			writer.print("\t\tmf.outputTable();\n");
			writer.print("\t}\n");
			// Exection of main logic of the code
			writer.print("\n\t /** \n\t * Data set \n\t */ \n");
			writer.print("\tpublic void retrive(){\n");
			writer.print("\t\ttry {\n");
			writer.print("\t\t\tConnection con = DriverManager.getConnection(url, usr, pwd);\n");
			// Declaring variables
			writer.print("\t\t\tResultSet result_set;\n");
			writer.print("\t\t\tboolean more;\n");
			writer.print("\t\t\tStatement st = con.createStatement();\n");
			writer.print("\t\t\tString query = \"select * from sales\";\n");
			writer.print("\n");
			whileLoop(writer, mc, dataType);
			writer.print("\t\t}catch(Exception e) {\n");
			writer.print("\t\t\te.printStackTrace();\n");
			writer.print("\t\t}\n");
			writer.print("\t}\n");
			// Create compare Methods to check
			writer.print(
					"\n\t /** \n\t * These are comapare methods to compare two string values orinteger values. \n\t * @return boolean true if same or else false. \n\t */ \n");
			writer.print("\tboolean compare(String str1, String str2){\n");
			writer.print("\t\treturn str1.equals(str2);\n\t}\n");
			writer.print("\tboolean compare(int num1, int num2){\n");
			writer.print("\t\treturn (num1 == num2);\n\t}\n");
			// Create addToOutput to build result
			writer.print("\n\t /** \n\t * filtering output data if having conditions exist. \n\t */ \n");
			writer.print("\tpublic void addToOutput(){\n");
			writer.print("\t\tfor(MF_Structure ms: mfStruct){\n");
			writer.print("\t\t\tResult ra = new Result();\n");
			for (String str : mc.getGroupby())
				writer.print("\t\t\t\tra." + str + " = ms." + str + ";\n");
			writer.print("\t\t\tif(");
			// Declaring variable to set to true if the second having condition exists
			boolean isSecondHaving = false;

			// Putting the having condition in the output file for filtering the output.
			if (mc.getSizeHaving() != 0) {
				for (String str : mc.getHaving()) {
					if (str.contains("sum"))
						str = str.replace("sum", "ms.sum");
					if (str.contains("max"))
						str = str.replace("max", "ms.max");
					if (str.contains("count"))
						str = str.replace("count", "ms.count");
					if (str.contains("min"))
						str = str.replace("min", "ms.min");
					if (str.contains("avg"))
						str = str.replace("avg", "ms.avg");

					if (isSecondHaving == false) {
						writer.print("(" + str + ")");
						isSecondHaving = true;
					}
					if (isSecondHaving == true)
						writer.print(" && (" + str + ")");
				}
			}
			// If there is no having condition put "true".
			else
				writer.print("true");
			writer.print("){\n");
			for (String str : mc.getSelect()) {
				for (GroupVariable gv : mc.getFvect()) {
					if (str.equals(gv.getString())) {
						writer.print("\t\t\t\tra." + gv.getString() + " = ms." + gv.getString() + ";\n");
					}
				}

			}

			writer.print("\t\t\t}\n");
			writer.print("\t\t\toutput_attributes.add(ra);\n");
			writer.print("\t\t}\n");
			writer.print("\t}\n");

			// Generate method to print output
			writer.print("\n\t /** \n\t * This method will create format for outputting the data table. \n\t */ \n");
			int length;
			writer.print("\tpublic void outputTable(){\n");

			for (String str : mc.getSelect()) {
				length = str.length();
				writer.print("\t\tSystem.out.printf(\"%-" + length + "s\",\"" + str + "\\t\");\n");
			}
			writer.print("\t\tSystem.out.printf(\"\\n\");\n");
			writer.print("\t\tSystem.out.printf(\"");
			for (String str : mc.getSelect()) {
				length = str.length();
				for (int i = 0; i < length; i++) {
					writer.print("=");
				}
				writer.print("\\t");
			}
			writer.print(" \");\n");
			writer.print("\t\tfor(Result ra: output_attributes){\n");
			writer.print("\t\t\tSystem.out.printf(\"\\n\");\n");
			for (String str : mc.getSelect()) {
				for (String str1 : mc.getGroupby()) {
					if (str.equals(str1)) {
						length = str.length();
						if (str.equals("month") || str.equals("year") || str.equals("days") || str.equals("quant")) {
							writer.print("\t\t\tSystem.out.printf(\"%" + length + "s\\t\", ra." + str + ");\n");
						} else {
							writer.print("\t\t\tSystem.out.printf(\"%-" + length + "s\\t\", ra." + str + ");\n");
						}

					}
				}
				for (GroupVariable fv : mc.getFvect()) {
					if (str.equals(fv.getString())) {
						length = str.length();
						writer.print("\t\t\tSystem.out.printf(\"%" + length + "s\\t\", ra." + str + ");\n");
					}
				}

			}
			writer.print("\t\t}\n");
			writer.print("\t}\n");
			writer.print("}\n");

			writer.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * The core logic of writing the while loops based on the number of grouping
	 * variables
	 * 
	 * @param writer
	 * @param mc
	 * @param dataType
	 */
	private static void whileLoop(PrintWriter writer, Main_class mc, HashMap<String, String> dataType) {
		// TODO Auto-generated method stub
		List<String> added_elements = new ArrayList<String>();
		List<String> updated_elements = new ArrayList<String>();

		// Generating number of while loops equal to number of Grouping variables.
		writer.print("\n\t\t\t /** \n\t\t\t * Generating while loops for each grouping variable. \n\t\t\t */ \n");
		for (int i = 0; i < mc.getNumber(); i++) {
			writer.print("\n\t\t\t//While loop for grouping variable " + (i + 1) + ".\n");
			writer.print("\t\t\tresult_set = st.executeQuery(query);\n");
			writer.print("\t\t\tmore = result_set.next();\n");
			writer.print("\t\t\twhile(more){\n");
			writer.print("\t\t\t\tDBStruct currentRow = new DBStruct();\n");
			for (Map.Entry<String, String> entry : dataType.entrySet()) {
				if (entry.getValue().equals("String")) {
					writer.print("\t\t\t\tcurrentRow." + entry.getKey() + " = result_set.getString(\"" + entry.getKey()
							+ "\");\n");
				} else if (entry.getValue().equals("int")) {
					writer.print("\t\t\t\tcurrentRow." + entry.getKey() + " = result_set.getInt(\"" + entry.getKey()
							+ "\");\n");
				}
			}

			boolean isSecondWhere = false;
			boolean isSecondSuchThat = false;
			boolean not = false;
			// Filtering data if it has where conditions and making necessary modifications
			// in case it encounters = operator
			writer.print("\t\t\t\tif(");
			if (mc.getSizeWhere() != 0) {
				for (String str : mc.getWhere()) {
					str = str.replace(" ", "");
					if (str.contains("<=") || str.contains(">=") || str.contains(">") || str.contains("<")
							|| str.contains("!=")) {
						str = str;
					} else if (str.contains("=")) {
						str = str.replace("=", "==");
					}

					if (str.contains("prod==") || str.contains("state==") || str.contains("cust==")) {
						String[] nameVal = str.split("=");
						str = str.replace(str, nameVal[0] + ".equals(\"" + nameVal[2] + "\")");
					}
					if (str.contains("prod!=") || str.contains("state!=") || str.contains("cust!=")) {
						not = true;
						String[] nameVal = str.split("!=");
						str = str.replace(str, nameVal[0] + ".equals(\"" + nameVal[1] + "\")");
					}
					if (isSecondWhere == false) {
						if (not == true) {
							writer.print("!currentRow." + str);
							isSecondWhere = true;
							not = false;
						} else {
							writer.print("currentRow." + str);
							isSecondWhere = true;
						}

					} else if (isSecondWhere == true) {
						if (not == true) {
							writer.print(" && !currentRow." + str);
							not = false;
						} else {
							writer.print(" && currentRow." + str);
						}

					}

				}
			} else {
				writer.print(true);
			}
			writer.print("){\n");

			// Putting the such that conditions if any.
			not = false;
			writer.print("\t\t\t\t\tif (");
			for (ST such_that : mc.getSuchthat()) {
				not = false;
				String str = such_that.getAttribute();
				str = str.replace(" ", "");
				if (str.contains("<=") || str.contains(">=") || str.contains(">") || str.contains("<")) {
					str = str;
				} else if (str.contains("=")) {
					str = str.replace("=", "==");
				}
				if (str.contains("prod==") || str.contains("state==") || str.contains("cust==")) {
					String[] nameVal = str.split("=");
					str = str.replace(str, nameVal[0] + ".equals(" + nameVal[2] + ")");
				}
				if (str.contains("prod!=") || str.contains("state!=") || str.contains("cust!=")) {
					not = true;
					String[] nameVal = str.split("!==");
					str = str.replace(str, nameVal[0] + ".equals(\"" + nameVal[1] + "\")");
				}
				if (such_that.getIndex() == i + 1 && isSecondSuchThat == false) {
					if (not == true) {
						isSecondSuchThat = true;
						writer.print("!currentRow." + str);
					} else {
						isSecondSuchThat = true;
						writer.print("currentRow." + str);
					}
				} else if (such_that.getIndex() == i + 1 && isSecondSuchThat == true) {
					if (not == true) {
						writer.print(" && !currentRow." + str);
					} else {
						writer.print(" && currentRow." + str);
					}
				}
			}
			if (isSecondSuchThat == false) {
				writer.print("true");
			}
			writer.print("){\n");
			writer.print("\t\t\t\t\t\tboolean found = false;\n");
			writer.print("\t\t\t\t\t\tfor(MF_Structure row: mfStruct){\n");
			boolean isSecondGroupByVariable = false;
			writer.print("\t\t\t\t\t\t\tif(compare(row.");
			for (String str : mc.getGroupby()) {
				if (isSecondGroupByVariable == false) {
					writer.print(str + ",currentRow." + str + ")");
					isSecondGroupByVariable = true;
				} else {
					writer.print(" && compare(row." + str + ",currentRow." + str + ")");
				}
			}
			writer.print("){\n");

			writer.print("\t\t\t\t\t\t\t\tfound = true;\n");

			// Outputting the aggregate functions if record is added already.
			for (GroupVariable gv : mc.getFvect()) {
				if (Integer.parseInt(gv.index) == i + 1) {
					if (gv.aggregate.equals("avg")) {
						String sum = "sum_" + gv.attribute + "_" + gv.index;
						String count = "count_" + gv.attribute + "_" + gv.index;
						if (!updated_elements.contains(sum)) {
							updated_elements.add(sum);
							writer.print("\t\t\t\t\t\t\t\trow." + sum + " += currentRow." + gv.attribute + ";\n");
						}
						if (!updated_elements.contains(count)) {
							updated_elements.add(count);
							writer.print("\t\t\t\t\t\t\t\trow." + count + " ++;\n");
						}
						if (!updated_elements.contains(gv.getString())) {
							updated_elements.add(gv.getString());
							writer.print("\t\t\t\t\t\t\t\tif(row." + count + " !=0){\n");
							writer.print("\t\t\t\t\t\t\t\t\trow." + gv.getString() + " = row." + sum + "/row." + count
									+ ";\n");
							writer.print("\t\t\t\t\t\t\t\t}\n");
						}

					}
					if (!updated_elements.contains(gv.getString()) && gv.aggregate.equals("sum")) {
						writer.print(
								"\t\t\t\t\t\t\t\trow." + gv.getString() + " += currentRow." + gv.attribute + ";\n");
						updated_elements.add(gv.getString());
					}
					if (!updated_elements.contains(gv.getString()) && gv.aggregate.equals("max")) {
						writer.print("\t\t\t\t\t\t\t\trow." + gv.getString() + " = (row." + gv.getString()
								+ "< currentRow." + gv.attribute + ") ? currentRow." + gv.attribute + " :row."
								+ gv.getString() + ";\n");
						updated_elements.add(gv.getString());
					}
					if (!updated_elements.contains(gv.getString()) && gv.aggregate.equals("min")) {
						writer.print("\t\t\t\t\t\t\t\trow." + gv.getString() + " = (row." + gv.getString()
								+ "> currentRow." + gv.attribute + ") ? currentRow." + gv.attribute + " :row."
								+ gv.getString() + ";\n");
						updated_elements.add(gv.getString());
					}
					if (!updated_elements.contains(gv.getString()) && gv.aggregate.equals("count")) {
						writer.print("\t\t\t\t\t\t\t\trow." + gv.getString() + "++;\n");
						updated_elements.add(gv.getString());
					}
				}
			}

			writer.print("\t\t\t\t\t\t\t}\n");
			writer.print("\t\t\t\t\t\t}\n");
			// If record is found for the first time
			writer.print("\t\t\t\t\t\tif(found == false){\n");
			writer.print("\t\t\t\t\t\t\tMF_Structure addCurrentRow = new MF_Structure();\n");
			for (String str : mc.getGroupby()) {
				writer.print("\t\t\t\t\t\t\taddCurrentRow." + str + " = currentRow." + str + ";\n");
			}
			for (GroupVariable gv : mc.getFvect()) {
				if (Integer.parseInt(gv.index) == i + 1) {
					if (gv.aggregate.equals("avg")) {
						String sum = "sum_" + gv.attribute + "_" + gv.index;
						String count = "count_" + gv.attribute + "_" + gv.index;
						if (!added_elements.contains(sum)) {
							added_elements.add(sum);
							writer.print("\t\t\t\t\t\t\taddCurrentRow." + "sum_" + gv.attribute + "_" + gv.index
									+ " = currentRow." + gv.attribute + ";\n");
						}
						if (!added_elements.contains(count)) {
							added_elements.add(count);
							writer.print("\t\t\t\t\t\t\taddCurrentRow." + "count_" + gv.attribute + "_" + gv.index
									+ "++;\n");
						}
						if (!added_elements.contains(gv.getString())) {
							added_elements.add(gv.getString());
							writer.print("\t\t\t\t\t\t\tif(addCurrentRow." + count + " !=0){\n");
							writer.print("\t\t\t\t\t\t\t\taddCurrentRow." + gv.getString() + " = addCurrentRow." + sum
									+ "/addCurrentRow." + count + ";\n");
							writer.print("\t\t\t\t\t\t\t}\n");
						}

					} else {
						if (!added_elements.contains(gv.getString())) {
							if (gv.aggregate.equals("count")) {
								writer.print("\t\t\t\t\t\t\taddCurrentRow." + "count_" + gv.attribute + "_" + gv.index
										+ "++;\n");
							} else {
								writer.print("\t\t\t\t\t\t\taddCurrentRow." + gv.getString() + " = currentRow."
										+ gv.attribute + ";\n");
							}
							added_elements.add(gv.getString());
						}

					}
				}

			}
			writer.print("\t\t\t\t\t\t\tmfStruct.add(addCurrentRow);\n");
			writer.print("\t\t\t\t\t\t}\n");
			writer.print("\t\t\t\t\t}\n");
			writer.print("\t\t\t\t}\n");
			writer.print("\t\t\t\tmore = result_set.next();\n");
			writer.print("\t\t\t}\n");

		}
	}

}
