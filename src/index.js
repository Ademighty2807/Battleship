//index.js

import Player from './modules/player.js';
import dom from './modules/dom.js';

const human = Player('You');
const computer = Player('Computer');

placeShipsRandomly(human.gameboard);
placeShipsRandomly(computer.gameboard);

dom.renderBoard(document.getElementById('player-board'), human.gameboard, true);
dom.renderBoard(document.getElementById('enemy-board'), computer.gameboard, false);

// Main game loop
let isGameOver = false;

function handlePlayerAttack(x, y) {
  if (isGameOver || computer.gameboard.alreadyAttacked(x, y)) return;

  computer.gameboard.receiveAttack(x, y);
  dom.renderBoard(document.getElementById('enemy-board'), computer.gameboard, false);

  if (computer.gameboard.allShipsSunk()) {
    dom.showMessage('🎉 You win!')
    isGameOver = true;
    return;
  }

  // Computer turn
  setTimeout(() => {
    let cx, cy;
    do {
      cx = Math.floor(Math.random() * 10);
      cy = Math.floor(Math.random() * 10);
    } while (human.gameboard.alreadyAttacked(cx, cy));

    human.gameboard.receiveAttack(cx, cy);
    dom.renderBoard(document.getElementById('player-board'), human.gameboard, true);

    if (human.gameboard.allShipsSunk()) {
      dom.showMessage('💥 Computer wins!');
      isGameOver = true;
    }
  }, 500);
}

dom.bindEnemyClicks(handlePlayerAttack);

// Optional: Randomize button
document.getElementById('randomize-ships').addEventListener('click', () => {
  human.gameboard.clear();
  placeShipsRandomly(human.gameboard);
  dom.renderBoard(document.getElementById('player-board'), human.gameboard, true);
});

function placeShipsRandomly(gameboard) {
  const lengths = [5, 4, 3, 3, 2];
  lengths.forEach(length => {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const dir = Math.random() > 0.5 ? 'horizontal' : 'vertical';
      placed = gameboard.placeShip(length, x, y, dir);
    }
  });
}
