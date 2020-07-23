import { Board } from './Board';

export class Game {

    constructor(player1, player2) {

        this.activePlayer = 'White';

        this.board = new Board();

    }


    getAllMoves(color) {

        let allAvailableMoves = this.board.getAllMoves(color);
        return allAvailableMoves;

    }

    getPieceMoves(X, Y) {

        let availablePieceMoves = this.board.getPieceMoves(X, Y);
        return availablePieceMoves;

    }

    playerIsCheck(color) {

        let isCheck = this.board.isCheck(color);
        return isCheck;

    }

    makeMove(posX, posY, newX, newY) {

        this.board.makeMove(posX, posY, newX, newY);
        this.activePlayer = this.activePlayer == 'White' ? 'Black' : 'White';

    }

    isEndGame() {

        const allAvailableMoves = this.getAllMoves(this.activePlayer);
        const playerIsCheck = this.playerIsCheck(this.activePlayer);

        if (playerIsCheck) {
            if (allAvailableMoves.length) {
                return {
                    isEnd: false,
                    isCheck: true,
                    isMate: false,
                    isStale: false,
                    player: this.activePlayer,
                }
            }
            else {
                return {
                    isEnd: true,
                    isCheck: true,
                    isMate: true,
                    isStale: false,
                    player: this.activePlayer,
                }
            }
        }
        else if (allAvailableMoves.length == 0) {
            return {
                isEnd: true,
                isCheck: false,
                isMate: false,
                isStale: true,
                player: this.activePlayer,
            }
        }
        else {
            return {
                isEnd: false,
                isCheck: false,
                isMate: false,
                isStale: false,
                player: this.activePlayer,
            }
        }
    }
}