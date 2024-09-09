var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}
var board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] != 0) {
        arr[i][j].innerText = board[i][j];
      } else arr[i][j].innerText = "";
    }
  }
}

let GetPuzzle = document.getElementById("GetPuzzle");
let SolvePuzzle = document.getElementById("SolvePuzzle");

GetPuzzle.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response);
    board = response.board;
    FillBoard(board);
  };

  xhrRequest.open("get", "https://sugoku.onrender.com/board?difficulty=easy");
  xhrRequest.send();
};

SolvePuzzle.onclick = () => {
  SudokuSolver(board, 0, 0, 9);

  FillBoard(board);
};
function isValid(board, row, col, c) {
  for (let i = 0; i < 9; i++) {
    if (board[i][col] == c) return false;
    if (board[row][i] == c) return false;
    if (board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3) ] == c ) return false;
  }
  return true;
}

function SudokuSolver(board, i, j, n) {
  if (i == n) return true;
  if (j == n) return SudokuSolver(board, i + 1, 0, n);
  if (board[i][j] != "") return SudokuSolver(board, i, j + 1, n);

  for (let c = "1"; c <= "9"; c++) {
    if (isValid(board, i, j, c)) {
      board[i][j] = c;
      if (SudokuSolver(board, i, j + 1, n)) return true;
      board[i][j] = "";
    }
  }
  return false;
}
