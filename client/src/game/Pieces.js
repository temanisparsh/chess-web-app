export class Piece {

    static getBoardColor(X, Y) {

        const count = X * 8 + Y;
        if (count % 2) {
            return 'Black';
        }
        return 'White';

    }

    constructor(posX, posY, color, isEmpty, name) {
        this.posX = posX;
        this.posY = posY;
        this.color = color;
        this.isEmpty = isEmpty;
        this.touched = false;
        this.name = name;
    }

    movePiece(newX, newY) {
        this.posX = newX;
        this.posY = newY;
        this.touched = true;
    }

}

export class Pawn extends Piece {

    constructor(posX, posY, color) {
        super(posX, posY, color, false, 'Pawn');
        this.holder = 'P';
        this.moveDirection = {
            'White': -1,
            'Black': +1
        }
    }

    getAllValidMoves(board) {

        //TODO: Promotion to be implemented

        let allMoves = [];

        if (board[this.posX + this.moveDirection[this.color]][this.posY].isEmpty) {
            allMoves.push([[this.posX, this.posY], [this.posX + this.moveDirection[this.color], this.posY]]);
        }

        if (this.posY + 1 < 8 && !(board[this.posX + this.moveDirection[this.color]][this.posY + 1].isEmpty) && (board[this.posX + this.moveDirection[this.color]][this.posY + 1].color != this.color)) {
            allMoves.push([[this.posX, this.posY], [this.posX + this.moveDirection[this.color], this.posY + 1]]);
        }

        if (this.posY - 1 >= 0 && !(board[this.posX + this.moveDirection[this.color]][this.posY - 1].isEmpty) && (board[this.posX + this.moveDirection[this.color]][this.posY - 1].color != this.color)) {
            allMoves.push([[this.posX, this.posY], [this.posX + this.moveDirection[this.color], this.posY - 1]]);
        }

        if (!this.touched && board[this.posX + 2 * this.moveDirection[this.color]][this.posY].isEmpty) {
            allMoves.push([[this.posX, this.posY], [this.posX + 2 * this.moveDirection[this.color], this.posY]]);
        }

        return allMoves;

    }

}

export class Rook extends Piece {

    constructor(posX, posY, color) {
        super(posX, posY, color, false, 'Rook');
        this.isTouched = false;
        this.holder = 'R';
        this.moveDirection = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1]
        ];
    }

    getAllValidMoves(board) {
        var allMoves = [];
        this.moveDirection.forEach((dir) => {
            for (var step = 1; step < 8; step++) {
                if (this.posX + step * dir[0] >= 0 && this.posX + step * dir[0] < 8 && this.posY + step * dir[1] >= 0 && this.posY + step * dir[1] < 8) {
                    if (board[this.posX + step * dir[0]][this.posY + step * dir[1]].isEmpty) {
                        allMoves.push([[this.posX, this.posY], [this.posX + step * dir[0], this.posY + step * dir[1]]]);
                    }
                    else if (board[this.posX + step * dir[0]][this.posY + step * dir[1]].color != this.color) {
                        allMoves.push([[this.posX, this.posY], [this.posX + step * dir[0], this.posY + step * dir[1]]]);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
        });

        return allMoves;
    }

}

export class Knight extends Piece {

    constructor(posX, posY, color) {
        super(posX, posY, color, false, 'Knight');
        this.holder = 'Kn';
        this.moves = [
            [-2, -1],
            [-2, 1],
            [-1, -2],
            [-1, 2],
            [1, -2],
            [1, 2],
            [2, -1],
            [2, 1]
        ];

    }

    getAllValidMoves(board) {

        var allMoves = [];
        this.moves.forEach(move => {
            if (this.posX + move[0] >= 0 && this.posX + move[0] < 8 && this.posY + move[1] >= 0 && this.posY + move[1] < 8) {
                if (board[this.posX + move[0]][this.posY + move[1]].isEmpty || board[this.posX + move[0]][this.posY + move[1]].color != this.color) {
                    allMoves.push([[this.posX, this.posY], [this.posX + move[0], this.posY + move[1]]]);
                }
            }
        });
        return allMoves;
    }

}

export class Bishop extends Piece {

    constructor(posX, posY, color) {
        super(posX, posY, color, false, 'Bishop');
        this.holder = 'B';
        this.moveDirection = [
            [1, 1],
            [-1, 1],
            [-1, -1],
            [1, -1]
        ];

    }

    getAllValidMoves(board) {
        var allMoves = [];
        this.moveDirection.forEach((dir) => {
            for (var step = 1; step < 8; step++) {
                if (this.posX + step * dir[0] >= 0 && this.posX + step * dir[0] < 8 && this.posY + step * dir[1] >= 0 && this.posY + step * dir[1] < 8) {
                    if (board[this.posX + step * dir[0]][this.posY + step * dir[1]].isEmpty) {
                        allMoves.push([[this.posX, this.posY], [this.posX + step * dir[0], this.posY + step * dir[1]]]);
                    }
                    else if (board[this.posX + step * dir[0]][this.posY + step * dir[1]].color != this.color) {
                        allMoves.push([[this.posX, this.posY], [this.posX + step * dir[0], this.posY + step * dir[1]]]);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
        });

        return allMoves;
    }

}

export class Queen extends Piece {

    constructor(posX, posY, color) {
        super(posX, posY, color, false, 'Queen');
        this.holder = 'Q';
        this.isTouched = false;
        this.moveDirection = [
            [1, 0],
            [0, 1],
            [-1, 0],
            [0, -1],
            [1, 1],
            [-1, 1],
            [-1, -1],
            [1, -1]
        ];
    }

    getAllValidMoves(board) {

        //TODO: Castling to be implemented

        var allMoves = [];
        this.moveDirection.forEach((dir) => {
            for (var step = 1; step < 8; step++) {
                if (this.posX + step * dir[0] >= 0 && this.posX + step * dir[0] < 8 && this.posY + step * dir[1] >= 0 && this.posY + step * dir[1] < 8) {
                    if (board[this.posX + step * dir[0]][this.posY + step * dir[1]].isEmpty) {
                        allMoves.push([[this.posX, this.posY], [this.posX + step * dir[0], this.posY + step * dir[1]]]);
                    }
                    else if (board[this.posX + step * dir[0]][this.posY + step * dir[1]].color != this.color) {
                        allMoves.push([[this.posX, this.posY], [this.posX + step * dir[0], this.posY + step * dir[1]]]);
                        break;
                    }
                    else {
                        break;
                    }
                }
            }
        });

        return allMoves;
    }

}

export class King extends Piece {

    constructor(posX, posY, color) {
        super(posX, posY, color, false, 'King');
        this.holder = 'K';
        this.moves = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1]
        ];
    }

    getAllValidMoves(board) {

        var allMoves = [];
        this.moves.forEach(move => {
            if (this.posX + move[0] >= 0 && this.posX + move[0] < 8 && this.posY + move[1] >= 0 && this.posY + move[1] < 8) {
                if (board[this.posX + move[0]][this.posY + move[1]].isEmpty || board[this.posX + move[0]][this.posY + move[1]].color != this.color) {
                    allMoves.push([[this.posX, this.posY], [this.posX + move[0], this.posY + move[1]]]);
                }
            }
        });
        return allMoves;
    }

}

export class Empty extends Piece {

    constructor(posX, posY, color) {
        super(posX, posY, color, true);
        this.holder = ' ';
    }

    getAllValidMoves(board) {
        return [];
    }

}