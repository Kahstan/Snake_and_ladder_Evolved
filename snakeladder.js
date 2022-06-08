//create dice
let hasCompleted = false;
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
    if (ladder.start === currentPlayer.position && ladder.end > ladder.start) {
      console.log("You Stepped On A Ladder! Wooo!! ");
      currentPlayer.position = ladder.end;
    }
  });

  snakes.forEach((snake) => {
    if (snake.start === currentPlayer.position && snake.end < snake.start) {
      console.log("You Stepped On A Snake! Bye!! ");
      currentPlayer.position = snake.end;
    }
  });
  //when the player goes out of the board
  if (currentPlayer.position >= position) {
    hasCompleted = true;
    alert(
      `${player[currentPlayerTurn].name} has won!!!! Press restart to start a new game.`
    );
  }
  currentPlayerTurn++;
  if (currentPlayerTurn >= player.length) {
    currentPlayerTurn = 0;
  }
  actualBoard();
};

//add players here, but requires tweaks
const player = [
  { name: "Player1", position: 0, color: "black" },
  { name: "Player2", position: 0, color: "white" },
];

// ladders are both snakes and ladders just different colors from canvas
const ladders = [
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
];

const snakes = [
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
  {
    start: Math.floor(Math.random() * 110) + 1,
    end: Math.floor(Math.random() * 110) + 1,
  },
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
    board.forEach((row) => {
      //loop through the square and appends it into the board
      row.forEach((square) => {
        if (square.position === player.position) {
          console.log("You are here!", square);
          actualBoardHTML += `<div class=player style="top:${
            square.y * boardSizeConst + 5
          }px; 
          left:${square.x * boardSizeConst + 5}px; background-color: ${
            player.color
          }"></div>`;
        }
      });
    });
  });
  //same as above to figure out where the ladders position to start and end
  ladders.forEach((ladder) => {
    let startPos = { x: 0, y: 0 };
    let endPos = { x: 0, y: 0 };
    board.forEach((row) => {
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

    if (ladder.end > ladder.start) {
      drawLadder({ color: "#804005", startPos, endPos });
    }
  });

  snakes.forEach((snake) => {
    let startPos = { x: 0, y: 0 };
    let endPos = { x: 0, y: 0 };
    board.forEach((row) => {
      row.forEach((square) => {
        if (square.position === snake.start) {
          startPos.x = square.x * boardSizeConst;
          startPos.y = square.y * boardSizeConst;
        }
        if (square.position === snake.end) {
          endPos.x = square.x * boardSizeConst;
          endPos.y = square.y * boardSizeConst;
        }
      });
    });
    if (snake.end < snake.start) {
      drawLine({ color: "green", startPos, endPos });
    }
    // there are invisible snakes and ladders in the console that still draws even when the condition is not met
  });

  document.getElementById("board").innerHTML = actualBoardHTML;
};

//drawing a line in canvas by putting in x and y values
function drawLine({ color, startPos, endPos }) {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  var grd = ctx.createLinearGradient(0, 0, 500, 0);
  grd.addColorStop(0, "yellow");
  grd.addColorStop(0.2, "green");
  grd.addColorStop(0.4, "yellow");
  grd.addColorStop(0.6, "green");
  grd.addColorStop(0.8, "yellow");
  grd.addColorStop(0.9, "green");
  grd.addColorStop(1, "yellow");
  ctx.beginPath();
  ctx.arc(startPos.x + 25, startPos.y + 25, 5, 0, 2 * Math.PI);
  ctx.moveTo(startPos.x + 25, startPos.y + 25);
  ctx.lineTo(endPos.x + 25, endPos.y + 25);
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.setLineDash([40, 1]);
  ctx.lineWidth = 15;
  ctx.strokeStyle = grd;
  ctx.stroke();
}

function drawLadder({ color, startPos, endPos }) {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(startPos.x + 25, startPos.y + 25);
  ctx.lineTo(endPos.x + 25, endPos.y + 25);
  ctx.fill();
  ctx.setLineDash([15, 3]);
  ctx.lineWidth = 30;
  ctx.strokeStyle = color;
  ctx.stroke();
}
actualBoard();

//create 2 functions, 1 for ladders and 1 for snake.
//can always make a teleportation to teleport the player around the map. alternative
