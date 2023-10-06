import { chessBoard, PieceType, Color } from "./play";

export const movePawnLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
    const pawn = chessBoard[fromX][fromY];

    if (!pawn || pawn.type !== PieceType.Pawn) {
        // La casilla de origen no contiene un peón
        console.log('La casilla de origen no contiene un peón');
        return false;
    }

    const deltaX = toX - fromX;
    const deltaY = toY - fromY;
    const color = pawn.color;

    // Comprobar si el movimiento es válido según el color del peón
    if ((color === Color.White && deltaX === -1 && deltaY === 0) || // Avance de una casilla hacia adelante para peón blanco
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
};

export const moveRookLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
    const piece = chessBoard[fromX][fromY];

    if (!piece || piece.type !== PieceType.Rook) {
        console.log('La casilla de origen no contiene una torre');
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
                console.log('Hay una pieza en el camino');
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
    console.log('El movimiento no es válido');
    return false;
}

export const moveKnightLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
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

export const moveQueenLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
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

export const moveBishopLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
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

export const moveKingLogic = (fromX: number, fromY: number, toX: number, toY: number): boolean => {
    const piece = chessBoard[fromX][fromY];

    if (!piece || piece.type !== PieceType.King) {
        // La casilla de origen no contiene un rey
        return false;
    }

    const deltaX = toX - fromX;
    const deltaY = toY - fromY;

    // Comprobar si el movimiento es válido para un rey
    if (Math.abs(deltaX) <= 1 && Math.abs(deltaY) <= 1) {
        // Realizamos el movimiento
        chessBoard[toX][toY] = piece;
        chessBoard[fromX][fromY] = undefined;
        return true;
    }

    // El movimiento no es válido
    return false;
}