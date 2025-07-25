// Gameboard.js

import Ship from './ship.js';

export default function Gameboard() {
  const ships = [];
  const missedAttacks = [];

  function placeShip(length, x, y, direction = 'horizontal') {
    const coords = [];

    for (let i = 0; i < length; i++) {
      const cx = direction === 'horizontal' ? x + i : x;
      const cy = direction === 'vertical' ? y + i : y;
      if (cx >= 10 || cy >= 10 || isOccupied(cx, cy)) return false;
      coords.push([cx, cy]);
    }

    const ship = Ship(length);
    ship.coordinates = coords;
    ship.hitMap = [];
    ships.push(ship);
    return true;
  }

  function receiveAttack(x, y) {
    for (const ship of ships) {
      for (const [sx, sy] of ship.coordinates) {
        if (sx === x && sy === y) {
          ship.hit();
          ship.hitMap.push([x, y]);
          return 'hit';
        }
      }
    }
    missedAttacks.push([x, y]);
    return 'miss';
  }

  function alreadyAttacked(x, y) {
    return (
      missedAttacks.some(([mx, my]) => mx === x && my === y) ||
      ships.some(ship =>
        ship.hitMap?.some(([hx, hy]) => hx === x && hy === y)
      )
    );
  }

  function allShipsSunk() {
    return ships.every(ship => ship.isSunk());
  }

  function isOccupied(x, y) {
    return ships.some(ship =>
      ship.coordinates.some(([sx, sy]) => sx === x && sy === y)
    );
  }

  function clear() {
    ships.length = 0;
    missedAttacks.length = 0;
  }

  return {
    placeShip,
    receiveAttack,
    alreadyAttacked,
    allShipsSunk,
    clear,
    missedAttacks,
    ships,
  };
}


