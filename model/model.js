export class MazeModel{
    constructor(){
        this.rows = 0;
        this.cols = 0;
       this.start={};
       this.goal={};
       this.maze=[];
       this.path=[];
      
    }
    setRows(rows){//GENERATOR (+SOLVER import-part)
        this.rows=parseInt(rows);
    }
    setCols(cols){//GENERATOR (+SOLVER import-part)
        this.cols=parseInt(cols);
    }
    setStart(row,col){ //GENERATOR (+SOLVER import-part)
        this.start.row=parseInt(row);
        this.start.col=parseInt(col);
    }
    setGoal(row,col){ //GENERATOR (+SOLVER import-part)
        this.goal.row=parseInt(row);
        this.goal.col=parseInt(col);
    }
    getRows(){
        return this.rows;
    }
    getCols(){
        return this.cols;
    }
    validateSize(rows,cols){ //GENERATOR (+SOLVER import-part)
        console.log('validateInputs, rows:',rows,'cols:',cols);
        if(rows < 4 || rows > 50 || cols < 4 || cols > 50){
            return false;
        }
        return true;
    }
    validatePos(start,goal){ //GENERATOR (+SOLVER import-part)
        console.log('validatePos, start:',start,'goal:',goal);
        if(start.row < 0 || start.row >= this.rows || start.col < 0 || start.col >= this.cols || goal.row < 0 || goal.row >= this.rows || goal.col < 0 || goal.col >= this.cols
            || (goal.row === start.row && goal.col=== start.col)){
            return false;
        }

        return true;
    }
    
    createMaze() { //GENERATOR
       let maze=[];
     
       const rows=this.rows;
       const cols=this.cols;
       let unvisited=rows*cols; // total number of cells in the grid - minus start and goal cells
       console.log('createMaze, rows:',rows,'cols:',cols);
       //create grid with all walls set to true
        for (let i = 0; i < rows; i++) {          
           maze.push([]);
            for (let j = 0; j < cols; j++) {
                
                const cell={row:i,col:j,north:true,south:true,west:true,east:true};
                maze[i].push(cell);
            }
        }
        this.maze=maze; //all cells ar considered unvisited at this point
        console.table(this.maze);
        //create a set to keep track of visited cells
        let visited=new Set();
        // visited.add(this.maze[this.start.row][this.start.col]);
        // visited.add(this.maze[this.goal.row][this.goal.col]);
        while(unvisited>0){
            let currentCell=this.maze[Math.floor(Math.random()*rows)][Math.floor(Math.random()*cols)];
            if(!visited.has(currentCell)){
                visited.add(currentCell);
                unvisited--;
                let stack=[];
                stack.push(currentCell);
                while(stack.length>0){
                    let currentCell=stack.pop();
                    let neighbors=this.getNeighbors(currentCell);
                    let unvisitedNeighbors=this.getUnvisitedNeighbors(neighbors,visited);
                    if(unvisitedNeighbors.length>0){
                        stack.push(currentCell);
                        let nextCell=unvisitedNeighbors[Math.floor(Math.random()*unvisitedNeighbors.length)];
                        this.removeWall(currentCell,nextCell);
                        visited.add(nextCell);
                        unvisited--;
                        stack.push(nextCell);
                    }
                }
            }
        }
        console.log(this);
    }
    getNeighbors(cell){ //GENERATOR
        let neighbors=[];
        if(cell.row-1>=0){
            neighbors.push(this.maze[cell.row-1][cell.col]);
        }
        if(cell.col+1<this.cols){
            neighbors.push(this.maze[cell.row][cell.col+1]);
        }
        if(cell.row+1<this.rows){
            neighbors.push(this.maze[cell.row+1][cell.col]);
        }
        if(cell.col-1>=0){
            neighbors.push(this.maze[cell.row][cell.col-1]);
        }
        return neighbors;

    }
    getUnvisitedNeighbors(validNeighborNodes, visited) { //SOLVER + GENERATOR
        let unvisitedNeighbors = [];
        if (visited instanceof Set) {
            // If visited is a Set
            for (let i = 0; i < validNeighborNodes.length; i++) {
                if (!visited.has(validNeighborNodes[i])) {
                    unvisitedNeighbors.push(validNeighborNodes[i]);
                }
            }
        } else if (Array.isArray(visited)) {
            // If visited is an array
            for (let i = 0; i < validNeighborNodes.length; i++) {
                if (!visited.includes(validNeighborNodes[i])) {
                    unvisitedNeighbors.push(validNeighborNodes[i]);
                }
            }
        } else {
            throw new Error("Invalid type for visited parameter. It should be either a Set or an array.");
        }
        return unvisitedNeighbors;
    }
    removeWall(currentCell,nextCell){ //GENERATOR
        if(currentCell.row===nextCell.row){
            if(currentCell.col>nextCell.col){
                currentCell.west=false;
                nextCell.east=false;
            }else{
                currentCell.east=false;
                nextCell.west=false;
            }
        }else if(currentCell.col===nextCell.col){
            if(currentCell.row>nextCell.row){
                currentCell.north=false;
                nextCell.south=false;
            }else{
                currentCell.south=false;
                nextCell.north=false;
            }
        }
    }
    addCellToPath(cell){ 
        this.path.push(cell);
    }
    getPath(){
        return this.path;
    }
    countOpenings(cell){
        return (cell.north?0:1)+(cell.east?0:1)+(cell.south?0:1)+(cell.west?0:1);
    }
    getValidPath(cell){ //SOLVER: SEWN er search from stack  NWES er push to stack
        let neighbors=[];
       
       if(!cell.north && cell.row-1>=0){
        //push the north neighbor from the list of neighbors
           neighbors.push(this.maze[cell.row-1][cell.col])
       }
       if(!cell.west&&cell.col-1>=0){
           neighbors.push(this.maze[cell.row][cell.col-1])
       }
        if(!cell.east&&cell.col+1<this.cols){
              neighbors.push(this.maze[cell.row][cell.col+1])
         }
        if(!cell.south&&cell.row+1<this.rows){
                neighbors.push(this.maze[cell.row+1][cell.col])
            }
        return neighbors;
    }
}