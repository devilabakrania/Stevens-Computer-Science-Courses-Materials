package project;

import java.io.File;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

/**
 *
 */
public class EMFCode {
	public static void codeEMF(HashMap<String, String> dataType) {
		try {

			Main_class mc = new Main_class();
//				File output= new File("/Users/devilabakrania/git/cs562/562project/src/project/EMFOp.java");
			File output = new File("/Users/vyom/git/cs562/562project/src/project/EMFOp.java");
			PrintWriter writer = new PrintWriter(output);

			writer.print("package project;\n");
			writer.print("import java.sql.*;\n");
			writer.print("import java.util.*;\n");
			writer.print("import java.io.*;\n");
			writer.print("\n");
			writer.print("/**Auto-generated File! \n");
			writer.print("**/\n\n");

			// Generate dbTuple Class
			writer.print("class dbTuple{\n");
			for (Map.Entry<String, String> entry : dataType.entrySet())
				writer.print("\t" + entry.getValue() + "\t" + entry.getKey() + ";\n");
			writer.print("}\n\n");

			// Generate MF Structure Class
			writer.print("class MF_structure{\n");
			for (String value : mc.getGroupby())
				writer.print("\t" + dataType.get(value) + "\t" + value + ";\n");

			for (GroupVariable value : mc.getFvect()) {
				if (value.aggregate.equals("avg")) {
					writer.print("\t" + dataType.get(value.attribute) + "\tsum_" + value.attribute + "_" + value.index
							+ ";\n");
					writer.print("\t" + dataType.get(value.attribute) + "\tcount_" + value.attribute + "_" + value.index
							+ ";\n");
				} else
					writer.print("\t" + dataType.get(value.attribute) + "\t" + value.getString() + ";\n");
			}
			writer.print("\tvoid output(){\n");
			boolean found = false;
			for (String value : mc.getGroupby()) {
				if (found == false) {
					writer.print("\t\tSystem.out.printf(\"\\t\"+" + value + ");\n");
					found = true;
				} else if (found == true)
					writer.print("\t\tSystem.out.printf(\"\\t\"+" + value + ");\n");
			}

			for (GroupVariable value : mc.getFvect()) {
				if (value.aggregate.equals("avg")) {
					writer.print("\t\tif (count_" + value.attribute + "_" + value.index + " == 0)\n");
					writer.print("\t\t\tSystem.out.printf(\"\\t0\");\n");
					writer.print("\t\telse\n");
					writer.print("\t\t\tSystem.out.printf(\"\\t\"+sum_" + value.attribute + "_" + value.index
							+ "/count_" + value.attribute + "_" + value.index + ");\n");
				} else if (value.aggregate.equals("max")) {
					writer.print("\t\tif (" + value.getString() + " == 0)\n");
					writer.print("\t\t\tSystem.out.printf(\"\\t0\");\n");
					writer.print("\t\telse\n");
					writer.print("\t\t\tSystem.out.printf(\"\\t\"+" + value.getString() + ");\n");
				} else if (value.aggregate.equals("min")) {
					writer.print("\t\tif (" + value.getString() + " == Integer.MAX_VALUE)\n");
					writer.print("\t\t\tSystem.out.printf(\"\\t0\");\n");
					writer.print("\t\telse\n");
					writer.print("\t\t\tSystem.out.printf(\"\\t\"+" + value.getString() + ");\n");
				} else
					writer.print("\t\tSystem.out.printf(\"\\t\"+" + value.getString() + ");\n");
			}
			writer.print("\t\tSystem.out.printf(\"\\n\");\n");
			writer.print("\t}\n");
			writer.print("}\n\n");

			// Output main class
			writer.print("class EMFOutput {\n");
			writer.print("\tString usr =\"postgres\";\n");
			writer.print("\tString pwd =\"1234\";\n");
			writer.print("\tString url = \"jdbc:postgresql://localhost/project\";\n");
			// private static final String url="jdbc:postgres://localhost:51314/project";
			writer.print("\tArrayList<MF_structure> result_list = new ArrayList<MF_structure>();\n");

			// Define the aggregate function with index 0
			if (mc.getFvect().size() > 0) {
				for (GroupVariable value : mc.getFvect()) {
					if (value.aggregate.equals("avg")) {
						writer.print("\t" + dataType.get(value.attribute) + "\tsum_" + value.attribute + "_"
								+ value.index + " = 0;\n");
						writer.print("\t" + dataType.get(value.attribute) + "\tcount_" + value.attribute + "_"
								+ value.index + " = 0;\n");
					} else
						writer.print("\t" + dataType.get(value.attribute) + "\t" + value.aggregate + "_"
								+ value.attribute + "_" + value.index + " = 0;\n");
				}
			}
			// outputMain(output);
			writer.print("\n\tpublic static void main(String[] args) {\n");
			writer.print("\t\tEMFOutput emf = new EMFOutput();\n");
			writer.print("\t\temf.connect();\n");
			writer.print("\t\temf.retrieve();\n");
			writer.print("\t\temf.output();\n\t}\n");

			writer.print("\tpublic void connect(){\n");
			writer.print("\t\ttry {\n");
			writer.print("\t\tClass.forName(\"org.postgresql.Driver\");\n");
			writer.print("\t\tSystem.out.println(\"Success loading Driver!\");\n");
			writer.print("\t\t} catch(Exception exception) {\n");
			writer.print("\t\texception.printStackTrace();\n");
			writer.print("\t\t}\n\t}\n");

			// Output retrieve method
			outputRetriveMethod(writer, dataType);

			// Generating compare method
			writer.print("\tboolean compare(String s1, String s2){\n");
			writer.print("\t\treturn s1.equals(s2);\n\t}\n");
			writer.print("\tboolean compare(int i1, int i2){\n");
			writer.print("\t\treturn (i1 == i2);\n\t}\n");
			writer.print("}\n");
			writer.print("\t\t\n");
			writer.print("\t\t\n");
			writer.print("\t\t\n");
			writer.print("\t\t\n");
			writer.print("\t\t\n");
			writer.close();
		} catch (Exception e) {
			System.out.println("Error occurred:" + e);
			e.printStackTrace();
		}
	}

	private static void outputRetriveMethod(PrintWriter writer, HashMap<String, String> dataType) {
		Main_class mc = new Main_class();
		writer.print("\tvoid retrieve(){\n");
		writer.print("\t\ttry {\n");
		writer.print("\t\tConnection con = DriverManager.getConnection(url, usr, pwd);\n");
		writer.print("\t\tSystem.out.println(\"Success connecting server!\");\n");
		writer.print("\t\tResultSet rs;\n");
		writer.print("\t\tboolean more;\n");
		writer.print("\t\tStatement st = con.createStatement();\n");
		writer.print("\t\tString ret = \"select * from sales\";\n");
		// first while loop add value to aggregate with index 0 and add grouping
		// variables to the list
		writer.print("\t\trs = st.executeQuery(ret);\n");
		writer.print("\t\tmore=rs.next();\n");
		writer.print("\t\twhile(more){\n");
		writer.print("\t\t\tdbTuple nextrow = new dbTuple();\n");
		for (Map.Entry<String, String> entry : dataType.entrySet()) {
			if (entry.getValue().equals("String"))
				writer.print("\t\t\tnextrow." + entry.getKey() + " = rs.getString(\"" + entry.getKey() + "\");\n");
			if (entry.getValue().equals("int"))
				writer.print("\t\t\tnextrow." + entry.getKey() + " = rs.getInt(\"" + entry.getKey() + "\");\n");
		}
		if (mc.getFvect().size() > 0) {
			for (GroupVariable value : mc.getFvect()) {
				if (value.aggregate.equals("sum"))
					writer.print("\t\t\t" + value.getString() + " += nextrow." + value.attribute + ";\n");
				else if (value.aggregate.equals("max"))
					writer.print("\t\t\t" + value.getString() + " = (" + value.getString() + "< nextrow."
							+ value.attribute + ") ? nextrow." + value.attribute + " : " + value.getString() + ";\n");
				else if (value.aggregate.equals("min"))
					writer.print("\t\t\t" + value.getString() + " = (" + value.getString() + "> nextrow."
							+ value.attribute + ") ? nextrow." + value.attribute + " : " + value.getString() + ";\n");
				else if (value.aggregate.equals("count"))
					writer.print("\t\t\t" + value.getString() + " ++;\n");
				else if (value.aggregate.equals("avg")) {
					writer.print("\t\t\tsum_" + value.attribute + "_" + value.index + " += nextrow." + value.attribute
							+ ";\n");
					writer.print("\t\t\tcount_" + value.attribute + "_" + value.index + " ++;\n");
				}
			}
		}
		boolean flag = false;
		writer.print("\t\t\tif(");
		if (mc.getSizeWhere() == 0)
			writer.print("true");
		else {
			for (String temp : mc.getWhere()) {
				if (flag == false) {
					writer.print(temp);
					flag = true;
				} else if (flag == true)
					writer.print(" && " + temp);
			}
		}
		writer.print("){\n");
		writer.print("\t\t\t\tboolean found = false;\n");
		writer.print("\t\t\t\tfor (MF_structure temp : result_list){\n");

		// Finding if the grouping attributes are already in the list
		writer.print("\t\t\t\t\t if(compare(temp.");
		flag = false;
		for (String value : mc.getGroupby()) {
			if (flag == false) {
				writer.print(value + ",nextrow." + value + ")");
				flag = true;
			} else if (flag == true)
				writer.print(" && compare(temp." + value + ",nextrow." + value + ")");
		}
		flag = false;
		writer.print("){\n");
		writer.print("\t\t\t\t\t\tfound=true;\n");
		writer.print("\t\t\t\t\t\tbreak;\n");
		writer.print("\t\t\t\t\t}\n");
		writer.print("\t\t\t\t}\n");
		writer.print("\t\t\t\tif (found == false){\n");
		writer.print("\t\t\t\t\tMF_structure newrow = new MF_structure();\n");
		for (String value : mc.getGroupby())
			writer.print("\t\t\t\t\tnewrow." + value + " = nextrow." + value + ";\n");

		for (GroupVariable value : mc.getFvect()) {
			if (value.aggregate.equals("avg")) {
				writer.print("\t\t\t\t\tnewrow.sum_" + value.attribute + "_" + value.index + " = 0;\n");
				writer.print("\t\t\t\t\tnewrow.count_" + value.attribute + "_" + value.index + " = 0;\n");
			}
			if (value.aggregate.equals("sum") || value.aggregate.equals("max"))
				writer.print("\t\t\t\t\tnewrow." + value.getString() + " = 0;\n");
			if (value.aggregate.equals("min"))
				writer.print("\t\t\t\t\tnewrow." + value.getString() + " = Integer.MAX_VALUE;\n");
			if (value.aggregate.equals("count"))
				writer.print("\t\t\t\t\tnewrow." + value.getString() + " = 0;\n");
		}
		writer.print("\t\t\t\t\tresult_list.add(newrow);\n");
		writer.print("\t\t\t\t}\n");
		writer.print("\t\t\t}\n");
		writer.print("\t\t\tmore=rs.next();\n");
		writer.print("\t\t}\n\n");

		// Generating core code
		for (int i = 1; i <= mc.getNumber(); i++) {
			writer.print("\t\trs = st.executeQuery(ret);\n");
			writer.print("\t\tmore=rs.next();\n");
			writer.print("\t\twhile(more){\n");
			// Getting each tuple from the database
			writer.print("\t\t\tdbTuple nextrow = new dbTuple();\n");
			for (Map.Entry<String, String> entry : dataType.entrySet()) {
				if (entry.getValue().equals("String"))
					writer.print("\t\t\tnextrow." + entry.getKey() + " = rs.getString(\"" + entry.getKey() + "\");\n");
				if (entry.getValue().equals("int"))
					writer.print("\t\t\tnextrow." + entry.getKey() + " = rs.getInt(\"" + entry.getKey() + "\");\n");
			}

			flag = false;
			writer.print("\t\t\tif(");
			if (mc.getSizeWhere() == 0)
				writer.print("true");
			else {
				for (String value : mc.getWhere()) {
					if (flag == false) {
						writer.print(value);
						flag = true;
					} else if (flag == true)
						writer.print(" && " + value);
				}
			}
			flag = false;
			writer.print("){\n");
			writer.print("\t\t\t\tfor (MF_structure temp : result_list){\n");

			writer.print("\t\t\t\t\tif (");
			for (ST value : mc.getSuchthat()) {
				if (value.index == i && flag == false) {
					flag = true;
					writer.print(value.attribute);
				} else if (value.index == i && flag == true)
					writer.print("&&" + value.attribute);
			}
			if (flag == false)
				writer.print("true");
			flag = false;
			writer.print("){\n");
			for (GroupVariable value : mc.getFvect()) {
				if (Integer.parseInt(value.index) == i) {
					if (value.aggregate.equals("avg")) {
						writer.print("\t\t\t\t\t\ttemp.sum_" + value.attribute + "_" + value.index + " += nextrow."
								+ value.attribute + ";\n");
						writer.print("\t\t\t\t\t\ttemp.count_" + value.attribute + "_" + value.index + " ++;\n");
					}
					if (value.aggregate.equals("sum"))
						writer.print(
								"\t\t\t\t\t\ttemp." + value.getString() + " += nextrow." + value.attribute + ";\n");
					if (value.aggregate.equals("max"))
						writer.print("\t\t\t\t\t\ttemp." + value.getString() + " = (temp." + value.getString()
								+ "< nextrow." + value.attribute + ") ? nextrow." + value.attribute + " :temp."
								+ value.getString() + ";\n");
					if (value.aggregate.equals("min"))
						writer.print("\t\t\t\t\ttemp." + value.getString() + " = (temp." + value.getString()
								+ "> nextrow." + value.attribute + ") ? nextrow." + value.attribute + " :temp."
								+ value.getString() + ";\n");
					if (value.aggregate.equals("count"))
						writer.print("\t\t\t\t\t\ttemp." + value.getString() + " ++;\n");
				}
			}
			writer.print("\t\t\t\t\t}\n");
			writer.print("\t\t\t\t}\n");
			writer.print("\t\t\t}\n");
			writer.print("\t\t\tmore=rs.next();\n");
			writer.print("\t\t}\n\n");
		}
		writer.print("\t\t}catch(Exception e) {\n");
		writer.print("\t\t\tSystem.out.println(\"errors!\");\n");
		writer.print("\t\t\te.printStackTrace();\n");
		writer.print("\t\t}\n");
		writer.print("\t}\n");
		writer.print("\tvoid output(){\n");
		writer.print("\t\tfor (MF_structure temp : result_list)\n");
		writer.print("\t\t\ttemp.output();\n");
		writer.print("\t}\n");
	}
}
