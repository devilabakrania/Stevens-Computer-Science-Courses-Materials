/**
 * @author devilabakrania
 * Name: DEVILA BAKRANIA
 * CWID: 10457590
 * Course: CS-570
 *
 */
package Complexity;

public class Complexity {
	
	//private static int counter = 0;
	
	//Time Complexity O(n^2) implementation
	//Here n is number of inputs
	public static void method1(int n) {
	int counter = 0;
		for(int i = 0; i<n; i++) {
			for(int j = 0; j<n; j++) {
				System.out.println("Operation O(n^2) : " + counter); counter++;
			}
		}
	}
	
	//Time Complexity O(n^3) implementation
	public static void method2(int n) {
		int counter = 0;
		for(int i = 0; i<n; i++) {
			for(int j=0; j<n; j++) {
				for(int k = 0; k<n; k++) {
					System.out.println("Operation O(n^3): " +counter); counter++;
				}
			}
		}
	}
	
	//Time Complexity O(logn) implementation
	public static void method3(int n) {
		int counter = 0;
		for(int i = 1; i<=n; i*=2) {
			System.out.println("Operation O(logn): " +counter); counter++;
			}
	}
	
	//Time Complexity O(nlogn) implementation
	public static void method4(int n) {
		int counter = 0;
		for(int i = 0; i<n; i++) {
			for(int j = 1; j<=n; j*=2) {
				System.out.println("Operation O(nlogn): " +counter); counter++;
			}
		}
	}
	
	//Time Complexity O(loglogn) implementation
	public static void method5(int n) {
		int counter = 0;
		for(int i =2; i<n; i*=i) {
			System.out.println("Operation O(loglogn): " +counter); counter++;
		}
	}
	
	//Time Complexity O(2^n) implementation
	private static int counter1 = 1;
	public static int method6(int n) {
		
		System.out.println("Operation O(2^n): " +counter1); counter1++;

		if(n<=1)
			return n;
		else 
			return method6(n-1)+method6(n-1);
	
	}
	
	public static void main(String[] args) {
		Complexity.method1(3);
        Complexity.method2(5);
        Complexity.method3(20);
        Complexity.method4(5);
        Complexity.method5(512);
        Complexity.method6(9);
	}
	
}
