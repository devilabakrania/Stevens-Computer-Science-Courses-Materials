package Maze;
import java.util.*;


/**
 * Class that solves maze problems with backtracking.
 * @author Koffman and Wolfgang
 **/
public class Maze implements GridColors {

    /** The maze */
    private TwoDimGrid maze;

    public Maze(TwoDimGrid m) {
        maze = m;
    }
    
    //Solution 1
    /** Wrapper method. */
    public boolean findMazePath() {
        return findMazePath(0, 0); // (0, 0) is the start point.
    }

    /**
     * Attempts to find a path through point (x, y).
     * @pre Possible path cells are in BACKGROUND color;
     *      barrier cells are in ABNORMAL color.
     * @post If a path is found, all cells on it are set to the
     *       PATH color; all cells that were visited but are
     *       not on the path are in the TEMPORARY color.
     * @param x The x-coordinate of current point
     * @param y The y-coordinate of current point
     * @return If a path through (x, y) is found, true;
     *         otherwise, false
     */
    public boolean findMazePath(int x, int y) {
    	//COMPLETE HERE FOR PROBLEM 1
    	//Variable to get number of Rows-1 and use it further for logic
    	int nRows = maze.getNRows() - 1;
    	//Variable to get number of Columns-1 and use it further for logic
    	int nCols = maze.getNCols() - 1;
    	
    	//Return False when current pointer is out of bound of the grid
        if(x < 0 || y < 0 || x > nCols || y > nRows) {
        	return false;
        }
        
        //Return False when current pointer is not the part of path
        if(maze.getColor(x, y) != NON_BACKGROUND) {
        	return false;
        }
        
        //Return True if current pointer reached the exit
        if(x == nCols && y == nRows) { 
    		maze.recolor(x, y, PATH);
    		return true;
        }
        //Setting current pointer to path if it is not reached or cannot find the exit
        maze.recolor(x, y, PATH);
        
        if (findMazePath(x - 1, y) || findMazePath(x + 1, y) || findMazePath(x, y - 1) || findMazePath(x, y + 1)) {
        	return true;
        }
        
        //Color again the current pointer to TEMPORARY which is set to black in GridColors.java interface
		else {
	        //Color again the current pointer to TEMPORARY which is set to black in GridColors.java interface
			maze.recolor(x, y, TEMPORARY);
			return false;
		}
    }
    
    // Solution 2
    // ADD METHOD FOR PROBLEM 2 HERE
    public ArrayList<ArrayList<PairInt>> findAllMazePaths(int x, int y) throws IllegalArgumentException {
    	
    	int nRows2 = maze.getNRows() - 1;
    	int nCols2 = maze.getNCols() - 1;
    	if(x < 0 || y < 0 || x > nCols2 || y > nRows2) {
    		throw new IllegalArgumentException();
    	}
    	
    	ArrayList<ArrayList<PairInt>> result = new ArrayList<ArrayList<PairInt>>();
    	Stack<PairInt> trace = new Stack<PairInt>();
    	findMazePathStackBased(0, 0, result, trace);
    	return result;
    }
    
    public void findMazePathStackBased(int x, int y, ArrayList<ArrayList<PairInt>> result, Stack<PairInt> trace) {
       //Push the point to trace
    	trace.push(new PairInt(x, y));
    	int nRows = maze.getNRows() - 1;
    	int nCols = maze.getNCols() - 1;
    	
    	if(x < 0 || y < 0 || x > nCols|| y > nRows) {
    		//After visiting this point, remove it from the trace
    		trace.pop();
        	return;
        }
        if(maze.getColor(x, y) != NON_BACKGROUND) {
        	trace.pop();
        	return;
        }
        if(x == nCols && y == nRows) {
        	ArrayList<PairInt> temp = new ArrayList<PairInt>(trace);
        	result.add(temp);
        	//After visiting this point, remove it from the trace
        	trace.pop();
        	//Color again the current pointer to NON_BACKGROUND which is set to red in GridColors.java interface
        	maze.recolor(x, y, NON_BACKGROUND);
        	return;
        }
      //Color again the current pointer to PATH which is set to green in GridColors.java interface
        maze.recolor(x, y, PATH);
    
        findMazePathStackBased(x - 1, y, result, trace);
        findMazePathStackBased(x + 1, y, result, trace);
        findMazePathStackBased(x, y - 1, result, trace);
        findMazePathStackBased(x, y + 1, result, trace);
       	
        trace.pop();
      //Color again the current pointer to NON_BACKGROUND which is set to red in GridColors.java interface
        maze.recolor(x, y, NON_BACKGROUND);
       	
    }
    
    // Solution 3 - returns the shortest path in the list of paths
    // ADD METHOD FOR PROBLEM 3 HERE
    public ArrayList<PairInt> findMazePathMin(int x, int y) throws IllegalArgumentException {
    	
    	int nRows3 = maze.getNRows() - 1;
    	int nCols3 = maze.getNCols() - 1;
    	
    	if(x < 0 || y < 0 || x > nCols3 || y > nRows3) {
    		throw new IllegalArgumentException();
    	}
    	//Creating an arraylist whose size is the size of the result
    	ArrayList<ArrayList<PairInt>> res = findAllMazePaths(x, y);
    	int min = res.get(0).size();
    	ArrayList<PairInt> ans = res.get(0); 
    	//find the smallest count and index
    	for(int i = 1; i < res.size(); i++) {
    		if(res.get(i).size() < min) {
    			min = res.get(i).size();
    			ans = res.get(i);
    		}
    	}
    	
    	return ans;

    }

    /*<exercise chapter="5" section="6" type="programming" number="2">*/
    public void resetTemp() {
        maze.recolor(TEMPORARY, BACKGROUND);
    }
    /*</exercise>*/

    /*<exercise chapter="5" section="6" type="programming" number="3">*/
    public void restore() {
        resetTemp();
        maze.recolor(PATH, BACKGROUND);
        maze.recolor(NON_BACKGROUND, BACKGROUND);
    }
    /*</exercise>*/
}
/*</listing>*/
