// const cells = document.querySelectorAll(".cell")
// const statusText = document.querySelector("#statusText")
// const restartBtn = document.querySelector("#restartBtn")
// const winConditions = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
// ]

// let options = ["", "", "", "", "", "", "", "", ""]
// let currentPlayer = "X"
// let running = false

// initializeGame()

// function initializeGame() {
//     cells.forEach(cell => cell.addEventListener("click", cellClicked))
//     restartBtn.addEventListener("click", restartGame)
//     statusText.textContent = `${currentPlayer}'s turn`
//     running = true
// }

// // function cellClicked(){
// //     const cellIndex = this.getAttribute("cellIndex");

// //     if(options[cellIndex] != "" || !running){
// //         return
// //     }

// //     updateCell(this, cellIndex)
// //     checkWinner()
// //     changePlayer()

// //}

// // function updateCell(cell, index) {
// // options[index] = currentPlayer
// // cell.textContent = currentPlayer
// // }

// function updateCell(cell, index) {
//     options[index] = currentPlayer;

//     // Define o conteúdo da célula com base no jogador atual
//     cell.textContent = currentPlayer === "X" ? "X" : "O";
// }

// function changePlayer() {
//     currentPlayer = (currentPlayer === "X") ? "O" : "X";
//     statusText.textContent = `${currentPlayer}'s turn`;
//     console.log(`Changed to player ${currentPlayer}`);
// }

// function cellClicked() {
//     const cellIndex = this.getAttribute("cellIndex");

//     if (options[cellIndex] !== "" || !running) {
//         console.log(`Cell ${cellIndex} already filled or game not running`);
//         return;
//     }

//     updateCell(this, cellIndex);
//     checkWinner();
//     changePlayer();
//     console.log(`Cell ${cellIndex} clicked. Current player: ${currentPlayer}`);
// }

// function changePlayer () {
//     currentPlayer = (currentPlayer === "X") ? "O" : "X"
// statusText.textContent = `${currentPlayer}'s turn`
// }

// function checkWinner () {
// let roundWon = false

// for (let i = 0; i < winConditions.length; i++) {
//     const condition = winConditions[i]
//     const cellA = options[condition[0]]
//     const cellB = options[condition[1]]
//     const cellC = options[condition[2]]

//     if (cellA === "" || cellB === "" || cellC === "") {
//         continue
//     }
//     if (cellA === cellB && cellB === cellC) {
//         roundWon = true
//         break

//     }
// }

// if (roundWon) {
//     statusText.textContent = `${currentPlayer} wins!`
//     running = false

// }
// else if(options.includes("")) {
//     statusText.textContent = `Draw!`
//     running = false;
// }
// else{
//     changePlayer()
// }

// }

// function restartGame () {
//     currentPlayer = "X"
//     options = ["", "", "", "", "", "", "", "", ""]
//     statusText.textContent = `${currentPlayer}'s turn`
//     cells.forEach(cell => cell.textContent = "")
//     running = true
// }

const boardRegions = document.querySelectorAll("#gameBoard span");
let vBoard = [];
let turnPlayer = "";

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer);
  document.getElementById("turnPlayer").innerText = playerInput.value;
}

function initializeGame() {
  vBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  document.querySelector("h2").innerHTML =
    'Vez de: <span id="turnPlayer"></span>';
  updateTitle();
  boardRegions.forEach(function (element) {
    element.classList.remove("win");
    element.innerText = "";
    element.classList.add("cursor-pointer");
    element.addEventListener("click", handleBoardClick);
  });
}

function getWinRegions() {
  const winRegions = [];
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[0][1] &&
    vBoard[0][0] === vBoard[0][2]
  )
    winRegions.push("0.0", "0.1", "0.2");
  if (
    vBoard[1][0] &&
    vBoard[1][0] === vBoard[1][1] &&
    vBoard[1][0] === vBoard[1][2]
  )
    winRegions.push("1.0", "1.1", "1.2");
  if (
    vBoard[2][0] &&
    vBoard[2][0] === vBoard[2][1] &&
    vBoard[2][0] === vBoard[2][2]
  )
    winRegions.push("2.0", "2.1", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][0] &&
    vBoard[0][0] === vBoard[2][0]
  )
    winRegions.push("0.0", "1.0", "2.0");
  if (
    vBoard[0][1] &&
    vBoard[0][1] === vBoard[1][1] &&
    vBoard[0][1] === vBoard[2][1]
  )
    winRegions.push("0.1", "1.1", "2.1");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][2] &&
    vBoard[0][2] === vBoard[2][2]
  )
    winRegions.push("0.2", "1.2", "2.2");
  if (
    vBoard[0][0] &&
    vBoard[0][0] === vBoard[1][1] &&
    vBoard[0][0] === vBoard[2][2]
  )
    winRegions.push("0.0", "1.1", "2.2");
  if (
    vBoard[0][2] &&
    vBoard[0][2] === vBoard[1][1] &&
    vBoard[0][2] === vBoard[2][0]
  )
    winRegions.push("0.2", "1.1", "2.0");
  return winRegions;
}

function disableRegion(element) {
  element.classList.remove("cursor-pointer");
  element.removeEventListener("click", handleBoardClick);
}

function handleWin(regions) {
  regions.forEach(function (region) {
    document
      .querySelector('[data-region="' + region + '"]')
      .classList.add("win");
  });
  const playerName = document.getElementById(turnPlayer).value;
  document.querySelector("h2").innerHTML = playerName + " venceu!";
}

function handleBoardClick(ev) {
  const span = ev.currentTarget;
  const region = span.dataset.region;
  const rowColumnPair = region.split(".");
  const row = rowColumnPair[0];
  const column = rowColumnPair[1];

  if (turnPlayer === "player1") {
    span.innerText = "X";
    vBoard[row][column] = "X";
  } else {
    span.innerText = "O";
    vBoard[row][column] = "O";
  }
  console.clear();
  console.table(vBoard);
  //Desabilita a função clicada
  disableRegion(span);
  const winRegions = getWinRegions();
  if (winRegions.length > 0) {
    console.log("Venceu!");
    handleWin(winRegions);
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
  } else if (vBoard.flat().includes("")) {
    turnPlayer = turnPlayer === "player1" ? "player2" : "player1";
    updateTitle();
  } else {
    document.querySelector("h2").innerHTML = "Empate!";
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
  }
}

document.getElementById("start").addEventListener("click", initializeGame);
document.getElementById("restart").addEventListener("click", initializeGame);

// document.getElementById('player1').value = ''
// document.getElementById('player2').value = ''
