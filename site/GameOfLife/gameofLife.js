"use strict";

let rows = 10;
let cols = 10;
let cycleTime = 1;
let grid = createEmptyGrid();
let intervalId;
let previousStates = [];
let isInfiniteLoop = false;
let cycleCounter = 0;

function createEmptyGrid() {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function applyChanges() {
  rows = parseInt(document.getElementById('rows').value, 10);
  cols = parseInt(document.getElementById('cols').value, 10);
  cycleTime = parseFloat(document.getElementById('cycle-time').value);
  grid = createEmptyGrid();
  updateGrid();
}

function toggleCell(row, col) {
  grid[row][col] = grid[row][col] === 1 ? 0 : 1;
  updateGrid();
}

function updateGrid() {
  const gridContainer = document.getElementById('grid');
  gridContainer.innerHTML = '';
  checkGameStatus();

  gridContainer.style.gridTemplateColumns = `repeat(${cols}, 20px)`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (grid[i][j] === 1) {
        cell.classList.add('alive');
      } else {
        cell.classList.add('dead');
      }
      cell.addEventListener('click', () => toggleCell(i, j));
      gridContainer.appendChild(cell);
    }
  }
}

function clearGrid() {
  grid = createEmptyGrid();
  updateGrid();
  stopGame();
  previousStates = [];
  isInfiniteLoop = false;
  cycleCounter = 0;
  updateCycleCounter();
}

function startGame() {
  stopGame();
  isInfiniteLoop = false;
  cycleCounter = 0;
  updateCycleCounter();
  intervalId = setInterval(updateGame, cycleTime * 1000);
}

function stopGame() {
  clearInterval(intervalId);
}

function updateGame() {
  if (isInfiniteLoop) {
    alert("Game over.\nThe game has entered an infinite loop.\nPress 'OK' to start a new game.");
    stopGame();
    return;
  }

  const newGrid = createEmptyGrid();
  previousStates.push(JSON.stringify(grid));

  if (previousStates.length > 1) {
    const prevState = JSON.parse(previousStates[previousStates.length - 2]);
    const currentState = JSON.parse(previousStates[previousStates.length - 1]);
    const totalChanges = countChanges(prevState, currentState);

    if (totalChanges <= 0) {
      isInfiniteLoop = true;
      stopGame();
      alert("Game over.\nThe game has entered an infinite loop.\nPress 'OK' to start a new game.");
      return;
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const neighbors = countAliveNeighbors(i, j);
      if (grid[i][j] === 1) {
        if (neighbors === 2 || neighbors === 3) {
          newGrid[i][j] = 1;
        }
      } else {
        if (neighbors === 3) {
          newGrid[i][j] = 1;
        }
      }
    }
  }

  grid = newGrid;
  updateGrid();
  cycleCounter++;
  updateCycleCounter();
}

function countChanges(prevState, currentState) {
  let changes = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (prevState[i][j] !== currentState[i][j]) {
        changes++;
      }
    }
  }
  return changes;
}

function countAliveNeighbors(row, col) {
  let count = 0;

  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      const wrappedRow = (i + rows) % rows;
      const wrappedCol = (j + cols) % cols;

      if (!(i === row && j === col)) {
        count += grid[wrappedRow][wrappedCol];
      }
    }
  }

  return count;
}

function checkGameStatus() {
  const aliveCells = grid.flat().some(cell => cell === 1);

  if (!aliveCells && intervalId) {
    alert("Game over.\nAll cells are dead.\nPress 'OK' to start a new game.");
    stopGame();
  }
}

function randomizeGrid() {
  grid = Array.from({ length: rows }, () => Array(cols).fill(0).map(() => Math.round(Math.random())));
  updateGrid();
}

function updateCycleCounter() {
  const cycleCounterElement = document.getElementById('cycle-counter');
  cycleCounterElement.textContent = `Cycle: ${cycleCounter}`;
}

updateGrid();
