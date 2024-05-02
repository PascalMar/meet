import { useState } from "react";

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
        <div id="number-of-events">
            <input
                type="text"
                className="number-of-events"
                placeholder="Enter a number"
                value={number}
                onChange={handleInputChanged}
                data-testid="numberOfEventsInput"
            />
        </div>
    )
}

export default NumberOfEvents;