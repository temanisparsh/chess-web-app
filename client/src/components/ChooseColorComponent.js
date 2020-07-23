import React, { Component, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';


const ChooseColorComponent = (props) => {

    const [color, setColor] = useState('White');

    const handleSubmit = (event) => {
        event.preventDefault();
        props.handleColorSubmit(color);
    }

    return (
        <Form className="userForm" onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Choose Color</Form.Label>
                <Form.Control as="select" value={color} onChange={(event) => { setColor(event.target.value) }}>
                    <option>White</option>
                    <option>Black</option>
                </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" >
                Start Match
            </Button>
        </Form>
    );
}

export default ChooseColorComponent;