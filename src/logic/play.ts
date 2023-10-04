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

const kingMoveLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
    const xDiff = Math.abs(fromX - toX);
    const yDiff = Math.abs(fromY - toY);

    return xDiff <= 1 && yDiff <= 1;
}

const movePawnLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
    const pawn = chessBoard[fromX][fromY];

    if (!pawn || pawn.type !== PieceType.Pawn) {
        // La casilla de origen no contiene un peón
        return false;
    }

    const deltaX = toX - fromX;
    const deltaY = toY - fromY;
    const color = pawn.color;

    // Comprobar si el movimiento es válido según el color del peón
    if (
        (color === Color.White && deltaX === -1 && deltaY === 0) || // Avance de una casilla hacia adelante para peón blanco
        (color === Color.Black && deltaX === 1 && deltaY === 0) || // Avance de una casilla hacia adelante para peón negro
        ((color === Color.White && deltaX === -1) || (color === Color.Black && deltaX === 1)) && Math.abs(deltaY) === 1 // Captura diagonal
    ) {
        // Verificar si el destino está vacío (no se puede mover a una casilla ocupada)
        if (!chessBoard[toX][toY]) {
            // Realizamos el movimiento
            chessBoard[toX][toY] = pawn;
            chessBoard[fromX][fromY] = undefined;
            return true;
        }
    }

    // El movimiento no es válido
    return false;
}


const moveQueenLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
    const piece = chessBoard[fromX][fromY];

    if (!piece || piece.type !== PieceType.Queen) {
        // La casilla de origen no contiene una reina
        return false;
    }

    const deltaX = toX - fromX;
    const deltaY = toY - fromY;

    // Comprobar si el movimiento es válido para una reina
    if (deltaX === 0 || deltaY === 0 || Math.abs(deltaX) === Math.abs(deltaY)) {
        // Verificar si hay piezas en el camino
        const xDir = deltaX === 0 ? 0 : deltaX > 0 ? 1 : -1;
        const yDir = deltaY === 0 ? 0 : deltaY > 0 ? 1 : -1;

        let x = fromX + xDir;
        let y = fromY + yDir;

        while (x !== toX || y !== toY) {
            if (chessBoard[x][y]) {
                // Hay una pieza en el camino
                return false;
            }

            x += xDir;
            y += yDir;
        }

        // Realizamos el movimiento
        chessBoard[toX][toY] = piece;
        chessBoard[fromX][fromY] = undefined;
        return true;
    }

    // El movimiento no es válido
    return false;
}

const moveRookLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
    const piece = chessBoard[fromX][fromY];

    if (!piece || piece.type !== PieceType.Rook) {
        // La casilla de origen no contiene una torre
        return false;
    }

    const deltaX = toX - fromX;
    const deltaY = toY - fromY;

    // Comprobar si el movimiento es válido para una torre
    if (deltaX === 0 || deltaY === 0) {
        // Verificar si hay piezas en el camino
        const xDir = deltaX === 0 ? 0 : deltaX > 0 ? 1 : -1;
        const yDir = deltaY === 0 ? 0 : deltaY > 0 ? 1 : -1;

        let x = fromX + xDir;
        let y = fromY + yDir;

        while (x !== toX || y !== toY) {
            if (chessBoard[x][y]) {
                // Hay una pieza en el camino
                return false;
            }

            x += xDir;
            y += yDir;
        }

        // Realizamos el movimiento
        chessBoard[toX][toY] = piece;
        chessBoard[fromX][fromY] = null;
        return true;
    }

    // El movimiento no es válido
    return false;
}

const moveBishopLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
    const piece = chessBoard[fromX][fromY];

    if (!piece || piece.type !== PieceType.Bishop) {
        // La casilla de origen no contiene un alfil
        return false;
    }

    const deltaX = toX - fromX;
    const deltaY = toY - fromY;

    // Comprobar si el movimiento es válido para un alfil
    if (Math.abs(deltaX) === Math.abs(deltaY)) {
        // Verificar si hay piezas en el camino
        const xDir = deltaX > 0 ? 1 : -1;
        const yDir = deltaY > 0 ? 1 : -1;

        let x = fromX + xDir;
        let y = fromY + yDir;

        while (x !== toX || y !== toY) {
            if (chessBoard[x][y]) {
                // Hay una pieza en el camino
                return false;
            }

            x += xDir;
            y += yDir;
        }

        // Realizamos el movimiento
        chessBoard[toX][toY] = piece;
        chessBoard[fromX][fromY] = undefined;
        return true;
    }

    // El movimiento no es válido
    return false;
}

const moveKnightLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
    const piece = chessBoard[fromX][fromY];

    if (!piece || piece.type !== PieceType.Knight) {
        // La casilla de origen no contiene un caballo
        return false;
    }

    const deltaX = Math.abs(toX - fromX);
    const deltaY = Math.abs(toY - fromY);

    // Comprobar si el movimiento es válido para un caballo
    if ((deltaX === 1 && deltaY === 2) || (deltaX === 2 && deltaY === 1)) {
        // Realizamos el movimiento
        chessBoard[toX][toY] = piece;
        chessBoard[fromX][fromY] = undefined;
        return true;
    }

    // El movimiento no es válido
    return false;
}

export function movePiece(board: ChessBoard, fromX: number, fromY: number, toX: number, toY: number): boolean {
    const piece = board[fromX][fromY];

    if (!piece) {
        return false;
    }

    switch (piece.type) {
        case PieceType.King:
            if (kingMoveLogic(fromX, fromY, toX, toY)) {
                board[toX][toY] = piece;
                board[fromX][fromY] = null;
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