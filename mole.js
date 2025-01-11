let currentMoleTile;
let currentPlantTile;
let score=0;
let gameOver=false;
window.onload=function(){
    setGame();
}
function setGame(){
    // GRID SET UP
    for(let i=0;i<9;i++){
        // to create DIV (0->8)( to figure out which tile is clicked on)
        let tile=document.createElement("div");
        tile.id=i.toString();
        tile.addEventListener("click",selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole,1000);
    setInterval(setPlant,2000);
}
function getRandomTile(){
    //math.random returns a random number from specified range
    // here we need range of 0-9 9 exclusive
    let num=Math.floor(Math.random()*9);
    return num.toString();

}
function setMole(){
    if(gameOver)return;
    if(currentMoleTile){
        currentMoleTile.innerHTML="";
    }
    let mole=document.createElement("img");
    mole.src="./monty-mole.png";
    let num=getRandomTile();
    if(currentPlantTile && currentPlantTile.id==num){
        return;
    }
    currentMoleTile=document.getElementById(num);
    currentMoleTile.appendChild(mole);

}
function setPlant(){
    if(gameOver)return;
    if(currentPlantTile){
        currentPlantTile.innerHTML="";
    }
    let plant=document.createElement("img");
    plant.src="./piranha-plant.png";
    let num=getRandomTile();
    if(currentMoleTile && currentMoleTile.id==num){
        return;
    }
    currentPlantTile=document.getElementById(num);
    currentPlantTile.appendChild(plant);
}

function selectTile(){
    if(gameOver)return;
    if(this==currentMoleTile){
        score=score+10;
        document.getElementById("score").innerText=score.toString();
    }
    else if(this==currentPlantTile){
        document.getElementById("score").innerText="GAME OVER"+score.toString();
        gameOver=true;
    }

}