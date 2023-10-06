import { 
    movePawnLogic,
    moveRookLogic,
    moveKnightLogic,
    moveQueenLogic,
    moveKingLogic,
    moveBishopLogic,
} from "./movementLogic";

export enum Color {
    White = 'white',
    Black = 'black',
}

export enum PieceType {
    King = 'king',
    Queen = 'queen',
    Rook = 'rook',
    Bishop = 'bishop',
    Knight = 'knight',
    Pawn = 'pawn',
}

export interface ChessPiece {
    type: PieceType;
    color: Color;
}

export type ChessBoard = ChessPiece[][];

export function initializeChessBoard(): ChessBoard {
    const board: ChessBoard = [];

    //Empty board
    for (let i = 0; i < 8; i++) {
        board.push(new Array(8));
    }

    board[0][0] = { type: PieceType.Rook, color: Color.Black };
    board[0][1] = { type: PieceType.Knight, color: Color.Black };
    board[0][2] = { type: PieceType.Bishop, color: Color.Black };
    board[0][3] = { type: PieceType.Queen, color: Color.Black };
    board[0][4] = { type: PieceType.King, color: Color.Black };
    board[0][5] = { type: PieceType.Bishop, color: Color.Black };
    board[0][6] = { type: PieceType.Knight, color: Color.Black };
    board[0][7] = { type: PieceType.Rook, color: Color.Black };

    board[1][0] = { type: PieceType.Pawn, color: Color.Black };
    board[1][1] = { type: PieceType.Pawn, color: Color.Black };
    board[1][2] = { type: PieceType.Pawn, color: Color.Black };
    board[1][3] = { type: PieceType.Pawn, color: Color.Black };
    board[1][4] = { type: PieceType.Pawn, color: Color.Black };
    board[1][5] = { type: PieceType.Pawn, color: Color.Black };
    board[1][6] = { type: PieceType.Pawn, color: Color.Black };
    board[1][7] = { type: PieceType.Pawn, color: Color.Black };

    board[6][0] = { type: PieceType.Pawn, color: Color.White };
    board[6][1] = { type: PieceType.Pawn, color: Color.White };
    board[6][2] = { type: PieceType.Pawn, color: Color.White };
    board[6][3] = { type: PieceType.Pawn, color: Color.White };
    board[6][4] = { type: PieceType.Pawn, color: Color.White };
    board[6][5] = { type: PieceType.Pawn, color: Color.White };
    board[6][6] = { type: PieceType.Pawn, color: Color.White };
    board[6][7] = { type: PieceType.Pawn, color: Color.White };

    board[7][0] = { type: PieceType.Rook, color: Color.White };
    board[7][1] = { type: PieceType.Knight, color: Color.White };
    board[7][2] = { type: PieceType.Bishop, color: Color.White };
    board[7][3] = { type: PieceType.Queen, color: Color.White };
    board[7][4] = { type: PieceType.King, color: Color.White };
    board[7][5] = { type: PieceType.Bishop, color: Color.White };
    board[7][6] = { type: PieceType.Knight, color: Color.White };
    board[7][7] = { type: PieceType.Rook, color: Color.White };

    return board;
}

export const chessBoard = initializeChessBoard();

export function movePiece(board: ChessBoard, fromX: number, fromY: number, toX: number, toY: number): boolean {
    const piece = board[fromX][fromY];

    if (!piece) {
        return false;
    }

    switch (piece.type) {
        case PieceType.King:
            if (moveKingLogic(fromX, fromY, toX, toY)) {
                return true;
            }
            break;
        case PieceType.Queen:
            if (moveQueenLogic(fromX, fromY, toX, toY)) {
                return true;
            }
            break;
        case PieceType.Rook:
            if (moveRookLogic(fromX, fromY, toX, toY)) {
                console.log('Torre movida');
                return true;
            }
            break;
        case PieceType.Bishop:
            if (moveBishopLogic(fromX, fromY, toX, toY)) {
                return true;
            }
            break;
        case PieceType.Knight:
            if (moveKnightLogic(fromX, fromY, toX, toY)) {
                return true;
            }
            break;
        case PieceType.Pawn:
            if (movePawnLogic(fromX, fromY, toX, toY)) {
                return true;
            }
            break;
    }

    return false;
}