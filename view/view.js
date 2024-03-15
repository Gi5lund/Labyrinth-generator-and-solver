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
    
    setupEventlisteners(){
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
    // updatePath(model,write){
    //     const path=model.path;
    //     // const mazeDiv=document.querySelector('#maze');
    //     for(let i=0; i<path.length; i++){
    //         const cell=path[i];
    //         console.log("updatePath, cell",cell);
    //         const cellDiv=this.mazeDiv.children[cell.row].children[cell.col];
    //         if(!write){
    //             // cellDiv.classList.remove('path');
    //             cellDiv.innerHTML='';
    //         }else{
    //         cellDiv.classList.add('path');}
    //         if(i>0 && i<path.length-1){
    //             const prevCell=path[i-1];
    //             if(cell.row!==prevCell.row){
    //                 cellDiv.textContent='|';
    //             }           
    //             if(cell.col!==prevCell.col){
    //                 cellDiv.textContent='--';
    //             }
    //         }
    //         cellDiv.textContent='x';
    //     }
    // }
    
    createMaze(model){
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
    
}