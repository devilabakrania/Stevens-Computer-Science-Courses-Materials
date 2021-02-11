/**
 * @author devilabakrania
 * Name: DEVILA BAKRANIA
 * CWID: 10457590
 * Course: CS-570
 *
 */

package IDLList;
import java.util.ArrayList;

public class IDLList<E> {
	//Declaring an inner class Node<E>
	private static class Node<E>{
	//Data Fields of private inner class Node<E>
	E data;
	Node<E> next;
	Node<E> prev;
	
	//A constructor that creates a node holding elem
	Node(E elem){
		this.data = elem;
	}
	//A constructor that creates a node holding elem, with next as next and prev as prev
	Node(E elem, Node<E> prev, Node<E> next){
		this.data = elem;
		this.prev = prev;
		this.next = next;
	}
	}
	//The class IDLList<E> should include the declaration of inner private class Node<E> and four data fields
	private Node<E> head;
	private Node<E> tail;
	private int size;
	private ArrayList<Node<E>> indices;
	
	//Create an empty double-linked list
	
	public IDLList() {
		this.head = null;
		this.tail = null;
		this.size = 0;
		this.indices = new ArrayList<Node<E>>();
	}
	//adding elem at position index
	public boolean add(int index, E elem) throws IndexOutOfBoundsException {
		if(index<0 || index > size)
			throw new IndexOutOfBoundsException();
		if(index==0) 
			add(elem);
		else if(index == size)
			append(elem);
		else {
			Node<E> i = indices.get(index);
			Node<E> newnode = new Node<E>(elem,i.prev,i);
			i.prev.next = newnode;
			i.prev = newnode;
			indices.add(index,newnode);
			size++;			
		}
		return true;
			
	}

	//adding elem at the head (i.e. it becomes the first element of the list)
	
	public boolean add(E elem) {
		if(size == 0) {
			Node<E> newnode = new Node<E>(elem);
			head = newnode;
			tail = newnode;
			indices.add(newnode);
		}
		else {
			Node<E> newnode = new Node<E>(elem, null, head);
			head.prev = newnode;
			head = newnode;
			indices.add(0, newnode);
		}
		size++;
		return true;
	}
	
	//adding elem as the new last element of the list (i.e. at the tail)
	
	public boolean append(E elem) {
		if(size == 0) {
			Node<E> newnode = new Node<E>(elem);
			head = newnode;
			tail = newnode;
			indices.add(newnode);
		}
		else {
			Node<E> newnode = new Node<E>(elem,tail,null);
			tail.next = newnode;
			tail = newnode;
			indices.add(newnode);
		}
		size++;
		return true;
	}
	
	//returns the object at position index from the head. It uses the index for fast access. Indexing starts from 0, thus get(0) returns the head element of the list
	
	public E get(int index) {
		return indices.get(index).data;
	}
	
	//returns the object at the head
	
	public E getHead() {
		return head.data;
	}
	
	//returns the object at the tail
	
	public E getLast() {
		return tail.data;
	}
	
	//returns the list size
    public int size() {
    	return indices.size();
    }
    
    //removes and returns the element at the head
    
    public E remove() throws IndexOutOfBoundsException {
    	E elermv;
    	if(size ==0)
    		throw new IndexOutOfBoundsException("Empty list can't be removed!"); 
    	else if(size ==1) {
    		elermv = head.data;
			head = null;
			tail = null;
		}
		else {
			elermv = head.data;
			head.next.prev = null;
			head = head.next;
		}
		indices.remove(0);
		size--;
		return elermv;	
    }
    
    //removes and returns the element at the tail
	public E removeLast() throws IndexOutOfBoundsException{
		E elermvlst;
		if(size == 0)
			throw new IndexOutOfBoundsException("Empty list can't be removed!");
		else if(size == 1) {
			elermvlst = tail.data;
			head = null;
			tail = null;
		}
		else {
			elermvlst = tail.data;
			tail.prev.next = null;
			tail = tail.prev;
		}
		indices.remove(size - 1);
		size--;
		return elermvlst;
	}
	
	//removes and returns the element at the index index. Use the index for fast access
	
	public E removeAt(int index) throws IndexOutOfBoundsException{
		E elemrmvAt;
		if(index < 0 || index >= size) 
			throw new IndexOutOfBoundsException();
		if(size == 1) {
			elemrmvAt = head.data;
			head = null;
			tail = null;
		}
		else if(index == 0) {
			elemrmvAt = head.data;
			head.next.prev = null;
			head = head.next;
		}
		
		else if(index == size - 1) {
			elemrmvAt = tail.data;
			tail.prev.next = null;
			tail = tail.prev;
		}
		else {
			Node<E> i = indices.get(index);
			elemrmvAt = i.data;
			i.prev.next = i.next;
			i.next.prev = i.prev;
		}
		indices.remove(index);
		size--;
		return elemrmvAt;	
	}
	
	//removes the first occurrence of elem in the list and returns true. Return false if elem was not in the list
	
	public boolean remove(E elem) {
		for (int i = 0; i < indices.size(); i++) {
			if(indices.get(i).data==elem) {
				removeAt(i);
				return true;
				}
			}
			return false;
	}
	
	//Presents a string representation of the list
	
	public String toString() {
		String str = "";
		for(int i = 0; i < size; i++) {
			if(i != size - 1) 
				str = str + (indices.get(i).data + ", ");
			else
				str = str + (indices.get(i).data);
		}
		str += "";
		return str;
	}
	}
	

