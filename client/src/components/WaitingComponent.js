import React, { Component, useState } from 'react';
import { Alert, Form, Col, Button } from 'react-bootstrap';

const WaitingComponent = (props) => {

    const [name, setName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleNameSubmit(name);
    }

    const WaitingText = () => {

        return (
            props.waiting === '' ? <Alert className="waiting" variant="success">
                <Alert.Heading>Thanks for visiting!</Alert.Heading>
            </Alert> :
                <Alert className="waiting" variant="success">
                    <Alert.Heading>Please wait while we search an opponent for you :-)</Alert.Heading>
                </Alert>
        );
    }

    return (
        <>
            <WaitingText />
            <Form className="userForm" onSubmit={handleSubmit}>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={name}
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Enter Name here"
                    />
                </Form.Group>

                <Button variant="primary" type="submit" >
                    Start Match
                </Button>
            </Form>
        </>
    );
}

export default WaitingComponent;
