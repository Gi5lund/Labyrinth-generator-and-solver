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
       document.addEventListener('generate', event => {
               console.log('generate event', event.detail);
        
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
                this.model.createMaze();
                this.view.createMaze(this.model);
            });
            
        };

}