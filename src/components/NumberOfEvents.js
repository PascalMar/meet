import { useState } from "react";
import { Form, InputGroup, Row, Col } from 'react-bootstrap';


const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {

    const [number, setNumber] = useState('32')

    const handleInputChanged = (event) => {
        const value = event.target.value;
        setNumber(value);
        setCurrentNOE(value);

        let infoText;
        if (isNaN(value) || value <= 0) {
            infoText = "Only positive numbers are allowed"
        } else {
            infoText = "";
            setCurrentNOE(value);
        }
        setErrorAlert(infoText);
    }

    return (
        <Row id="number-of-events">
            <Col className="d-flex flex-column align-items-center">
                <Form.Group >
                    <Form.Label htmlFor="number-of-events-input" className="fw-medium mb-1">Number of Events</Form.Label>
                    <InputGroup className="px-0 mb-4 ">
                        <Form.Control
                            type="text"
                            className="number-of-events-input border-primary"
                            value={number}
                            onChange={handleInputChanged}
                        />
                    </InputGroup>
                </Form.Group>
            </Col>
        </Row>
    );
}

export default NumberOfEvents;