console.log("Welcome!");

let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgame = document.querySelector("#newgame-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerx,playerO
let count = 0;

const winPattren = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "blue";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "brown";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let gamewinner = checkWinner();

    if (count === 9 && !gamewinner) {
      gameDraw();
    }
  });
});

function gameDraw() {
  msg.innerText = "Game Was Draw.";
  msgcontainer.classList.remove("hide");
  msgcontainer.classList.add("draw");
  setTimeout(() => {
    msgcontainer.classList.remove("draw");
  }, 900);

  disabled();
}

const showWinner = (winner) => {
  msg.innerText = `Congrats, Winner is ${winner}`;
  msgcontainer.classList.remove("hide");
  disabled();
};

const disabled = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const checkWinner = () => {
  for (let pattern of winPattren) {
    let pat1val = boxes[pattern[0]].innerText;
    let pat2val = boxes[pattern[1]].innerText;
    let pat3val = boxes[pattern[2]].innerText;

    if (pat1val != "" && pat2val != "" && pat3val != "") {
      if (pat1val === pat2val && pat2val === pat3val) {
        console.log("winner !!!", pat1val);
        showWinner(pat1val);
        return true;
      }
    }
  }
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enable();
  msgcontainer.classList.add("hide");
};

function enable() {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}

newgame.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
