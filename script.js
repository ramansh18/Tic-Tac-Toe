const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGamebtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPos =[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]];

function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
        boxes.forEach((box,index) =>{
            box.innerText= "";
            boxes[index].style.pointerEvents = "all";


            box.classList = `box box${index+1}`;
        });
 
    newGamebtn.classList.remove("active");

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
 
initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
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
        gameInfo.innerHTML = `Winner Player - ${answer}`;
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
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGamebtn.addEventListener("click", initGame);