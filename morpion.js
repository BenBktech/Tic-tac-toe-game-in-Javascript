const TILE_STATUSES = {
    NOTPLAYED: 'notPlayed',
    ROUND: 'round',
    CROSS: 'cross'
}

const PLAYERS = {
    PLAYER1: 'player1',
    PLAYER2: 'player2'
}

export function createBoard() {
    const board = [];
    for(let x = 0 ; x < 3 ; x++) {
        const row = [];
        for(let y = 0 ; y < 3 ; y++) {
            const element = document.createElement('div');
            element.dataset.status = TILE_STATUSES.NOTPLAYED;
            const tile = {
                element,
                x,
                y,
                player: '',
                get status() {
                    return this.element.dataset.status;
                },
                set status(value) {
                    this.element.dataset.status = value;
                }
            }
            row.push(tile);
        }
        board.push(row);
    }
    return board;
}

export function changeStatusTile(board, tile, numberOfTurns) {
    let returnNumberOfTurns = numberOfTurns;
    if(tile.status === TILE_STATUSES.NOTPLAYED) {
        if(numberOfTurns % 2 === 0) {
            tile.status = TILE_STATUSES.ROUND;
            tile.player = PLAYERS.PLAYER2;
        }
        else {
            tile.player = PLAYERS.PLAYER1;
            tile.status = TILE_STATUSES.CROSS;
        }
        returnNumberOfTurns++
        return returnNumberOfTurns;
    }
    else {
        return returnNumberOfTurns;
    }
}

export function whichPlayersTurn(step, numberOfTurns) {
    if(numberOfTurns % 2 == 0) step.innerHTML = "It's <span class='stepplayer2'>Player 2</span>'s turn!";
    else step.innerHTML = "It's <span class='stepplayer1'>Player 1</span>'s turn!";
}

export function didSomeoneWon(board, step) {
    //Rows
    if(board[0][0].player === board[0][1].player && board[0][1].player === board[0][2].player && board[0][0].player !== '') {
        step.innerHTML = "<span class='step"+board[0][0].player+"'>"+board[0][0].player + "</span> won!";
        return true;
    }
    if(board[1][0].player === board[1][1].player && board[1][1].player === board[1][2].player && board[1][0].player !== '') {
        step.innerHTML = "<span class='step"+board[1][0].player+"'>"+board[1][0].player + "</span> won!";
        return true;
    }
    if(board[2][0].player === board[2][1].player && board[2][1].player === board[2][2].player && board[2][0].player !== '') {
        step.innerHTML = "<span class='step"+board[2][0].player+"'>"+board[2][0].player + "</span> won!";
        return true;
    }

    //Columns
    if(board[0][0].player === board[1][0].player && board[1][0].player === board[2][0].player && board[0][0].player !== '') {
        step.innerHTML = "<span class='step"+board[0][0].player+"'>"+board[0][0].player + "</span> won!";
        return true;
    }
    if(board[0][1].player === board[1][1].player && board[1][1].player === board[2][1].player && board[0][1].player !== '') {
        step.innerHTML = "<span class='step"+board[0][1].player+"'>"+board[0][1].player + "</span> won!";
        return true;
    }
    if(board[0][2].player === board[1][2].player && board[1][2].player === board[2][2].player && board[0][2].player !== '') {
        step.innerHTML = "<span class='step"+board[0][2].player+"'>"+board[0][2].player + "</span> won!";
        return true;
    }

    //Diagonals
    if(board[0][0].player === board[1][1].player && board[1][1].player === board[2][2].player && board[0][0].player !== '') {
        step.innerHTML = "<span class='step"+board[0][0].player+"'>"+board[0][0].player + "</span> won!";
        return true;
    }
    if(board[2][0].player === board[1][1].player && board[1][1].player === board[0][2].player && board[2][0].player !== '') {
        step.innerHTML = "<span class='step"+board[2][0].player+"'>"+board[2][0].player + "</span> won!";
        return true;
    }

    //Null ?
    let lastElements;
    if(lastElements = board.filter(row => {
        if(row[0].player !== '' && row[1].player !== '' && row[2].player !== '') {
            return true;
        }
        else {
            return false;
        }
    }).length === 3) {
        step.innerHTML = "DRAW!"
        return false;
    }
    return false;
}