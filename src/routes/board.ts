import express from 'express';
import bodyParser from 'body-parser';

import { isMoveLegal } from '../logic/moves';

const router = express.Router();
router.use(bodyParser.json());


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



router.post('/move', (req, res) => {
    const { piece, fromX, fromY, toX, toY } = req.body;
    if (isMoveLegal(piece, fromX, fromY, toX, toY)) {
        chessBoard[toY][toX] = piece;
        chessBoard[fromY][fromX] = null;
        res.send(chessBoard);
    } else {
        res.status(400).send('Illegal move!');
    }
});

export default router;