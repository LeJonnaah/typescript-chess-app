import express from 'express';
import bodyParser from 'body-parser';

import { chessBoard, movePiece } from '../logic/play';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (_req, res) => {
    res.send(chessBoard);
});

router.post('/move', (req, res) => {
    const { fromX, fromY, toX, toY } = req.body;
    const result = movePiece(chessBoard, fromX, fromY, toX, toY);
    res.send({ result });
});

export default router;