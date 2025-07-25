
function Ship(length) {
  let hits = 0;

  function hit() {
    if (hits < length) hits++;
  }

  function isSunk() {
    return hits >= length;
  }

  return {
    length,
    hit,
    isSunk,
  };
}

export default Ship;