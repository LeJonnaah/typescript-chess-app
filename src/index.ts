import express from 'express';
import boardRouter from './routes/board';

const app = express();
app.use(express.json());
const PORT = 3000;


const chessBoard = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
];

function canQueenMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (fromX === toX || fromY === toY) {
        return true;
    }
    if (Math.abs(fromX - toX) === Math.abs(fromY - toY)) {
        return true;
    }
    return false;
}

function canRookMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (fromX === toX || fromY === toY) {
        return true;
    }
    return false;
}

function canBishopMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (Math.abs(fromX - toX) === Math.abs(fromY - toY)) {
        return true;
    }
    return false;
}

function canKnightMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (Math.abs(fromX - toX) === 2 && Math.abs(fromY - toY) === 1) {
        return true;
    }
    if (Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 2) {
        return true;
    }
    return false;
}

function canKingMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (Math.abs(fromX - toX) <= 1 && Math.abs(fromY - toY) <= 1) {
        return true;
    }
    return false;
}

function canPawnMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (fromX === toX && fromY - toY === 1) {
        return true;
    }
    return false;
}

function isMovePossible(piece: string, fromX: number, fromY: number, toX: number, toY: number) {
    switch (piece) {
        case 'queen':
            return canQueenMove(fromX, fromY, toX, toY);
        case 'rook':
            return canRookMove(fromX, fromY, toX, toY);
        case 'bishop':
            return canBishopMove(fromX, fromY, toX, toY);
        case 'knight':
            return canKnightMove(fromX, fromY, toX, toY);
        case 'king':
            return canKingMove(fromX, fromY, toX, toY);
        case 'pawn':
            return canPawnMove(fromX, fromY, toX, toY);
        default:
            return false;
    }
}

function isMoveLegal(piece: string, fromX: number, fromY: number, toX: number, toY: number) {
    if (fromX < 0 || fromX > 7 || fromY < 0 || fromY > 7 || toX < 0 || toX > 7 || toY < 0 || toY > 7) {
        return false;
    }
    if (fromX === toX && fromY === toY) {
        return false;
    }
    return isMovePossible(piece, fromX, fromY, toX, toY);
}

function fillBoard() {
    chessBoard[0][0] = 'rook';
    chessBoard[0][1] = 'knight';
    chessBoard[0][2] = 'bishop';
    chessBoard[0][3] = 'queen';
    chessBoard[0][4] = 'king';
    chessBoard[0][5] = 'bishop';
    chessBoard[0][6] = 'knight';
    chessBoard[0][7] = 'rook';
    for (let i = 0; i < 8; i++) {
        chessBoard[1][i] = 'pawn';
    }
    chessBoard[7][0] = 'rook';
    chessBoard[7][1] = 'knight';
    chessBoard[7][2] = 'bishop';
    chessBoard[7][3] = 'queen';
    chessBoard[7][4] = 'king';
    chessBoard[7][5] = 'bishop';
    chessBoard[7][6] = 'knight';
    chessBoard[7][7] = 'rook';
    for (let i = 0; i < 8; i++) {
        chessBoard[6][i] = 'pawn';
    }
}

function randomPawnMove() {
    const fromX = Math.floor(Math.random() * 8);
    const fromY = Math.floor(Math.random() * 8);
    const toX = fromX;
    const toY = fromY - 1;
    return { fromX, fromY, toX, toY };
}

app.post('/pawnMove', (req, res) => {
    const { fromX, fromY, toX, toY } = randomPawnMove();
    if (isMoveLegal('pawn', fromX, fromY, toX, toY)) {
        chessBoard[toY][toX] = 'pawn';
        chessBoard[fromY][fromX] = null;
        res.send(chessBoard);
    } else {
        res.status(400).send('Illegal move!');
        console.log(req.body);
    }
});

app.post('/move', (req, res) => {
    const { piece, fromX, fromY, toX, toY } = req.body;
    if (isMoveLegal(piece, fromX, fromY, toX, toY)) {
        chessBoard[toY][toX] = piece;
        chessBoard[fromY][fromX] = null;
        res.send(chessBoard);
    } else {
        res.status(400).send('Illegal move!');
        console.log(req.body);
    }
});

app.get('/board', (_req, res) => {
    fillBoard();
    res.send(chessBoard);
});


app.use('/api/board', boardRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
