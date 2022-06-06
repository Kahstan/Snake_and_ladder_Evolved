//create dice
let hasWon = false;
window.rollDice = () => {
  //  //dice with random numbers from 1-6 and displaying the roll number on the html
  roll = Math.ceil(Math.random() * 6);
  let displayNum = document.querySelector("#diceNum");
  displayNum.innerHTML = roll;
  //adds the number to player's position.
  let currentPlayer = player[currentPlayerTurn];
  currentPlayer.position += roll;
  //restart button that reloads the game
  window.gameReset = () => {
    location.reload();
  };
  // when the player rolls the dice and the ladder position is the same as player position, the player moves to the end of the ladder position
  ladders.forEach((ladder) => {
    if (ladder.start === currentPlayer.position) {
      console.log("You Stepped On A Snake or Ladder!");
      currentPlayer.position = ladder.end;
    }
  });

  if (currentPlayer.position === position) {
    hasWon = true;
    alert("You have completed the course!");
  }

  actualBoard();
};

//add players here.
const player = [{ name: "Player1", position: 0, color: "black" }];

// ladders are both snakes and ladders just different colors.
const ladders = [
  { start: 2, end: 24 },
  { start: 50, end: 25 },
  { start: 26, end: 46 },
];

let currentPlayerTurn = 0;

const width = 10;
const height = 10;
const board = [];
let position = 0; //everytime you start the loop, the increment starts from 0

// to reverse engineer the process by starting at bottom left, x and y to represent x and y on the board
for (let y = height; y >= 0; y--) {
  let row = [];
  board.push(row); //push the new array into the board
  for (let x = 0; x < width; x++) {
    row.push({
      x,
      y,
      position,
    });
    position++;
  }
}

let boardSizeConst = 50;

//loop through the board and create the board
const actualBoard = () => {
  let actualBoardHTML = "";
  board.forEach((row) => {
    row.forEach((square) => {
      actualBoardHTML += `<div class=square style="top:${
        square.y * boardSizeConst
      }px;
      left:${square.x * boardSizeConst}px; background-color: ${
        square.color
      }"></div>`;
    });
  });

  player.forEach((player) => {
    //loop through the player
    // let square = null;
    board.forEach((row) => {
      //loop through the square
      row.forEach((square) => {
        if (square.position === player.position) {
          console.log("You are here!", square);
          actualBoardHTML += `<div class=player style="top:${
            square.y * boardSizeConst + 5
          }px; 
          left:${square.x * boardSizeConst + 5}px; background-color: ${
            player.color
          }"></div>`; // append it into the board
        }
      });
    });
  });

  ladders.forEach((ladder) => {
    let startPos = { x: 0, y: 0 };
    let endPos = { x: 0, y: 0 };
    board.forEach((row) => {
      //same as above to figure out where the ladders position to start and end
      row.forEach((square) => {
        if (square.position === ladder.start) {
          startPos.x = square.x * boardSizeConst;
          startPos.y = square.y * boardSizeConst;
        }
        if (square.position === ladder.end) {
          endPos.x = square.x * boardSizeConst;
          endPos.y = square.y * boardSizeConst;
        }
      });
    });
    const isLadder = ladder.end > ladder.start;
    // if the ladder end is bigger than ladder start, color will be red, if not green.
    drawLine({ color: isLadder ? "green" : "#b28949", startPos, endPos });
  });
  document.getElementById("board").innerHTML = actualBoardHTML;
};

//drawing a line in canvas by putting in x and y values
function drawLine({ color, startPos, endPos }) {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(startPos.x + 25, startPos.y + 25);
  ctx.lineTo(endPos.x + 25, endPos.y + 25);
  ctx.lineWidth = 15;
  ctx.strokeStyle = color;
  ctx.stroke();
}
actualBoard();
