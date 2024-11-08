"use strict"
const cellElements = document.querySelectorAll(".game-board .cell");
const Player1 = document.querySelector(".players .player1");
const Player2 = document.querySelector(".players .player2");
const result  = document.querySelector(".result");
const result_text = document.querySelector(".result h1");
const restart_btn = document.querySelector(".result button");
const WINNING_CONDITION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const PlayerO = "O";
const PlayerX = "X";

let toggleTurn = true;
cellElements.forEach(cell => {
    cell.onclick=()=> {
      let currentPlayer =  toggleTurn ? PlayerO : PlayerX;
        cell.classList.add('disabled')
        cell.innerHTML = currentPlayer;
        addIn(cell, currentPlayer);

        if (winnerCheck(currentPlayer)){
            // console.log(currentPlayer + " Winner ");
            addInactive();
            result_text.innerText = currentPlayer + " Win the game";
        }else if(isDraw()){
            addInactive();
            result_text.innerText = "Draw the game";
            // console.log("Draw");
        }else {
            swapPlayer();
        }

       
    }
});

function winnerCheck(currentPlayer) {
    return WINNING_CONDITION.some(condtion => {
        // console.log(condtion);
       return condtion.every(index=>{
        // console.log(index);
       return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

function isDraw() {
   return [...cellElements].every(cell=>{
        return cell.classList.contains(PlayerX) || cell.classList.contains(PlayerO);
    })
}

function swapPlayer() {
    toggleTurn = !toggleTurn;
    if(toggleTurn){
        Player1.classList.add("active");
        Player2.classList.remove("active");
    }else {
        Player2.classList.add("active");
        Player1.classList.remove("active");
    }
}

function addIn(cell,currentPlayer){
    cell.innerHTML = currentPlayer;
    cell.classList.add(currentPlayer);
}

function addInactive() {
    result.classList.remove("inactive");
}

restart_btn.onclick=() => {
    location.reload();
}