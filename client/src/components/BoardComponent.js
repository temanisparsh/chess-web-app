import React, { Component, useState, useContext, useEffect } from 'react';

import { Game } from '../game/Game';
import EndGame from './EndGameComponent';

const lodash = require('lodash');

const BoardComponent = (props) => {

    const [game, setGame] = useState(new Game(props.name, props.opponentName));

    const [selectedCell, setSelectedCell] = useState([]);

    const [selectedCellMoves, setSelectedCellMoves] = useState([]);

    const [turn, setTurn] = useState(props.color === 'White' ? true : false);

    const [status, setStatus] = useState({});

    const selectCell = async (x, y) => {

        if (!turn) {
            return;
        }

        let piece = game.board.board[x][y];

        if ((piece.isEmpty || piece.color != props.color) && selectedCellMoves.indexOf(x * 8 + y) !== -1) {

            game.makeMove(selectedCell[0], selectedCell[1], x, y)

            props.socket.emit("makeMove", [selectedCell[0], selectedCell[1], x, y]);
            setGame(game);
            setStatus(game.isEndGame());
            setTurn(!turn);

            setSelectedCell([]);
            setSelectedCellMoves([]);

            return;
        }
        else {
            if ((piece.color !== props.color) || piece.isEmpty) {
                return;
            }
            setSelectedCell([x, y]);
        }
    }

    useEffect(() => {

        if (lodash.isEqual(selectedCell, []))
            return;

        let movesAvailable = game.getPieceMoves(selectedCell[0], selectedCell[1]);

        movesAvailable = movesAvailable.map((move) => move[1][0] * 8 + move[1][1]);

        setSelectedCellMoves(movesAvailable);

    }, [selectedCell]);

    useEffect(() => {
        console.log(status);
    }, [status]);

    props.socket.on("makeMove", (data) => {
        if (!game.board.board[data[0]][data[1]].isEmpty && !game.board.board[data[0]][data[1]].color !== props.color && (game.board.board[data[2]][data[3]].isEmpty || game.board.board[data[2]][data[3]].color === props.color)) {
            game.makeMove(data[0], data[1], data[2], data[3]);
            setGame(game);
            setStatus(game.isEndGame());
            setTurn(true);
        }
    });

    const GetBoard = () => {
        let ans = props.color === 'White' ? game.board.board : [...game.board.board].reverse();
        return ans;
    }

    return status.isEnd ? <EndGame status={status} color={props.color} /> : (


        <div className="board">

            {GetBoard().map((row) => (

                <div className="board-row">
                    {row.map((piece) => (

                        <div onClick={() => selectCell(piece.posX, piece.posY)}

                            className={"btn board-cell btn-" + (piece.posY % 2 == piece.posX % 2 ? 'light' : 'dark') //  Checks whether background shoulf be black or white
                                + ((selectedCell[0] == piece.posX && selectedCell[1] == piece.posY) ? (selectedCellMoves.length === 0 ? ' no-selected-cell' : ' selected-cell') : '') // Checks is cell is selected or not
                                + (selectedCell != [10, 10] && lodash.indexOf(selectedCellMoves, piece.posX * 8 + piece.posY) !== -1 ? ' possible-move ' : '')}>

                            <img src={"/chess/" + piece.color + "/" + piece.name + ".png"} className="piece-image" alt="" />

                        </div>

                    ))}
                </div>

            ))}

        </div>
    );
}

export default BoardComponent;