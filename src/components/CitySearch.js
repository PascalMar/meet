import { useState, useEffect, useRef } from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const inputRef = useRef(null);

    useEffect(() => {
        setSuggestions(allLocations);
    }, [allLocations]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);



    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];

        setQuery(value);
        setSuggestions(filteredLocations);

        let infoText;
        if (filteredLocations.length === 0) {
            infoText = "We can not find the city you are looking for. Please try another city"
        } else {
            infoText = ""
        }
        setInfoAlert(infoText);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
        setInfoAlert("")
    };

    return (
        <div id='city-search' className="position-relative">
            <InputGroup className=" px-0 mb-3">
                <Form.Control
                    className="border-primary city"
                    placeholder="Search for a city"
                    value={query}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={handleInputChanged}
                    role='textbox'
                    ref={inputRef}
                />
            </InputGroup>

            {showSuggestions &&
                <ListGroup className="suggestions" role='list'>
                    {suggestions.map((suggestion) => {
                        return (
                            <ListGroup.Item
                                className=" px-0"
                                action
                                onClick={handleItemClicked}
                                key={suggestion}
                                role='listitem'
                            >
                                {suggestion}
                            </ListGroup.Item>
                        );
                    })}
                    <ListGroup.Item
                        className=" px-0"
                        action
                        key='See all cities'
                        onClick={handleItemClicked}
                        role='listitem'
                    >
                        <b>See all cities</b>
                    </ListGroup.Item>
                </ListGroup>
            }
        </div>
    )
}



export default CitySearch;