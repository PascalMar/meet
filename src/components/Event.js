import { useState } from "react";
import { ListGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";


const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <ListGroup.Item role='listitem' key={event.id} className="event py-4">
      <Container>
        <Row>
          <Col className="text-align-left">
            <h3 className="width-control">{event.summary}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="m-0">{event.created}</p>
            <p className="m-0">{event.location}</p>
          </Col>
          <Col className="d-flex flex-column align-items-end justify-content-end">
            <Button className="details-btn"
              onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </Col>
        </Row>
        {showDetails ?
          (
            <Row className="details">
              <Col>
                <hr className="mt-4 border-primary"></hr>
                <h5 className="mt-0">Event Details</h5>
                <p className="m-0">{event.description}</p>
              </Col>
            </Row>
          ) : null}
      </Container>
    </ListGroup.Item>
  )
}

export default Event;