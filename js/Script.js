const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];

var timer;
var lives;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function(){
  
id("start-btn").addEventListener("click",startGame);

for (i = 0; i <id("number-container").children.length; i++) {
  id("number-container").children[i].addEventListener("click", function (){
    if (disableSelect== false) {
      if (this.classList.contains("selected")) {
        this.classList.remove("selected");
       
       id("number-container").children[i].classList.remove("selected")
        
        selectedNum=null;
      }
      else{
        for (i = 0; i <9; i++) {
          id("number-container").children[i].classList.remove("selected")
        }
      }
      this.classList.add("selected");
      selectedNum = this;
      updateMove();
    }
  })
}
}


function startGame(){
  let board;
  if(id("diff-1").checked) board= easy[0]
  else if(id("diff-2").checked) board= medium[0]
  else board = hard[0]
  lives=3;
 disableSelect= false;
 id("lives").textContent="lives remaining: 3";
 generateBoard(board);
 
 //changing theme and levels
 if (id("theme-2").checked){
   qs("header").classList.add("bg-dark","text-light");
   qs("body").classList.add("bg-dark","text-light");
 }
 else if(id("theme-1").checked){
   qs("header").classList.remove("bg-dark","text-light");
   qs("body").classList.remove("bg-dark","text-light");
 }
 id("number-container").classList.remove("d-none")
 
 //setting a timer according to user
setTimer();

}


//bord generating function
function generateBoard(board){
  //clear previous board
  clearPrevious();
  //ids for tiles
  let idCount=0;
  //creating 81 tiles and assigning ids and classList
  for (i = 0; i < 81; i++) {
    
    let tile = document.createElement("p");
    if(board.charAt(i) != "-"){
    // putting the number in tiles
    tile.textContent = board.charAt(i);
    } else {
    //addEventListener function
  tile.addEventListener("click",function(){
    //using disableSelect as a flag
    if(!disableSelect){
      if(tile.classList.contains("selected")){
        tile.classList.remove("selected");
        selectedNum=Null;
      }else{
        for (var i = 0; i < 81; i++) {
         qsa(".tile")[i].classList.remove("selected");
        }
        tile.classList.add("selected");
        selectedTile=tile;
        updateMove()
      }
    } 
  })
  }
  //assigning tile id
  tile.id = idCount;
  //increament of tile
  idCount++;
  tile.classList.add("tile");
  //adding bottomBorder and rightBorder class
  if ((tile.id > 17 && tile.id<27)||(tile.id > 44 & tile.id < 54)){
    tile.classList.add("bottomBorder");
  }
  if((tile.id+1)%9 ==3 || (tile.id+1)%9 == 6){
    tile.classList.add("rightBorder");
  }
  //adding tile to border
  id("board").appendChild(tile);
  }
}

//updating moves 
function updateMove(){
 //if a tile and number is selected at a time
  if(selectedTile && selectedNum){
    selectedTile.textContent=selectedNum.textContent;
    if (checkCorrect(selectedTile)){
 //Deselecting the tile 
 selectedTile.classList.remove("selected");
 selectedNum.classList.remove("selected");
 selectedNum=null;
 selectedTile=null;
 // if board is done
 if(checkDone()){
   endGame();
 }
    }else{
      
 //disabling the number for 1 sec if incorrect
 disableSelect=true;
 selectedTile.classList.add("incorrect");
 //Run in one sec
 setTimeout(function() {
   //subtracting lives
   lives--;
   if (lives==0){
     endGame();
   }else{
     id("lives").textContent="Lives remaining: " +lives;
     disableSelect=false;
   }
   //restore the color of tile
  selectedTile.classList.remove("incorrect");
  selectedTile.classList.remove("selected");
  selectedNum.classList.remove("selected");
  //clearing the text of tiles
  selectedTile.textContent="";
  selectedTile=null;
  selectedNum=null;
 }, 1000);          
    }
  }
}

function checkCorrect(tile){
  let solution;
  if(id("diff-1").checked) solution= easy[1]
  else if(id("diff-2").checked) solution= medium[1]
  else solution=hard[1];
  
  if (solution.charAt(tile.id)==tile.textContent) return true;
 else return false;
 
}

function checkDone(){
  let tiles = qsa(".tile");
  for (let i = 0; i < tiles.length; i++) {
    if(tiles[i].textContent=="") return false
  }
  return true;
}

function endGame(){
  
  
 //disabling to move and stoping timer
disableSelect= true;
clearInterval(timer);
//displaying win and lose
if(lives==0 || id("timer").textContent=="00:00"){
 console.log(parseInt(qs(".sec").textContent))
  id("lives").textContent="You lost!"
}else{
  id("lives").textContent="You Won!"
}
}
//clearing previous board function
function clearPrevious(){
  
  let tiles = qsa(".tile");
  
  for (i = 0; i < tiles.length; i++) {
    tiles[i].remove();
  }
  if (timer) clearInterval(timer);
  
  for (var i = 0; i < id("number-container").children.length; i++) {
    id("number-container").children[i].classList.remove("selected");
  }
  selectedTile=null;
  selectedNum=null;
}


//Timer function
function setTimer(){
  let time;
  id("hide").classList.remove("d-none");
  if (id("time-1").checked) time=3;
  if (id("time-2").checked) time=5;
  if (id("time-3").checked) time=10;
  if(time<10) qs(".min").textContent="0"+time;
  else qs(".min").textContent=time;
  qs(".sec").textContent="00";
  
  timer = setInterval(function (){
    let x=parseInt(qs(".sec").textContent,10)
    qs(".sec").textContent=parseInt(qs(".sec").textContent,10)-1;
    
    if(x==0){
    qs(".min").textContent=parseInt(qs(".min").textContent)-1;
    if (time<11){
      qs(".min").textContent="0"+parseInt(qs(".min").textContent);
    }
    qs(".sec").textContent= 59;
    
    }else if (x<11) {
      qs(".sec").textContent="0"+parseInt(qs(".sec").textContent,10);
    }
   if(qs(".min").textContent=="00" && qs(".sec").textContent=="00"){
     endGame();
   }
  },1000)
}


//Time saver functions
function id(id){
  return document.getElementById(id);
}

function qs(selector){
  return document.querySelector(selector);
}

function qsa(selector){
 return document.querySelectorAll(selector);
}
