export class LabyrinthView{
    constructor(model){
        this.model=model;
        this.mazeDiv= this.createMaze(this.model);
        this.controls=document.querySelector('#controls');
        this.setupEventlisteners();
        // this.init();
    }
    // init(){
    //     this.createMaze(this.model);
    
    setupEventlisteners(){ //GENERATOR 
        const button=document.querySelector('#generate');
        button.addEventListener("click", event =>{
            event.preventDefault();
                const rows=document.querySelector('#rows').value;
                const columns=document.querySelector('#cols').value;
                const startrow=document.querySelector("#start-row").value;
                const startcol=document.querySelector("#start-col").value;
                const goalrow=document.querySelector("#end-row").value;
                const goalcol=document.querySelector("#end-col").value;
                const generateEvent = new CustomEvent('generate', {detail:{
                    rows:rows,
                    columns:columns,
                    startrow:startrow,
                    startcol:startcol,
                    goalrow:goalrow,
                    goalcol:goalcol}});
                document.dispatchEvent(generateEvent);
        });
       
    };
  
    createMaze(model){ //GENERATOR
        const cols=this.model.cols;
       
        document.documentElement.style.setProperty('--COLS',cols);
        const start=model.start;
        const finish=model.goal;
        const maze=model.maze;
        const mazeDiv=document.querySelector('#maze');
        mazeDiv.innerHTML='';
       
        for(let i=0; i<maze.length; i++){
            const row=maze[i];
            for(let j=0; j<row.length; j++){
                const cell=row[j];
                 const cellDiv=document.createElement('div');
                 cellDiv.classList.add('cell');
    
                 if(cell.row===start.row && cell.col===start.col){
                        cellDiv.classList.add('start');
                       
                    }
                    if (cell.row===finish.row && cell.col===finish.col){
                        cellDiv.classList.add('end');
                        
                    }                
                    if(cell.north){
                    cellDiv.classList.add('wall-north');
                    }
                    if(cell.east){
                        cellDiv.classList.add('wall-east');
                    }
                    if(cell.south){
                        cellDiv.classList.add('wall-south');
                    }
                    if(cell.west){
                        cellDiv.classList.add('wall-west');
                    }
                 mazeDiv.appendChild(cellDiv);
            }
       }
       return mazeDiv;
    }
    showpath(path){ //SOLVER
        console.log(path);
        let remainingNodes=[];
        path.forEach(node=>{
            remainingNodes.push(node);
        });
       remainingNodes.reverse();
       console.log(remainingNodes,"remainingNodes");
        const cells=document.querySelectorAll('.cell');
        
        console.log(remainingNodes);
        while(remainingNodes.length>0){
            let node=remainingNodes.pop();
            console.log(node);
            console.log(node.value);
            const row=node.row;
            const col=node.col;
            const index=row*this.model.cols+col;
            const cell=cells[index];
     
           cell.classList.add('path');
            cell.textContent= "▪";
            
        }
    }
    updateControls(model){ //SOLVER IMPORT
        console.log(model);
        const rows=document.querySelector('#rows');
        const cols=document.querySelector('#cols');
        const startrow=document.querySelector("#start-row");
        const startcol=document.querySelector("#start-col");
        const goalrow=document.querySelector("#end-row");
        const goalcol=document.querySelector("#end-col");
        rows.value=model.rows;
        cols.value=model.cols;
        startrow.value=model.start.row;
        startcol.value=model.start.col;
        goalrow.value=model.goal.row;
        goalcol.value=model.goal.col;
    }
    
}
