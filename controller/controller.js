"use strict"
import {MazeModel} from '../model/model.js';
import {LabyrinthView} from '../view/view.js';
window.addEventListener('load', function () {
    const maze = new MazeModel();
    const view = new LabyrinthView(maze);
    const controller = new Controller(maze,view);
    
});

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.setupEventlisteners()
    }

  
    setupEventlisteners() {
        const self=this;
       document.addEventListener('generate', event => {
               console.log('generate event', event.detail);
                const importfiles=document.querySelector('#importMaze');
            event.preventDefault();
           
                const rows=event.detail.rows;
                const columns=event.detail.columns
                 const startrow=event.detail.startrow;   
                const startcol=event.detail.startcol;
                const goalrow=event.detail.goalrow; 
                const goalcol=event.detail.goalcol;
                
                let isValidSize=this.model.validateSize(rows,columns);
                if(isValidSize){
                    this.model.setRows(rows);
                    this.model.setCols(columns);
                }
                const start = {
                    row:startrow,
                    col:startcol};
                const goal = {
                    row:goalrow,
                    col:goalcol};
                let isValidPos=this.model.validatePos(start,goal);
                if(isValidPos){
                    this.model.setStart(start.row,start.col);
                    this.model.setGoal(goal.row,goal.col);
                }else{
                    alert('Invalid start or goal position');
                }
                importfiles.value='';
                this.model.createMaze();
                this.view.createMaze(this.model);
            });

            document.querySelector('#exportButton').addEventListener('click', ()=> { //GENERATOR
                const data={
                    rows: self.model.rows,
                    cols: self.model.cols,
                    start: self.model.start,
                    goal: self.model.goal,
                    maze: self.model.maze
                };
                console.log('exportButton, data:',data);
                const filename='mazeData.json';
                self.downloadJSON(data,filename);
                
            });
            document.querySelector("#solve").addEventListener('click',()=>{
                //self.controller.solveMaze();
                this.solveMaze();                 
            });
            document.querySelector("#importMaze").addEventListener('change', event => {
                this.handleImport(event.target.files);
            });
        };
        downloadJSON(data, filename) { //GENERATOR
            const json = JSON.stringify(data, null, 3);
            const blob = new Blob([json], {type: 'application/json'});
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
                }

            handleImport(files) { //SOLVER
                const file = files[0];
                const reader = new FileReader();
            
                reader.onload = (event) => {
                    const importedData = JSON.parse(event.target.result);
                   
                   this.view.updateControls(importedData);
                    console.log('Imported maze data:', importedData);
                };
            
                reader.readAsText(file);
            }

        solveMaze(){ //SOLVER
            // define startcell
            let startCell=this.model.maze[this.model.start.row][this.model.start.col]; //otherwise the walls will be missing
            // define goalcell
            let goalCell=this.model.maze[this.model.goal.row][this.model.goal.col];
            let unvisited=[]
            let path=[];
           
            unvisited.push(startCell);
            while(unvisited.length!==0){
        // define currentcell
            let currentCell=unvisited.pop();           
             path.push(currentCell);
            // solution condition:
            if(currentCell.row===goalCell.row && currentCell.col===goalCell.col){
                console.log('Maze solved');  
                const solutionPath= this.cleanPathVisited(path);
                this.model.path=solutionPath;
                this.view.showpath(this.model.path);
                return true;
            }
            //get available neighbors:
            let neighbors=this.model.getValidPath(currentCell)
            let unvisitedNeighbors=this.model.getUnvisitedNeighbors(neighbors,path);
            
            for(let unvisitednode of unvisitedNeighbors){
                unvisitednode.prev=currentCell;
                unvisited.push(unvisitednode);
            }       


        }
        
    }
    cleanPathVisited(path) {
            let cleanedPath = [];
            const goal=path[path.length-1];
            const start=path[0];
            let currentnode=goal;
            while(currentnode.prev){
            cleanedPath.unshift(currentnode);
            currentnode=currentnode.prev;
        }
        cleanedPath.unshift(start);
        return cleanedPath;
    }
    
    }

    // export async function getMaze() {
    
    //     try {
    //         let response = await fetch('./maze.json');
    //         let data = await response.json();
    //         mazemodel = data;
          
    //         return data;
    //     } catch (error) {
    //         console.log('Error: ', error);
    //     }
    //   return mazemodel;
    // }