/**
 * 
 */


/**
 * @author devilabakrania
 * Name: DEVILA BAKRANIA
 * CWID: 10457590
 * Course: CS-570
 *
 */
//package Ass1;

import java.util.Arrays;

//BinaryNumber Class
 
public class BinaryNumber {
	//defining field array
	private int data[];
	//defining field to check overflow value
	private boolean overflow;
	
	// Constructors
	public BinaryNumber(int length) {
		if(length > 0) {
			//Array values will be filled by default as 0
			data = new int[length]; }
			else {
				System.out.println("Please enter valid length!");
		}
	}
	
	//Constructs Binary Number String
	 
	public BinaryNumber(String str) {
		boolean check = true; //valid string checking by default is set to true
		int length = str.length(); //returns length of string
		for(int i = 0; i < length; i ++)
		{
			if(str.charAt(i) != '0' && str.charAt(i) != '1') {
				System.out.println("Not a Binary Number");
				check = false;
				break;
			}
			
		}
		if(check == true) {
			data = new int[length];
			for(int i = 0; i<length; i++) {
				if(str.charAt(i)=='1'){
					data[i] = 1;
					}
				else {
					data[i] = 0;
					}
			}
		}
	}	
	//Returns length of Binary Number
	public int getLength() {
		return data.length;
	}
	
	//Returns digit 0 or 1 
	public int getDigit(int index) {
		if(index>data.length) {
			System.out.println("Index Out of Bounds");
			System.exit(1);
			return 0;
		}
		else {
			return data[index];
		}
	}
	//Shifts Binary Number to right by amount given
	public void shiftR(int amount) {
		if (amount < 0) {
			throw new IllegalArgumentException("Enter Positive Value");
		}

		BinaryNumber reallocate = new BinaryNumber(data.length + amount);
		for (int i = amount; i < reallocate.getLength(); i++) {
			reallocate.data[i] = data[i - amount];
		}
		this.data = reallocate.data;
		System.out.println("New Number after shift is as: " + this.toString());
	}
	
	// Adding of Two Binary Numbers
	public void add(BinaryNumber aBinaryNumber) {
		if (aBinaryNumber.getLength() != data.length) {
			System.out.println("Both Binary Numbers Length should be same");
		} else {
			System.out.print("Addition of " + aBinaryNumber + " and " + toString() + "= ");
			int carry = 0;
			int sum[] = new int[data.length];
			for (int i = 0; i < data.length; i++) {
				int c = carry + data[i] + aBinaryNumber.getDigit(i);
				if (c == 0) {
					sum[i] = 0;
					carry = 0;
				}
				if (c == 1) {
					sum[i] = 1;
					carry = 0;
				}
				if (c == 2) {
					sum[i] = 0;
					carry = 1;
				}
				if (c == 3) {
					sum[i] = 1;
					carry = 1;
				}
			}
			data = sum;
			if (carry == 1) {
				overflow = true;
			}
			System.out.println(toString());
		}
	}
	//Return Binary Number as String and Overflow if number has overflow value 
	public String toString() {
		if(overflow == true) {
			return "Overflow";
		}
		else {
			String st ="";
			for(int i = 0; i<data.length; ++i) {
				st += data[i];
			}
			return st;
		}	
	}
	//Transform a Binary Number to its Decimal 
	public int toDecimal() {
		int decimal = 0;
		for(int i = 0; i< data.length; i++) {
			decimal= (int)(decimal + data[i] * Math.pow(2, i));
		}
		return decimal;
	}
	//Clear Overflow Value
	public void clearOverflow() {
		overflow = false;
		System.out.println("Overflow is set False now");
	}
	
	public static void main(String[] args) {
		BinaryNumber b1 = new BinaryNumber("10110");
		BinaryNumber b2 = new BinaryNumber("11101");
		BinaryNumber b3 = new BinaryNumber("11100");
		BinaryNumber b4 = new BinaryNumber(7);
		BinaryNumber Value1 = new BinaryNumber(5);
        System.out.println("Value = " + Value1);
        System.out.println(b2 + "'s length is = " + b2.getLength());
        System.out.println(b4.toString());
		System.out.println(b1 + "'s Decimal Value is = " + b1.toDecimal());
		System.out.println("Digit at given index is = " + b2.getDigit(3));
		b2.shiftR(3);
        b1.add(b3);
		b1.add(b2);
	}
}