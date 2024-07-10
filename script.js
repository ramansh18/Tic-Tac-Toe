const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");
const startBtn = document.querySelector(".start-btn");
const playerOne = document.getElementById("pyr-1");
const playerTwo = document.getElementById("pyr-2");
const startScreen = document.querySelector(".start-screen");
const TTT = document.querySelector(".tic-tac-toe");
const formData = document.querySelector("form");
const name_error = document.querySelector("#name-error");
const name_error1 = document.querySelector("#name-error1");
let currentPlayer;
let gameGrid;
const winningPos =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]];

formData.addEventListener("submit", e=>{
    e.preventDefault();
    let ans = isValidate();
    ans ? ClickHandler(): NewGame() ;
});

function isValidate(){
    if(playerOne.value==="" &&  playerTwo.value===""){
        name_error.innerText = "Name Cannot Be Empty";
        name_error1.innerText = "Name Cannot Be Empty";
        return false;
    }
    else if(playerOne.value==="" ){
        name_error.innerText = "Name Cannot Be Empty";
        return false;
    }
    else if(playerTwo.value===""){
        name_error1.innerText = "Name Cannot Be Empty";
        return false;
    }
    
    return true;
}
TTT.classList.add("hidden");
startBtn.addEventListener("click",ClickHandler);
gameInfo.classList.add("hidden");

function ClickHandler(){
    TTT.classList.remove("hidden");
    startScreen.classList.add("hidden");
    gameInfo.classList.remove("hidden");
    initGame();       
}
function NewGame(){
    TTT.classList.add("hidden");
    startScreen.classList.remove("hidden");
    playerOne.value= "";
    playerTwo.value = "";
    newGamebtn.classList.remove("active");
    gameInfo.classList.add("hidden");
}
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
        boxes.forEach((box,index) =>{
            box.innerText= "";
            boxes[index].style.pointerEvents = "all";


            box.classList = `box box${index+1}`;
        });
    gameInfo.innerText = `Current Player - ${playerOne.value}`;
}

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText = `Current Player - ${(currentPlayer==="X") ? playerOne.value : playerTwo.value}`;
}

function checkGameOver(){
    let answer = "";
    winningPos.forEach((position) =>{
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!==""
        ||gameGrid[position[2]]!=="") &&
             ((gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]))){
             
                
                if(gameGrid[position[0]]==="X"){
                    answer ="X";
                }
                else{
                    answer ="Y";
                }
                //disable pointer events

                boxes.forEach((box) =>{
                    box.style.pointerEvents = "none";
                })
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });
    if(answer !== ""){
        gameInfo.innerHTML = `Winner Player - ${(answer==="X") ? playerOne.value : playerTwo.value}`;
        newGamebtn.classList.add("active");
        return;
    }

    //jab koi winner na mil pae
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !=="")
           fillCount++;
    });

    if(fillCount===9){
        gameInfo.innerHTML = "Game Tied!";
        newGamebtn.classList.add("active");
    }
}

function handleClick(index) {
    if(gameGrid[index] === "" ) {

        boxes[index].innerHTML = (currentPlayer
             === "X") ? '<img src="./assets/—Pngtree—vector cross icon_4275927.png" height="70px" width="70px" alt="X">' :
         '<img src="./assets/—Pngtree—neon blue shining circle light_9156893.png" height="70px" width="70px" alt="O">';

        //boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi win toh ni gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGamebtn.addEventListener("click", NewGame);