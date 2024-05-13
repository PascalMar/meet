import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CitySearchEventsChart';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import EventGenresChart from './components/EventGenresChart';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './bootstrap.min.css'


import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("")
    } else {
      setWarningAlert("Offline App")
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }



  return (
    <Container className="App">
      <Row>
        <Col>
          {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
          {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
          {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}

         <h1>MEET APP</h1>

          <CitySearch
            allLocations={allLocations}
            setCurrentCity={setCurrentCity}
            setInfoAlert={setInfoAlert}
            setErrorAlert={setErrorAlert}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <NumberOfEvents
            setCurrentNOE={setCurrentNOE}
            setErrorAlert={setErrorAlert}
          />
        </Col>
      </Row>
      <Row className='mt-3'>
        <Col xs={12} md={6} className='charts-container'>
          <EventGenresChart events={events} />
        </Col>
        <Col xs={12} md={6} className='charts-container'>
          <CityEventsChart allLocations={allLocations} events={events} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col>
          <EventList events={events} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
