## generator: jeg har brugt Wilson'algoritme  til at generere en labyrint

## solver: jeg har brugt depth-first search (DFS) til at finde en løsning for problemet. jeg har efterfølgende renset stien så kun de trin der fører direkte fra goal til start er medtaget. det er gjort ved at hvert nyt step har fået en 'prev' property som peger på forrige trin

## struktur: mvc med både solver og generator i samme foldere. metodernes tilhørsforhold er markeret med kommentarer i koden - forhåbentlig har jeg ikke glemt nogen

*******************************ENGLISH******************
## Generator: I have used Wilson's algorithm  to generate a maze.

## Solver: I have used a depth-first search (DFS) to find a path through the maze. Each step is marked with a 'prev' property pointing to the previous step afterwards the path is cleansed for unneeded steps.

## Structure: I have used a MVC structure  for the project both SOLVER and GENERATOR methods are included in the same classes. The methods are marked with comments in the code indicating which they belong to.