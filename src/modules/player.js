// Player.js

import Gameboard from './gameboard.js';

export default function Player(name = 'Human') {
  return {
    name,
    gameboard: Gameboard(),
  };
}