package IDLList;

public class IDLListTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		IDLList<Integer> IDLLIST= new IDLList<Integer>();
		IDLLIST.add(1);
        System.out.println("First element in the list: " + IDLLIST.toString());
        IDLLIST.add(0,0);
        System.out.println("After adding 0 at the head, list is: " + IDLLIST.toString());
        IDLLIST.add(2,2);
        System.out.println("After adding 2 at the index 2, the list is: " + IDLLIST.toString());
        IDLLIST.append(3);
        System.out.println("After appending 3, the list is: " + IDLLIST.toString());
        System.out.println("Current list is: " + IDLLIST.toString());
        System.out.println("Get element at position 1 in list: " + IDLLIST.get(1));
        System.out.println("Current list is: " + IDLLIST.toString());
        System.out.println("Get head object in the list: " + IDLLIST.getHead());
        System.out.println("Current list is: " + IDLLIST.toString());
        System.out.println("Get tail object in the list: " + IDLLIST.getLast());
        System.out.println("Size of the current list is: " + IDLLIST.size());
        System.out.println("Current list is: " + IDLLIST.toString());
        System.out.println("Removed Head is: " + IDLLIST.remove());
        System.out.println("After removing, current list is: " + IDLLIST.toString());
        System.out.println("Current list is: " + IDLLIST.toString());
        System.out.println("Removed Tail is: " + IDLLIST.removeLast());
        System.out.println("After removing, current list is: " + IDLLIST.toString());
        IDLLIST.append(4);
        IDLLIST.add(2, 4);
        System.out.println("Current list is: " + IDLLIST.toString());
        IDLLIST.remove(4);
        System.out.println("Current list after removing first occurrence of 4 is: "+ IDLLIST.toString());
    }
}