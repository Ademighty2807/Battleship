const { Ship, Player, Gameboard } = require('./functions.js')

describe('Player Factory', () => {
  test('creates a player with a gameboard', () => {
    const player = Player('Test');
    expect(player.name).toBe('Test');
    expect(player.gameboard).toBeDefined();
    expect(typeof player.gameboard.receiveAttack).toBe('function');
  });
});

describe('Gameboard Factory', () => {
    let board;

    beforeEach(() => {
      board = Gameboard();
    });
  
    test('places ship correctly', () => {
      const placed = board.placeShip(3, 0, 0, 'horizontal');
      expect(placed).toBe(true);
      expect(board.ships.length).toBe(1);
    });
  
    test('prevents overlapping ships', () => {
      board.placeShip(3, 0, 0);
      const second = board.placeShip(3, 0, 0);
      expect(second).toBe(false);
    });
  
    test('registers hits and misses', () => {
      board.placeShip(2, 1, 1);
      expect(board.receiveAttack(1, 1)).toBe('hit');
      expect(board.receiveAttack(5, 5)).toBe('miss');
      expect(board.missedAttacks).toContainEqual([5, 5]);
    });
  
    test('alreadyAttacked returns true', () => {
      board.receiveAttack(2, 2);
      expect(board.alreadyAttacked(2, 2)).toBe(true);
    });
  
    test('detects all ships sunk', () => {
      board.placeShip(1, 0, 0);
      board.receiveAttack(0, 0);
      expect(board.allShipsSunk()).toBe(true);
    });
});

describe('Ship Factory', () => {
    test('hits increment correctly', () => {
      const ship = Ship(3);
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(false);
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
  
    test('cannot be hit more than length', () => {
      const ship = Ship(2);
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
    });
});