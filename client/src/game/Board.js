import { initialBoardGenerator } from './helperFunctions';
import { Piece, Empty, King, Queen } from './Pieces';

const lodash = require('lodash');

export class Board {

    constructor(board = initialBoardGenerator()) {
        this.board = lodash.cloneDeep(board);
    }

    getAllMoves(color) {

        var allMoves = [];

        this.board.forEach((boardRow) => {
            boardRow.forEach((piece) => {
                if (!piece.isEmpty && piece.color == color) {
                    const pieceMoves = piece.getAllValidMoves(this.board);
                    allMoves = [...allMoves, ...pieceMoves];
                }
            });
        });

        var allValidMoves = [];
        allMoves.forEach((move) => {

            var tempBoard = new Board(this.board);
            tempBoard.makeMove(move[0][0], move[0][1], move[1][0], move[1][1]);

            let isCheck = tempBoard.isCheck(color);
            if (!isCheck) {
                allValidMoves.push(move);
            }
        });

        return allValidMoves;

    }

    getPieceMoves(X, Y) {

        const piece = this.board[X][Y];
        const allMoves = piece.getAllValidMoves(this.board);

        const color = piece.color;


        var allValidMoves = [];
        allMoves.forEach((move) => {

            var tempBoard = new Board(this.board);
            tempBoard.makeMove(move[0][0], move[0][1], move[1][0], move[1][1]);

            let isCheck = tempBoard.isCheck(color);
            if (!isCheck) {
                allValidMoves.push(move);
            }
        });

        return allValidMoves;

    }

    makeMove(posX, posY, newX, newY) {

        this.board[newX][newY] = this.board[posX][posY];
        this.board[newX][newY].movePiece(newX, newY);
        let boardColor = Piece.getBoardColor(posX, posY);
        this.board[posX][posY] = new Empty(posX, posY, boardColor);

    }

    isCheck(color) {

        var opponentColor = color == 'White' ? 'Black' : 'White';

        var allMoves = [];

        this.board.forEach((boardRow) => {
            boardRow.forEach((piece) => {
                if (!piece.isEmpty && piece.color == opponentColor) {
                    const pieceMoves = piece.getAllValidMoves(this.board);
                    allMoves = [...allMoves, ...pieceMoves];
                }
            });
        });

        var check = false;

        allMoves.forEach((move) => {
            let newX = move[1][0];
            let newY = move[1][1];
            if (this.board[newX][newY].color == color && this.board[newX][newY] instanceof King) {
                check =  true;
            }
        });
        return check;
    }
    
}