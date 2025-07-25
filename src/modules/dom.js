// dom.js

const playerBoard = document.getElementById('player-board');
const enemyBoard = document.getElementById('enemy-board');

function renderBoard(container, gameboard, showShips = false) {
  container.innerHTML = '';
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = x;
      cell.dataset.y = y;

      if (showShips && gameboard.ships.some(ship =>
        ship.coordinates.some(([sx, sy]) => sx === x && sy === y)
      )) {
        cell.classList.add('ship');
      }

      if (gameboard.missedAttacks.some(([mx, my]) => mx === x && my === y)) {
        cell.classList.add('miss');
      }

      if (gameboard.ships.some(ship =>
        ship.hitMap?.some(([hx, hy]) => hx === x && hy === y)
      )) {
        cell.classList.add('hit');
      }

      container.appendChild(cell);
    }
  }
}

function bindEnemyClicks(callback) {
  enemyBoard.addEventListener('click', e => {
    const cell = e.target;
    if (!cell.classList.contains('cell')) return;

    const x = +cell.dataset.x;
    const y = +cell.dataset.y;
    callback(x, y);
  });
}

function showMessage(msg) {
  const messageBox = document.getElementById('message');
  messageBox.textContent = msg;
}

export default {
  renderBoard,
  bindEnemyClicks,
  showMessage,
};
