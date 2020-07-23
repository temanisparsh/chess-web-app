import React, { Component, useEffect } from 'react';
import { Alert, Form, Col, Button } from 'react-bootstrap';

const EndGame = (props) => {

    console.log(props);

    if (props.color === props.status.player) {
        return (
            <div>
                <Alert className="endgame" variant="danger">
                    <Alert.Heading>Thanks for Playing!</Alert.Heading>
                </Alert> 
                <Alert className="endgame" variant="danger">
                    <Alert.Heading>Player {props.status.player === "White" ? "Black" : "White"} has won!!</Alert.Heading>
                </Alert>
            </div>
        );
    }
    else {
        return (
            <div>
                <Alert className="endgame" variant="success">
                    <Alert.Heading>Thanks for Playing!</Alert.Heading>
                </Alert> 
                <Alert className="endgame" variant="success">
                    <Alert.Heading>You won!!</Alert.Heading>
                </Alert>
            </div>
        );
    }

}

export default EndGame;