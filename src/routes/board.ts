import express from 'express';
import bodyParser from 'body-parser';

import { isMoveLegal } from '../logic/moves';

const router = express.Router();
router.use(bodyParser.json());


const chessBoard = [
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
];


const pieceIndices: { piece: string, row: number, col: number }[] = [];

for (let row = 0; row < chessBoard.length; row++) {
    for (let col = 0; col < chessBoard[row].length; col++) {
        const piece = chessBoard[row][col];
        if (piece !== null) {
            pieceIndices.push({ piece, row, col });
        }
    }
}

console.log(pieceIndices);

router.get('/', (_req, res) => {
    res.send(chessBoard);
});

// function artificialIntelligence() {
//     const randomIndex = Math.floor(Math.random() * pieceIndices.length);
//     const { piece, row, col } = pieceIndices[randomIndex];
//     const toRow = Math.floor(Math.random() * 8);
//     const toCol = Math.floor(Math.random() * 8);
//     if (isMoveLegal(piece, col, row, toCol, toRow)) {
//         chessBoard[toRow][toCol] = piece;
//         chessBoard[row][col] = null;
//     }
//     console.log(chessBoard);
// }

// setInterval(artificialIntelligence, 1000);


router.post('/play', (_req, res) => {
    res.send(chessBoard);
});

router.post('/move', (req, res) => {
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

export default router;