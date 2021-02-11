package Maze;

//DEVILA BAKRANIA 
//Assignment 4 
//CWID : 10457590

public class PairInt {
	//data fields 
	private int x;
	private int y;
	//constructor
	public PairInt(int _x, int _y) {
		x = _x;
		y = _y;
	}
	//getter setter properties implementation
	
	//get for x
	public int getX() {
		return x;
	}
	
	//get for y
	public int getY() {
		return y;
	}
	
	//set for x
	public void setX(int _x) {
		x = _x;
	}
	
	//set for y
	public void setY(int _y) {
		y = _y;
	}
	
	public boolean equals(Object p) {
		if(p==null) {return false;}
		PairInt toCheck = (PairInt) p;
		
		if(toCheck.getX() == this.x && toCheck.getY() == this.y) 
		{
			return true;
		}
		
		return false;
	}
	public String toString() {
		return "(" + this.x + "," + this.y + ")";
	}
	
	public PairInt copy() {	
		return new PairInt(this.x, this.y);
	}
}
