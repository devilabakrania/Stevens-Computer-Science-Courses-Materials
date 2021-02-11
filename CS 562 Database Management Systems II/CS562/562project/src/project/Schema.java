package project;

import java.io.PrintWriter;
import java.sql.*;
import java.util.HashMap;

/**
 *
 */
public class Schema {
	private static final String usr = "postgres";
	private static final String password = "1234";
	private static final String url = "jdbc:postgresql://localhost/project";
	private static HashMap<String, String> dataType = new HashMap<String, String>();

	public static HashMap<String, String> getSchema() {
		try {
			Connection con = DriverManager.getConnection(url, usr, password);
			System.out.println("Connection successful");

			ResultSet resultSet;
			boolean more;
			Statement st = con.createStatement();

			String query = "select data_type, column_name from information_schema.columns where table_name= 'sales'";
			resultSet = st.executeQuery(query);
			more = resultSet.next();
			while (more) {
				if (resultSet.getString("data_type").contains("character")) {
					dataType.put(resultSet.getString("column_name"), "String");
				} else {
					dataType.put(resultSet.getString("column_name"), "int");

				}
				more = resultSet.next();
			}

		} catch (SQLException e) {
			System.out.println("Connection error");
			e.printStackTrace();
		}
		return dataType;

	}

}
