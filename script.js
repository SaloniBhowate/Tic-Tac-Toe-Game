const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restart');
const showWinnerButton = document.getElementById('show-winner');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return currentPlayer;
    }
  }
  return board.includes('') ? null : 'Draw';
}

function updateStatus() {
  const winner = checkWinner();
  if (winner === 'X' || winner === 'O') {
    statusText.textContent = `${winner} wins!`;
    isGameActive = false;
  } else if (winner === 'Draw') {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
  } else {
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (board[index] === '' && isGameActive) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');
    updateStatus();

    if (isGameActive) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
  });
}

function showWinner() {
  const winner = checkWinner();
  if (winner === 'X' || winner === 'O') {
    alert(`The winner is: ${winner}`);
  } else if (winner === 'Draw') {
    alert("It's a draw!");
  } else {
    alert("The game is still ongoing!");
  }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
showWinnerButton.addEventListener('click', showWinner);

statusText.textContent = `Player ${currentPlayer}'s turn`;
