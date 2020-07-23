import { Piece, Empty, Pawn, Rook, Knight, Bishop, Queen, King  } from "./Pieces";

export const initialBoardGenerator = function () {

    var gameBoard = [];

    for(var x = 0; x < 8; x++) {
        var boardRow = [];
        for(var y = 0; y < 8; y++) {
            let boardColor = Piece.getBoardColor(x, y);
            let spaceEle = new Empty(x, y, boardColor);
            boardRow.push(spaceEle);
        }
        gameBoard.push(boardRow);
    }

    gameBoard[0] = [new Rook(0, 0, 'Black'), new Knight(0, 1, 'Black'), new Bishop(0, 2, 'Black'), new Queen(0, 3, 'Black'), new King(0, 4, 'Black'), new Bishop(0, 5, 'Black'), new Knight(0, 6, 'Black'), new Rook(0, 7, 'Black')];
    gameBoard[1] = [new Pawn(1, 0, 'Black'), new Pawn(1, 1, 'Black'), new Pawn(1, 2, 'Black'), new Pawn(1, 3, 'Black'), new Pawn(1, 4, 'Black'), new Pawn(1, 5, 'Black'), new Pawn(1, 6, 'Black'), new Pawn(1, 7, 'Black')];

    gameBoard[6] = [new Pawn(6, 0, 'White'), new Pawn(6, 1, 'White'), new Pawn(6, 2, 'White'), new Pawn(6, 3, 'White'), new Pawn(6, 4, 'White'), new Pawn(6, 5, 'White'), new Pawn(6, 6, 'White'), new Pawn(6, 7, 'White')];
    gameBoard[7] = [new Rook(7, 0, 'White'), new Knight(7, 1, 'White'), new Bishop(7, 2, 'White'), new Queen(7, 3, 'White'), new King(7, 4, 'White'), new Bishop(7, 5, 'White'), new Knight(7, 6, 'White'), new Rook(7, 7, 'White')];
    
    return gameBoard;

}