import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

import { BASE_URL } from '../shared/BaseUrl';

import WaitingComponent from './WaitingComponent';
import ChooseColorComponent from './ChooseColorComponent';
import BoardComponent from './BoardComponent';

class GameComponent extends Component {

    constructor(props) {

        super(props);
        this.state = {
            opponentName: '',
            name: '',
            color: null,
            waiting: true,
            socket: null,
        }

        this.handleColorSubmit = this.handleColorSubmit.bind(this);
        this.handleNameSubmit = this.handleNameSubmit.bind(this);

    }

    handleColorSubmit(color) {

        this.setState({
            color: color,
        });

        this.state.socket.emit("selectColor", [color, this.state.name]);

    }

    async handleNameSubmit(name) {

        await this.setState({
            name: name,
            socket: socketIOClient(BASE_URL)
        });

        this.state.socket.on("start", function () {
            this.setState({
                waiting: false,
            });
        }.bind(this));

        this.state.socket.on("selectedColor", function (data) {
            var color = data[0] == 'White' ? 'Black' : 'White';
            this.setState({
                color: color,
                opponentName: data[1],
            });
            this.state.socket.emit("sendOpponentName", this.state.name);
        }.bind(this));

        this.state.socket.on("sendOpponentName", function(data) {
            var name = data;
            this.setState({
                opponentName: data,
            });
        }.bind(this));

    }

    render() {

        if (this.state.waiting) {
            return (
                <WaitingComponent handleNameSubmit={this.handleNameSubmit} waiting={this.state.name} />
            );
        }

        else if (!this.state.color) {
            return (
                <ChooseColorComponent handleColorSubmit={this.handleColorSubmit} />
            );
        }

        else {
            return (
                    <BoardComponent socket={this.state.socket} color={this.state.color} name={this.state.name} opponentName={this.state.opponentName} />
            );
        }
    }
}

export default GameComponent;