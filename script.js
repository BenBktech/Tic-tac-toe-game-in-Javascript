import { createBoard, changeStatusTile, whichPlayersTurn, didSomeoneWon } from './morpion.js';

const board = createBoard();
const morpion = document.querySelector('.morpion');
const step = document.querySelector('.step');
let someoneWon = false;
let numberOfTurns = 1;

board.forEach(row => {
    row.forEach(tile => {
        morpion.append(tile.element);
        tile.element.addEventListener('click', () => {
            if(!someoneWon) {
                numberOfTurns = changeStatusTile(board, tile, numberOfTurns);
                whichPlayersTurn(step, numberOfTurns);
                someoneWon = didSomeoneWon(board, step);
            }
        })
    })
})