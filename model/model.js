export class MazeModel{
    constructor(){
        this.rows = 0;
        this.cols = 0;
       this.start={};
       this.goal={};
       this.maze=[];
      
    }
    setRows(rows){
        this.rows=parseInt(rows);
    }
    setCols(cols){
        this.cols=parseInt(cols);
    }
    setStart(row,col){
        this.start.row=parseInt(row);
        this.start.col=parseInt(col);
    }
    setGoal(row,col){
        this.goal.row=parseInt(row);
        this.goal.col=parseInt(col);
    }
    getRows(){
        return this.rows;
    }
    getCols(){
        return this.cols;
    }
    validateSize(rows,cols){
        console.log('validateInputs, rows:',rows,'cols:',cols);
        if(rows < 4 || rows > 50 || cols < 4 || cols > 50){
            return false;
        }
        return true;
    }
    validatePos(start,goal){
        console.log('validatePos, start:',start,'goal:',goal);
        if(start.row < 0 || start.row >= this.rows || start.col < 0 || start.col >= this.cols || goal.row < 0 || goal.row >= this.rows || goal.col < 0 || goal.col >= this.cols
            || (goal.row === start.row && goal.col=== start.col)){
            return false;
        }

        return true;
    }
    
    createMaze() {
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
    getNeighbors(cell){
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
    getUnvisitedNeighbors(neighbors,visited){
        let unvisitedNeighbors=[];
        for(let i=0;i<neighbors.length;i++){
            if(!visited.has(neighbors[i])){
                unvisitedNeighbors.push(neighbors[i]);
            }
        }
        return unvisitedNeighbors;

    }
    removeWall(currentCell,nextCell){
        
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
}