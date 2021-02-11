/*
 * Homework 6
 * @author Devila Bakrania
 * CWID: 10457590
 */
import java.util.*;
import java.io.*;
/**
 * 
 * Below Class represents the Anagrams
 *
 */
public class Anagrams {
	final Integer[] primes={2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101};
	 Map<Character,Integer> letterTable;
	 Map<Long,ArrayList<String>> anagramTable;
	 //Use Constructor - Constructs Anagram class and initializes class variables
	public Anagrams() {
	 //Constructor is invoking buildLetterTable method
		buildLetterTable();
		anagramTable = new HashMap<Long,ArrayList<String>>();	
	}
	/**
	 *Build letter table for hashing using a to z letters and prime array
	 */
	private void buildLetterTable() {
	    letterTable= new HashMap<Character,Integer>();
	    Character[] alphabets= {'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};
	    for(int i = 0; i < 26; i++) 
			letterTable.put(alphabets[i], primes[i]);
	} 
	//Compute the hash code and add word in hash table
	/**
	 * 
	 * @param s - Add words in string format
	 * @throws IllegalArgumentException
	 */
	 private void addWord(String s) throws IllegalArgumentException {	
			if(s == null || s.length() == 0) 
				throw new IllegalArgumentException();
			Long hashCode = myHashCode(s);
			if(anagramTable.containsKey(hashCode))
				anagramTable.get(hashCode).add(s);
			else {
				ArrayList<String> a = new ArrayList<String>();
				a.add(s);
				anagramTable.put(hashCode, a);
			}
	}
	 /**
	  * Calculates and provides hashcode forgiven string
	  * @param s - String for whcih hashcode is calculated
	  * @return
	  * @throws IllegalArgumentException
	  */	
	private Long myHashCode(String s) throws IllegalArgumentException {
		long hashCode=1;
		try {
		for(int j=0; j<s.length(); j++) 
			hashCode= hashCode*(long)letterTable.get(s.charAt(j));
		}
		catch(NullPointerException e) {
			throw new IllegalArgumentException("Lowercase letters only are allowed in the string");
		}
		return hashCode;
	}
	/**
	 * Process the file present in the project folder
	 * @param s - name of file in string format
	 * @throws IOException
	 */
	private void processFile(String s) throws IOException {
		FileInputStream fStream = new FileInputStream(s);
		BufferedReader br = new BufferedReader(new InputStreamReader(fStream));
       String strLine;
       while((strLine = br.readLine()) != null) {
			this.addWord(strLine);
		}
		br.close();
	}
	//Function returns entries with largest number of anagram
   private ArrayList<Map.Entry<Long,ArrayList<String>>> getMaxEntries() {
		ArrayList<Map.Entry<Long,ArrayList<String>>> lists = new ArrayList<>(); 
		int max = 0;
		for (Map.Entry<Long,ArrayList<String>> entry : anagramTable.entrySet()) {
		  if(entry.getValue().size() > max) {
				lists.clear();
				lists.add(entry);
				max = entry.getValue().size();
			} 
		  else if(entry.getValue().size() == max)
				lists.add(entry);
		}
		 return lists;	 
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Anagrams a = new Anagrams();
		final long startTime = System.nanoTime();
		try {
			a.processFile ("words_alpha.txt");
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		ArrayList<Map.Entry<Long, ArrayList<String>>> maxEntries = a.getMaxEntries ();
		long hashCode = maxEntries.get(0).getKey();
		int length = maxEntries.get(0).getValue().size();
		final long estimatedTime = System.nanoTime() - startTime ;
		final double seconds = ((double)estimatedTime/1000000000);
		System.out.println("Elapsed Time : "+ seconds);
		System.out.println("Key of max anagrams: "+ hashCode);
		System.out.println("List of max anagrams: " + maxEntries.get(0).getValue());
		System.out.println("Length of list of max anagrams : "+ length);
	}
}
