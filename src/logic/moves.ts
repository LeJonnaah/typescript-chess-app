export function canQueenMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (fromX === toX || fromY === toY) {
        return true;
    }
    if (Math.abs(fromX - toX) === Math.abs(fromY - toY)) {
        return true;
    }
    return false;
}

export function canRookMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (fromX === toX || fromY === toY) {
        return true;
    }
    return false;
}

export function canBishopMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (Math.abs(fromX - toX) === Math.abs(fromY - toY)) {
        return true;
    }
    return false;
}

export function canKnightMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (Math.abs(fromX - toX) === 2 && Math.abs(fromY - toY) === 1) {
        return true;
    }
    if (Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 2) {
        return true;
    }
    return false;
}

export function canKingMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (Math.abs(fromX - toX) <= 1 && Math.abs(fromY - toY) <= 1) {
        return true;
    }
    return false;
}

export function canPawnMove(fromX: number, fromY: number, toX: number, toY: number) {
    if (fromX === toX && fromY - toY === 1) {
        return true;
    }
    return false;
}

export function isMovePossible(piece: string, fromX: number, fromY: number, toX: number, toY: number) {
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

export function isMoveLegal(piece: string, fromX: number, fromY: number, toX: number, toY: number) {
    if (fromX < 0 || fromX > 7 || fromY < 0 || fromY > 7 || toX < 0 || toX > 7 || toY < 0 || toY > 7) {
        return false;
    }
    if (fromX === toX && fromY === toY) {
        return false;
    }
    return isMovePossible(piece, fromX, fromY, toX, toY);
}