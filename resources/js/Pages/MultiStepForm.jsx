import {useEffect, useRef, useState} from 'react';
import "/resources/css/styles.css";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faPencil, faPlaneArrival, faPlaneDeparture, faWallet} from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {Link, useForm, usePage} from "@inertiajs/react";
import { format } from 'date-fns';
import SignaturePad from 'react-signature-canvas'; // Assuming you're using this library


import airlinesData from './airlinesData'; // Importing the airlines data
import airportsData from './airports.js';
import rapidApi from "../../../rapid-api.js";
import {t} from "i18next";

const Step1 = ({ formData, handleInputChange, checkboxes, handleCheckboxChange }) => {
    const [airportData, setAirportData] = useState([]); // State to store airport data
    const [input1Suggestions, setInput1Suggestions] = useState([]); // Suggestions for input1
    const [input2Suggestions, setInput2Suggestions] = useState([]); // Suggestions for input2

    const [filteredFlights, setFilteredFlights] = useState([]);

    useEffect(() => {
        async function fetchAirportData() {
            const options = {
                method: 'GET',
                url: 'https://flight-radar1.p.rapidapi.com/airports/list',
                headers: {
                    // 'X-RapidAPI-Key': '',
                    'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
                }
            };

            try {
                const response = await axios.request(options);
                setAirportData(response.data.rows); // Update state with response data
            } catch (error) {
                console.error(error);
            }
        }

        fetchAirportData();
    }, []);

    useEffect(() => {
        if (formData.input1 && formData.input1a) {
            const filtered = sampleFlight.filter(flight => {
                const departureAirport = flight.departure.airport;
                const arrivalAirport = flight.arrival.airport;

                return departureAirport && departureAirport.iata === formData.input1 && arrivalAirport && arrivalAirport.iata === formData.input1a;
            });            setFilteredFlights(filtered);
        }
    }, [formData.input1, formData.input1a]);

    const handleInputChange1 = (event) => {
        const value = event.target.value.toUpperCase();
        const suggestions = airportData.filter(airport => airport.name.toUpperCase().startsWith(value)).slice(0, 5);
        setInput1Suggestions(suggestions);
        handleInputChange(event); // Call the parent's input change handler
    };

    const handleInputChange2 = (event) => {
        const value = event.target.value.toUpperCase();
        const suggestions = airportData.filter(airport => airport.name.toUpperCase().startsWith(value)).slice(0, 5);
        setInput2Suggestions(suggestions);
        handleInputChange(event); // Call the parent's input change handler
    };

    const handleSuggestionClick1 = (name) => {
        setInput1Suggestions([]);
        handleInputChange({ target: { name: 'input1', value: name } });
    };

    const handleSuggestionClick2 = (name) => {
        setInput2Suggestions([]);
        handleInputChange({ target: { name: 'input1a', value: name } });
    };

    const [yesChecked, setYesChecked] = useState(false);
    const [noChecked, setNoChecked] = useState(false);

    // Define validation function for Step1
    const validate = (formData) => {
        // Check if input1 is filled out
        if (!formData.input1) {
            // Display error message or highlight the missing field
            console.log("Please fill out input1");
            return false;
        }
        // Validation passed
        return true;
    };

    return (
        <div>
            <div className="container ">
                <div className="card p-5" style={{ backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F" }}>
                    <label htmlFor="input1" className="block text-gray-700 text-sm font-bold mb-2">{t('step1.greeting_message')}</label>
                    <div className="flex flex-col md:flex-row">
                            <FontAwesomeIcon icon={faPlaneDeparture} className="icon p-2" />
                        <input placeholder={t('step1.departure_placeholder')} type="text" id="input1" name="input1"
                               value={formData.input1}
                               onChange={handleInputChange1}
                               className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                            <FontAwesomeIcon icon={faPlaneArrival} className="icon p-2" />
                        <input placeholder="e.g. London or LHR" type="text" id="input1a" name="input1a" value={formData.input1a}
                               onChange={handleInputChange2}
                               className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    </div>
                    <div className="suggestions">
                        <ul>
                            {input1Suggestions.map(airport => (
                                <li key={airport.code} onClick={() => handleSuggestionClick1(airport.name)}>
                                    {airport.name}
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {input2Suggestions.map(airport => (
                                <li key={airport.code} onClick={() => handleSuggestionClick2(airport.name)}>
                                    {airport.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input12" className="block text-gray-700 text-sm font-bold mb-2 ">Czy Twój lot
                        obejmował przesiadkę?:</label>
                    <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="yes-checkbox"
                                    type="checkbox"
                                    checked={formData.input1b}
                                    onChange={() => handleCheckboxChange('input1b', 'Tak')} // Pass label name
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="yes-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Tak
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="no-checkbox"
                                    type="checkbox"
                                    checked={formData.input1c}
                                    onChange={() => handleCheckboxChange('input1c', 'Nie')} // Pass label name
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="no-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Nie
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container mt-5">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input1" className="block text-gray-700 text-sm font-bold mb-2">Nic nie ryzykujesz –
                        sprawdzenie, czy przysługuje Ci odszkodowanie, jest całkowicie bezpłatnie</label>
                </div>
            </div>
        </div>
    );
};

// const Step1 = ({ flights }) => {
//     const [departureIata, setDepartureIata] = useState('');
//     const [arrivalIata, setArrivalIata] = useState('');
//     const [departureDate, setDepartureDate] = useState(null);
//     const [filteredFlights, setFilteredFlights] = useState([]);
//     const [isFiltered, setIsFiltered] = useState(false);
//
//     const handleFilter = () => {
//         if (departureIata && arrivalIata && departureDate) {
//             const year = departureDate.getFullYear();
//             const month = String(departureDate.getMonth() + 1).padStart(2, '0');
//             const day = String(departureDate.getDate()).padStart(2, '0');
//
//             const formattedDepartureDate = `${year}-${month}-${day}`;
//             console.log('Filtering with values:', {
//                 departureIata,
//                 arrivalIata,
//                 formattedDepartureDate
//             });
//
//             const filtered = flights.filter(flight => {
//                 const depIata = flight.airline.iata;
//                 const arrIata = flight.arrival.airport.iata;
//                 const depDate = new Date(flight.departure.scheduledTime.utc).toISOString().split('T')[0];
//
//                 console.log(`Checking flight: ${flight.number}`, {
//                     depIata,
//                     arrIata,
//                     depDate,
//                     match: depIata === departureIata && arrIata === arrivalIata && depDate === formattedDepartureDate
//                 });
//
//                 return depIata === departureIata && arrIata === arrivalIata && depDate === formattedDepartureDate;
//             });
//             setFilteredFlights(filtered);
//             setIsFiltered(true);
//         } else {
//             setFilteredFlights([]);
//             setIsFiltered(true);
//         }
//     };
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'departureIata') {
//             setDepartureIata(value);
//         } else if (name === 'arrivalIata') {
//             setArrivalIata(value);
//         }
//     };
//
//     return (
//         <div>
//             <div className="container">
//                 <div className="card p-5" style={{ backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F" }}>
//                     <label htmlFor="departureIata" className="block text-gray-700 text-sm font-bold mb-2">Departure IATA Code:</label>
//                     <input
//                         type="text"
//                         name="departureIata"
//                         value={departureIata}
//                         onChange={handleInputChange}
//                         className="input"
//                     />
//
//                     <label htmlFor="arrivalIata" className="block text-gray-700 text-sm font-bold mb-2">Arrival IATA Code:</label>
//                     <input
//                         type="text"
//                         name="arrivalIata"
//                         value={arrivalIata}
//                         onChange={handleInputChange}
//                         className="input"
//                     />
//
//                     <label htmlFor="departureDate" className="block text-gray-700 text-sm font-bold mb-2">Departure Date:</label>
//                     <DatePicker
//                         selected={departureDate}
//                         onChange={date => setDepartureDate(date)}
//                         dateFormat="yyyy-MM-dd"
//                         placeholderText="Select date"
//                         className="input"
//                     />
//
//                     <button onClick={handleFilter} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
//                         Filter Flights
//                     </button>
//
//                     {isFiltered && filteredFlights.length === 0 ? (
//                         <p className="mt-4">No flights found</p>
//                     ) : (
//                         <div className="results mt-4">
//                             {filteredFlights.map((flight, index) => (
//                                 <div key={index} className="flight border p-3 mb-3 rounded">
//                                     <p><strong>Flight Number:</strong> {flight.number}</p>
//                                     <p><strong>Airline:</strong> {flight.airline.name}</p>
//                                     <p><strong>Status:</strong> {flight.status}</p>
//                                     <p><strong>Departure:</strong> {flight.departure.scheduledTime.local}</p>
//                                     <p><strong>Arrival:</strong> {flight.arrival.airport.name} ({flight.arrival.airport.iata})</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };


const Step2 = ({ formData, handleInputChange, flights }) => {
    const [filteredFlights, setFilteredFlights] = useState([]);

    useEffect(() => {
        if (formData.input2) {
            const filtered = sampleFlight.filter(flight => flight.departure.scheduledTime.local.split(' ')[0] === formData.input2.toISOString().split('T')[0]);
            setFilteredFlights(filtered);
        }
    }, [formData.input2]);


    return (
    <div>
        <div className="container">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input2" className="block text-gray-700 text-sm font-bold mb-2">Podaj date wylotu</label>
                <div className="flex">
                    <FontAwesomeIcon icon={faCalendarDays} className="icon p-2"/>
                    <DatePicker
                        selected={formData.input2}
                        onChange={date => handleInputChange({target: {name: 'input2', value: date}})}
                        dateFormat="MM/dd/yyyy" // You can customize the date format
                        placeholderText="Wybierz date"
                        className="date-picker flex-1 mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>
        </div>
    </div>
);
};



const Step3 = ({ formData, checkboxes, handleInputChange, handleCheckboxChange, flights, setData, setSelectedFlight, flight}) => {
    const [allFlights, setAllFlights] = useState([]);
    const [arrivalCode, setArrivalCode] = useState('');
    const [airportCode, setAirportCode] = useState('');
    const [fromLocal, setFromLocal] = useState('');
    const [toLocal, setToLocal] = useState('');
    const [filteredFlights, setFilteredFlights] = useState([]);
    const [input1Suggestions, setInput1Suggestions] = useState([]);
    const [input2Suggestions, setInput2Suggestions] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);

    const [inputText, setInputText] = useState('');
    const [departureSuggestions, setDepartureSuggestions] = useState([]);
    const [arrivalSuggestions, setArrivalSuggestions] = useState([]);
    const [isVisible, setIsVisible] = useState(false);




    const searchFlights = async () => {
        const airportCodeValue = departureIata.trim().toUpperCase();
        if (!airportCodeValue) {
            alert(t('step1.correctAirport'));
            return;
        }

        if (!fromLocal) {
            // alert('Podaj właściwą date.');
            alert(t('step1.correctDate'));
            return;
        }

        const toLocalDate = new Date(new Date(fromLocal).getTime() + 12 * 60 * 60 * 1000).toISOString().replace("T", " ");


        const options = {
            method: 'GET',
            url: `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${airportCodeValue}/${fromLocal}/${toLocalDate}`,
            params: {
                withLeg: 'true',
                withCancelled: 'true',
                withCodeshared: 'true',
                withCargo: 'true',
                withPrivate: 'true',
                withLocation: 'false'
            },
            headers: {
                'X-RapidAPI-Key': rapidApi.apiKey,
                'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setAllFlights(response.data.departures);
            console.log("All Flights:", response.data.departures); // Log all fetched flights

            setIsVisible(true);
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching flight data. Please try again later.');
        }
    };

    const filterArrivals = () => {
        const arrivalCodeValue = arrivalIata.trim().toUpperCase();
        if (!arrivalCodeValue) {
            alert(t('step1.correctAirport'));
            return;
        }

        console.log("Filtering flights to:", arrivalCodeValue); // Log the arrival IATA code being filtered
        const filteredFlights = allFlights.filter(flight => flight.arrival && flight.arrival.airport && flight.arrival.airport.iata === arrivalCodeValue);
        console.log("Filtered Flights:", filteredFlights); // Log the filtered flights

        setFilteredFlights(filteredFlights);

        // Set isFiltered based on whether filteredFlights is empty or not
        setIsFiltered(filteredFlights.length === 0 || filteredFlights.length === undefined);
    };

    const handleCheckboxChangeDynamic = (group, inputName, index, flight) => {
        setData((prevState) => {
            const newState = { ...prevState };
            // Toggle the state of the clicked checkbox
            newState[inputName] = index;
            // Define the checkbox groups
            const checkboxGroups = {
                group1: ['input1b', 'input1c'],
                group2: ['input3', 'input3a'],
                // Add more groups here if needed
            };
            // Get the relevant group of checkboxes
            const otherInputNames = checkboxGroups[group];
            // Set other checkboxes in the group to false
            otherInputNames.forEach((name) => {
                if (name !== inputName) {
                    newState[name] = false;
                }
            });

            // Set the flight information to the corresponding input in the form data
            // Check if flight is available and has the necessary properties
            if (flight && flight.departure && flight.departure.scheduledTime) {
                // Set the flight information to the corresponding input in the form data

                newState.input4 = flight.airline.name;
                newState.input4a = flight.number;
                newState.input4b = flight.departure.scheduledTime.local;
            }

            return newState;
        });
    };

    const handleLocalInputChange = (e) => {
        const { value } = e.target;
        setInputText(value);
        handleInputChange(e); // Call the parent's handleInputChange
        // Filter airlines based on input text
        const filteredAirlines = airlinesData.filter((airline) =>
            airline.name.toLowerCase().includes(value.toLowerCase())
        );
        // Limit suggestions to 5
        setSuggestions(filteredAirlines.slice(0, 5));
    };

    // Function to handle suggestion selection
    const handleAirportCodeChange = (e) => {
        const { name, value } = e.target;
        if (name === 'departureIata') {
            setAirportCode(value);
            setData((prevState) => ({ ...prevState, input1: value })); // Update formData.input1

            handleInputChange(e);

            const filteredAirports = airportsData.filter((airport) =>
                airport.name.toLowerCase().includes(value.toLowerCase()) ||
                airport.city.toLowerCase().includes(value.toLowerCase()) ||
                airport.iata_code.toLowerCase().includes(value.toLowerCase())
            );
            setDepartureSuggestions(filteredAirports.slice(0, 5));
        } else if (name === 'arrivalIata') {
            setArrivalCode(value);
            setData((prevState) => ({ ...prevState, input1a: value })); // Update formData.input1a

            handleInputChange(e);

            const filteredAirports = airportsData.filter((airport) =>
                airport.name.toLowerCase().includes(value.toLowerCase()) ||
                airport.city.toLowerCase().includes(value.toLowerCase()) ||
                airport.iata_code.toLowerCase().includes(value.toLowerCase())
            );
            setArrivalSuggestions(filteredAirports.slice(0, 5));
        }
    };

    const handleSuggestionClick = (suggestion, type) => {
        if (type === 'departure') {
            setDepartureIata(suggestion.iata_code);
            setData((prevState) => ({ ...prevState, input1: suggestion.iata_code })); // Update formData.input1

            setDepartureSuggestions([]);
            const event = { target: { name: 'departureIata', value: suggestion.iata_code } };
            handleInputChange(event);
        } else if (type === 'arrival') {
            setArrivalIata(suggestion.iata_code);
            setData((prevState) => ({ ...prevState, input1a: suggestion.iata_code })); // Update formData.input1a

            setArrivalSuggestions([]);
            const event = { target: { name: 'arrivalIata', value: suggestion.iata_code } };
            handleInputChange(event);
        }
    };

    const { props } = usePage();
    const { input1, input1a } = props;

    const [departureIata, setDepartureIata] = useState(input1 || '');
    const [arrivalIata, setArrivalIata] = useState(input1a || '');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'departureIata') {
            setDepartureIata(value);
        } else if (name === 'arrivalIata') {
            setArrivalIata(value);
        }
        handleAirportCodeChange(e); // This updates the parent state if needed
    };

    useEffect(() => {
        console.log('Received props:', { input1, input1a });
        setDepartureIata(input1 || '');
        setArrivalIata(input1a || '');
    }, [input1, input1a]);


    const handleFlightSelection = async () => {
        setSelectedFlight(flight); // Update the selected flight in the parent component
        await searchFlights(); // Trigger the flight search function
    };

    return (
        <div>
            <div className="container container-padding">
                <div className="card p-5" style={{backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"}}>
                    <label htmlFor="input1" className="block text-gray-700 text-sm font-bold mb-2">
                        {t('step1.greeting_message')}
                    </label>
                    <div className="flex flex-col md-flex-row">
                        <FontAwesomeIcon icon={faPlaneDeparture} className="icon p-2"/>
                        <input
                            placeholder={t('step1.departure_placeholder')}
                            type="text"
                            id="input1"
                            name="departureIata"
                            // value={input1}
                            value={departureIata}
                            onChange={handleChange}
                            className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {departureSuggestions.length > 0 && (
                            <ul className="absolute bg-white border border-gray-300 w-full mt-5 max-h-40 overflow-y-auto z-10">
                                {departureSuggestions.map((airport) => (
                                    <li
                                        key={airport.iata_code}
                                        onClick={() => handleSuggestionClick(airport, 'departure')}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {airport.name} ({airport.iata_code})
                                    </li>
                                ))}
                            </ul>
                        )}
                        <FontAwesomeIcon icon={faCalendarDays} className="icon p-2"/>
                        <input type="datetime-local" value={fromLocal}
                               onChange={e => setFromLocal(e.target.value)}
                               placeholder="Enter From Local Time"
                               className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />

                    </div>

                    <button onClick={handleFlightSelection} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" style={{backgroundColor: "#4f914a"}}>{t('step1.submit_request')}</button>
                </div>
            </div>

            {/*<h1>Flight Search</h1>*/}
            {/*<input type="text" value={airportCode} onChange={e => setAirportCode(e.target.value)} placeholder="Enter IATA Airport Code" />*/}
            {/*<input type="datetime-local" value={fromLocal} onChange={e => setFromLocal(e.target.value)} placeholder="Enter From Local Time" />*/}
            {/*<button onClick={searchFlights}>Search</button>*/}
            {/*<br /><br />*/}
            {isVisible && (
            <div className="container container-padding mt-5">
                <div className="card p-5" style={{backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"}}>
                    <label htmlFor="input12" className="block text-gray-700 text-sm font-bold mb-2">
                        {t('step1.layover_question')}
                    </label>
                    <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="yes-checkbox"
                                    type="checkbox"
                                    checked={formData.input1b === t('step1.layover_yes')}
                                    onChange={() => handleCheckboxChangeDynamic('group1', 'input1b', t('step1.layover_yes'))}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label htmlFor="yes-checkbox"
                                       className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {t('step1.layover_yes')}
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="no-checkbox"
                                    type="checkbox"
                                    checked={formData.input1b === t('step1.layover_no')}
                                    onChange={() => handleCheckboxChangeDynamic('group1',  'input1b',t('step1.layover_no'))}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label htmlFor="no-checkbox"
                                       className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {t('step1.layover_no')}
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            )}
            {isVisible && (
            <div className="container container-padding mt-5">
                <div className="card p-5" style={{backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"}}>
                    <label htmlFor="input2" className="block text-gray-700 text-sm font-bold mb-2">
                        {t('step1.arrival_place')}
                    </label>
                    <div className="flex flex-col md-flex-row">

                        <FontAwesomeIcon icon={faPlaneArrival} className="icon p-2"/>
                        <input
                            placeholder={t('step1.arrival_placeholder')}
                            type="text"
                            id="input1a"
                            name="arrivalIata"
                            // value={input1a}
                            // value={arrivalCode}
                            value={arrivalIata}
                            onChange={handleChange}
                            className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {arrivalSuggestions.length > 0 && (
                            <ul className="absolute bg-white border border-gray-300 w-full mt-5 max-h-40 overflow-y-auto z-10">
                                {arrivalSuggestions.map((airport) => (
                                    <li
                                        key={airport.iata_code}
                                        onClick={() => handleSuggestionClick(airport, 'arrival')}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        {airport.name} ({airport.iata_code})
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {/*<button onClick={filterArrivals}>Filter Arrivals</button>*/}

                </div>

            </div>
                )}
            {isVisible && (
            <div className="container container-padding mt-5">
                <div className="card p-5" style={{backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"}}>
                    <label htmlFor="input12" className="block text-gray-700 text-sm font-bold mb-2">
                        {t('step1.select_flight')}:
                    </label>

                    <button onClick={filterArrivals} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" style={{backgroundColor: "#4f914a"}}>
                        {t('step1.filter')}
                    </button>

                    {isFiltered && filteredFlights.length === 0 ? (
                        <p className="mt-4">{t('step1.no_flights')}</p>
                    ) : (
                        <ul className="w-full">
                            {filteredFlights.map((flight, index) => {
                                const flightDetails = `
                                    Wylot: ${departureIata},
                                    Przylot: ${arrivalIata},
                                    Czas wylotu: ${flight.departure.scheduledTime.local},
                                    Linia lotnicza: ${flight.airline.name},
                                    Numer lotu: ${flight.number}
                                `;
                                return (
                                    <li key={index}
                                        className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input
                                                id={`checkbox-${index}`}
                                                type="checkbox"
                                                checked={formData.input3 === flightDetails} // Check if the current flight details match the value in formData.input3
                                                onChange={() => handleCheckboxChangeDynamic('group2', 'input3', flightDetails, flight)}
                                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <div
                                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                <p><strong>{t('step1.departure_time')}:</strong> {flight.departure.scheduledTime.local}</p>
                                                <p><strong>{t('step1.airline')}:</strong> {flight.airline.name}</p>
                                                <p><strong>{t('step1.flight_number')}:</strong> {flight.number}</p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <ul className="w-full">
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="no-checkbox"
                                    type="checkbox"
                                    value="Nie mogę znaleźć swojego lotu"

                                    checked={formData.input3  === t('step1.cant_find')}
                                    // onChange={() => handleCheckboxChangeDynamic('group2', 'input3', 'Nie mogę znaleźć swojego lotu')}

                                    onChange={() => handleCheckboxChangeDynamic('group2', 'input3', t('step1.cant_find'))}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label htmlFor="no-checkbox"
                                       className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {t('step1.cant_find')}
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            )}

            {/*<input type="text" value={arrivalCode} onChange={e => setArrivalCode(e.target.value)}*/}
            {/*       placeholder="Enter Arrival IATA Code"/>*/}
            {/*<button onClick={filterArrivals}>Filter Arrivals</button>*/}
            {/*<ul>*/}
            {/*    {filteredFlights.map((flight, index) => (*/}
            {/*        <li key={index}>*/}
            {/*            Scheduled Time: {flight.departure.scheduledTime.local} - Airline Name: {flight.airline.name} -*/}
            {/*            Flight Number: {flight.number}*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
};


// const Step3 = ({ formData, checkboxes, handleInputChange, handleCheckboxChange, flights }) => {
//     const [departureIata, setDepartureIata] = useState('');
//     const [arrivalIata, setArrivalIata] = useState('');
//     const [departureDate, setDepartureDate] = useState(null);
//     const [filteredFlights, setFilteredFlights] = useState([]);
//     const [isFiltered, setIsFiltered] = useState(false);
//     const [airportData, setAirportData] = useState([]);
//     const [input1Suggestions, setInput1Suggestions] = useState([]);
//     const [input2Suggestions, setInput2Suggestions] = useState([]);
//
//     useEffect(() => {
//         async function fetchAirportData() {
//             const options = {
//                 method: 'GET',
//                 url: 'https://flight-radar1.p.rapidapi.com/airports/list',
//                 headers: {
//                     'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
//                 }
//             };
//
//             try {
//                 const response = await axios.request(options);
//                 setAirportData(response.data.rows);
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//
//         fetchAirportData();
//     }, []);
//
//     const handleInputChange1 = (event) => {
//         const { name, value } = event.target;
//         const suggestions = airportData.filter(airport => airport.name.toUpperCase().startsWith(value.toUpperCase())).slice(0, 5);
//         setInput1Suggestions(suggestions);
//
//         if (name === 'departureIata') {
//             setDepartureIata(value);
//         } else if (name === 'arrivalIata') {
//             setArrivalIata(value);
//         } else if (name === 'input1') {
//         setDepartureDate(value);
//     }
//
//         handleInputChange(event); // Call the parent's input change handler
//     };
//
//     const handleInputChange2 = (event) => {
//         const { name, value } = event.target;
//         const suggestions = airportData.filter(airport => airport.name.toUpperCase().startsWith(value.toUpperCase())).slice(0, 5);
//         setInput2Suggestions(suggestions);
//
//         if (name === 'departureIata') {
//             setDepartureIata(value);
//         } else if (name === 'arrivalIata') {
//             setArrivalIata(value);
//         } else if (name === 'input1a') {
//             setDepartureDate(value);
//         }
//
//         handleInputChange(event); // Call the parent's input change handler
//     };
//
//     const handleSuggestionClick1 = (name) => {
//         setInput1Suggestions([]);
//         handleInputChange({ target: { name: 'input1', value: name } });
//     };
//
//     const handleSuggestionClick2 = (name) => {
//         setInput2Suggestions([]);
//         handleInputChange({ target: { name: 'input1a', value: name } });
//     };
//
//     const handleFilter = () => {
//         if (departureIata && arrivalIata && departureDate) {
//             const year = departureDate.getFullYear();
//             const month = String(departureDate.getMonth() + 1).padStart(2, '0');
//             const day = String(departureDate.getDate()).padStart(2, '0');
//
//             const formattedDepartureDate = `${year}-${month}-${day}`;
//             console.log('Filtering with values:', {
//                 departureIata,
//                 arrivalIata,
//                 formattedDepartureDate
//             });
//
//             const filtered = flights.filter(flight => {
//                 const depIata = flight.airline.iata;
//                 const arrIata = flight.arrival.airport.iata;
//                 const depDate = new Date(flight.departure.scheduledTime.utc).toISOString().split('T')[0];
//
//                 console.log(`Checking flight: ${flight.number}`, {
//                     depIata,
//                     arrIata,
//                     depDate,
//                     match: depIata === departureIata && arrIata === arrivalIata && depDate === formattedDepartureDate
//                 });
//
//                 return depIata === departureIata && arrIata === arrivalIata && depDate === formattedDepartureDate;
//             });
//             setFilteredFlights(filtered);
//             setIsFiltered(true);
//         } else {
//             setFilteredFlights([]);
//             setIsFiltered(true);
//         }
//     };
//
//     const handleInputChange3 = (e) => {
//         const { name, value } = e.target;
//         if (name === 'departureIata') {
//             setDepartureIata(value);
//         } else if (name === 'arrivalIata') {
//             setArrivalIata(value);
//         } else if (name === 'input2') {
//             setDepartureDate(value);
//         }
//         handleInputChange(e); // Call the parent's input change handler
//     };
//
//     return (
//         <div>
//             <div className="container">
//                 <div className="card p-5" style={{backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"}}>
//                     <label htmlFor="input1" className="block text-gray-700 text-sm font-bold mb-2">
//                         Dzień dobry! Sprawdźmy, czy linia lotnicza jest Ci winna odszkodowanie. Podaj miejsce docelowe
//                         podróży.
//                     </label>
//                     <div className="flex flex-col md:flex-row">
//                         <FontAwesomeIcon icon={faPlaneDeparture} className="icon p-2"/>
//                         <input
//                             placeholder="e.g. New York or JFK"
//                             type="text"
//                             id="input1"
//                             name="departureIata"
//                             value={departureIata}
//                             onChange={handleInputChange1}
//                             className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                         <FontAwesomeIcon icon={faCalendarDays} className="icon p-2"/>
//                         <DatePicker
//                             selected={departureDate}
//                             onChange={date => handleInputChange3({target: {name: 'input2', value: date}})}
//                             dateFormat="MM/dd/yyyy"
//                             placeholderText="Wybierz date"
//                             className="date-picker flex-1 mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                     </div>
//                     <div className="suggestions">
//                         <ul>
//                             {input1Suggestions.map(airport => (
//                                 <li key={airport.code} onClick={() => handleSuggestionClick1(airport.name)}>
//                                     {airport.name}
//                                 </li>
//                             ))}
//                         </ul>
//                         <ul>
//                             {input2Suggestions.map(airport => (
//                                 <li key={airport.code} onClick={() => handleSuggestionClick2(airport.name)}>
//                                     {airport.name}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                     <button onClick={searchFlights}>Search</button>
//                 </div>
//             </div>
//             <div className="container mt-5">
//                 <div className="card p-5" style={{ backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F" }}>
//                     <label htmlFor="input12" className="block text-gray-700 text-sm font-bold mb-2">
//                         Czy Twój lot obejmował przesiadkę?:
//                     </label>
//                     <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
//                         <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
//                             <div className="flex items-center ps-3">
//                                 <input
//                                     id="yes-checkbox"
//                                     type="checkbox"
//                                     checked={formData.input1b}
//                                     onChange={() => handleCheckboxChange('input1b', 'input1c')}
//                                     className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
//                                 />
//                                 <label htmlFor="yes-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
//                                     Tak
//                                 </label>
//                             </div>
//                         </li>
//                         <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
//                             <div className="flex items-center ps-3">
//                                 <input
//                                     id="no-checkbox"
//                                     type="checkbox"
//                                     checked={formData.input1c}
//                                     onChange={() => handleCheckboxChange('input1c', 'input1b')}
//                                     className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
//                                 />
//                                 <label htmlFor="no-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
//                                     Nie
//                                 </label>
//                             </div>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//             <div className="container mt-5">
//                 <div className="card p-5" style={{ backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F" }}>
//                     <label htmlFor="input2" className="block text-gray-700 text-sm font-bold mb-2">
//                         Podaj date wylotu
//                     </label>
//                     <div className="flex">
//
//                         <FontAwesomeIcon icon={faPlaneArrival} className="icon p-2" />
//                         <input
//                             placeholder="e.g. London or LHR"
//                             type="text"
//                             id="input1a"
//                             name="arrivalIata"
//                             value={arrivalIata}
//                             onChange={handleInputChange2}
//                             className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                     </div>
//                 </div>
//             </div>
//
//             <div className="container mt-5">
//                 <div className="card p-5" style={{ backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F" }}>
//                     <label htmlFor="input12" className="block text-gray-700 text-sm font-bold mb-2">
//                         Następnie wybierz swój lot z listy:
//                     </label>
//
//                     <button onClick={handleFilter} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
//                         Filter Flights
//                     </button>
//
//                     {isFiltered && filteredFlights.length === 0 ? (
//                         <p className="mt-4">No flights found</p>
//                     ) : (
//                         <ul className="w-full">
//                             {filteredFlights.map((flight, index) => (
//                                 <li key={index} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
//                                     <div className="flex items-center ps-3">
//                                         <input
//                                             id={`checkbox-${index}`}
//                                             type="checkbox"
//                                             // checked={formData[`input3-${index}`]}
//                                             // onChange={() => handleCheckboxChange(`input3-${index}`)}
//                                             checked={formData.input3}
//                                             onChange={() => handleCheckboxChange('input3', 'input3a')}
//                                             className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
//                                         />
//                                         <div className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
//                                             <p><strong>Departure Time:</strong> {flight.departure.revisedTime.local}</p>
//                                             <p><strong>Airline:</strong> {flight.airline.name}</p>
//                                             <p><strong>Flight Number:</strong> {flight.number}</p>
//                                         </div>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     )}
//
//                     <ul className="w-full">
//                         <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
//                             <div className="flex items-center ps-3">
//                                 <input
//                                     id="no-checkbox"
//                                     type="checkbox"
//                                     checked={formData.input3a}
//                                     onChange={() => handleCheckboxChange('input3a', 'input3')}
//                                     className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
//                                 />
//                                 <label htmlFor="no-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
//                                     Nie mogę znaleźć swojego lotu
//                                 </label>
//                             </div>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// };


const Step4 = ({ formData, handleInputChange }) => {
    const [inputText, setInputText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleLocalInputChange = (e) => {
        const { value } = e.target;
        setInputText(value);
        handleInputChange(e); // Call the parent's handleInputChange
        // Filter airlines based on input text
        const filteredAirlines = airlinesData.filter((airline) =>
            airline.name.toLowerCase().includes(value.toLowerCase())
        );
        // Limit suggestions to 5
        setSuggestions(filteredAirlines.slice(0, 5));
    };

    // Function to handle suggestion selection
    // Function to handle suggestion selection
    const handleSuggestionClick = (suggestion) => {
        const event = { target: { name: 'input4', value: suggestion.name } };
        handleInputChange(event); // Update input value using global function
        setInputText(suggestion.name); // Update local state
        setSuggestions([]); // Clear suggestions
    };


    return (

    <div>
        <div className="container container-padding">
            <div className="card p-5  w-100" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input3" className="block text-gray-700 text-sm font-bold mb-2">{t("step2.instruction")}</label>
                <input type="text" placeholder={t("step2.airlinePlaceholder")} id="input4" name="input4" value={formData.input4}
                       onChange={handleLocalInputChange}
                       className="mb-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                {/* Display suggestions */}
                <ul>
                    {suggestions.map((airline) => (
                        <li key={airline.id} onClick={() => handleSuggestionClick(airline)}>{airline.name}</li>
                    ))}
                </ul>
                <div className="flex flex-col md-flex-row items-center">
                    <input
                        type="text"
                        id="input4a"
                        name="input4a"
                        placeholder={t("step2.flightNumberPlaceholder")}
                        value={formData.input4a}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded py-2 col-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <FontAwesomeIcon icon={faCalendarDays} className="icon p-2"/>
                    {/*<DatePicker*/}
                    {/*    selected={formData.input4b}*/}
                    {/*    // onChange={date => handleInputChange({target: {name: 'input4b', value: date}})}*/}
                    {/*    onChange={handleInputChange}*/}
                    {/*    // dateFormat="yyyy/MM/dd" // You can customize the date format*/}
                    {/*    placeholderText="Wybierz date"*/}
                    {/*    className="date-picker flex-1 mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"*/}
                    {/*/>*/}
                    <input type="text"
                           id="input4b"
                           name="input4b"
                           value={formData.input4b}
                           // onChange={date => handleInputChange({target: {name: 'input4b', value: date}})}
                           onChange={handleInputChange}
                        // format="MM/dd/yyyy" // You can customize the date format
                           placeholder={t("step2.datePlaceholder")}
                           className="flex-1 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus: w-100"
                    />
                </div>
            </div>
        </div>
    </div>
    );
};

const Step5 = ({formData, handleInputChange, checkboxes, handleCheckboxChange, setData}) => {
    const [input5, setInput5] = useState(false);
    const [input5a, setInput5a] = useState(false);
    const [input5b, setInput5b] = useState(false);
    const [input5c, setInput5c] = useState(false);
    const [input5d, setInput5d] = useState(false);
    const [input5e, setInput5e] = useState(false);
    const [input5f, setInput5f] = useState(false);
    const [input5g, setInput5g] = useState(false);
    const [input5h, setInput5h] = useState(false);
    const [yesChecked, setYesChecked] = useState(false);
    const [noChecked, setNoChecked] = useState(false);

    const handleCheckboxChangeDynamic = (group, inputName, index) => {
        setData((prevState) => {
            const newState = { ...prevState };
            // Toggle the state of the clicked checkbox
            newState[inputName] = index;
            // Define the checkbox groups
            const checkboxGroups = {
                group1: ['input5', 'input5a', 'input5b'],
                group2: ['input5c', 'input5d', 'input5e', 'input5f', 'input5g', 'input5h'],
                group3: ['input5i', 'input5j']
                // Add more groups here if needed
            };
            // Get the relevant group of checkboxes
            const otherInputNames = checkboxGroups[group];
            // Set other checkboxes in the group to false
            otherInputNames.forEach((name) => {
                if (name !== inputName) {
                    newState[name] = false;
                }
            });
            return newState;
        });
    };

    return (
        <div>
            <div className="container container-padding">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input5" className="block text-gray-700 text-sm font-bold mb-2">{t("step3.disruption.label")}</label>
                <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5"
                                type="checkbox"
                                checked={formData.input5 === `${t("step3.disruption.options.delayed")}`}
                                onChange={() => handleCheckboxChangeDynamic('group1', 'input5',`${t("step3.disruption.options.delayed")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.disruption.options.delayed")}
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5a"
                                type="checkbox"
                                checked={formData.input5 === `${t("step3.disruption.options.canceled")}`}
                                onChange={() => handleCheckboxChangeDynamic('group1', 'input5', `${t("step3.disruption.options.canceled")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5a"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.disruption.options.canceled")}
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5b"
                                type="checkbox"
                                checked={formData.input5 === `${t("step3.disruption.options.denied")}`}
                                onChange={() => handleCheckboxChangeDynamic('group1', 'input5',`${t("step3.disruption.options.denied")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5b"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.disruption.options.denied")}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container  container-padding mt-5">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input4c" className="block text-gray-700 text-sm font-bold mb-2">{t("step3.delayDuration.label")}</label>
                <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5b"
                                type="checkbox"
                                checked={formData.input5c === `${t("step3.delayDuration.options.0-1")}`}
                                onChange={() => handleCheckboxChangeDynamic('group2', 'input5c',`${t("step3.delayDuration.options.0-1")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5c"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.delayDuration.options.0-1")}
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5d"
                                type="checkbox"
                                checked={formData.input5c === `${t("step3.delayDuration.options.1-2")}`}
                                onChange={() => handleCheckboxChangeDynamic('group2', 'input5c', `${t("step3.delayDuration.options.1-2")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5d"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.delayDuration.options.1-2")}
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5e"
                                type="checkbox"
                                checked={formData.input5c === `${t("step3.delayDuration.options.2-3")}`}
                                onChange={() => handleCheckboxChangeDynamic('group2', 'input5c',`${t("step3.delayDuration.options.2-3")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5e"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.delayDuration.options.2-3")}
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5f"
                                type="checkbox"
                                checked={formData.input5c === `${t("step3.delayDuration.options.3-4")}`}
                                onChange={() => handleCheckboxChangeDynamic('group2', 'input5c',`${t("step3.delayDuration.options.3-4")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5f"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.delayDuration.options.3-4")}
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5g"
                                type="checkbox"
                                checked={formData.input5c === `${t("step3.delayDuration.options.4+")}`}
                                onChange={() => handleCheckboxChangeDynamic('group2', 'input5c',`${t("step3.delayDuration.options.4+")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5g"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.delayDuration.options.4+")}
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5h"
                                type="checkbox"
                                checked={formData.input5c === `${t("step3.delayDuration.options.noArrival")}`}
                                onChange={() => handleCheckboxChangeDynamic('group2', 'input5c',`${t("step3.delayDuration.options.noArrival")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5h"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.delayDuration.options.noArrival")}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container  container-padding mt-5">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input4i" className="block text-gray-700 text-sm font-bold mb-2">{t("step3.voluntarySurrender.label")}</label>
                <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="yes-checkbox"
                                type="checkbox"

                                checked={formData.input5i === `${t("step3.voluntarySurrender.options.yes")}`}
                                onChange={() => handleCheckboxChangeDynamic('group3', 'input5i',`${t("step3.voluntarySurrender.options.yes")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="yes-checkbox"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.voluntarySurrender.options.yes")}
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="no-checkbox"
                                type="checkbox"
                                checked={formData.input5i === `${t("step3.voluntarySurrender.options.no")}`}
                                onChange={() => handleCheckboxChangeDynamic('group3', 'input5i',`${t("step3.voluntarySurrender.options.no")}`)}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="no-checkbox"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {t("step3.voluntarySurrender.options.no")}
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    );
};


const Step6 = ({formData, handleInputChange, checkboxes, handleCheckboxChange, setData}) => {
    const [input6c, setInput6c] = useState(false);
    const [input6d, setInput6d] = useState(false);
    const [input6e, setInput6e] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const handleCheckboxChangeDynamic = (group, inputName, index) => {
        setData((prevState) => {
            const newState = { ...prevState };
            // Toggle the state of the clicked checkbox
            newState[inputName] = index;
            // Define the checkbox groups
            const checkboxGroups = {
                group1: ['input6c', 'input6d', 'input6e']
                // Add more groups here if needed
            };
            // Get the relevant group of checkboxes
            const otherInputNames = checkboxGroups[group];
            // Set other checkboxes in the group to false
            otherInputNames.forEach((name) => {
                if (name !== inputName) {
                    newState[name] = false;
                }
            });
            return newState;
        });
    };

    const handleOpenModal1 = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal1 = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal2 = () => {
        setIsModalOpen2(true);
    };

    const handleCloseModal2 = () => {
        setIsModalOpen2(false);
    };

    // Email validation function

    return (
        <div>
            <div className="container container-padding">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input6_label" className="block text-gray-700 text-sm font-bold mb-2">{t("step4.title")}</label>
                    <input type="text" id="input6" placeholder={t("step4.firstNamePlaceholder")} name="input6" value={formData.input6}
                           onChange={handleInputChange}
                           className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <input type="text" id="input6a" placeholder={t("step4.lastNamePlaceholder")} name="input6a" value={formData.input6a}
                           onChange={handleInputChange}
                           className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <input
                        type="email"
                        id="input6b"
                        placeholder={t('step4.emailPlaceholder')}
                        name="input6b"
                        value={formData.input6b}
                        onChange={handleInputChange} // Handle email change with validation
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>
            <div className="container container-padding mt-5">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input6a_label"
                           className="block text-gray-700 text-sm font-bold mb-2">{t("step4.title")}</label>
                    <br/>
                    <ul>
                        <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="input6c"
                                    type="checkbox"
                                    checked={formData.input6c === `${t("step4.consents.selectAll")}`}
                                    onChange={() => handleCheckboxChangeDynamic('group1', 'input6c', `${t("step4.consents.selectAll")}`)}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="input6c"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {t('step4.consents.selectAll')}
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="input6d"
                                    type="checkbox"
                                    checked={formData.input6c === `${t("step4.consents.consent1")}`}
                                    onChange={() => handleCheckboxChangeDynamic('group1', 'input6c',`${t("step4.consents.consent1")}`)}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                {/* Clickable label */}
                                <label
                                    htmlFor="input6d"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    <button onClick={handleOpenModal1} className="text-blue-500 hover:underline">
                                        {t('step4.consents.consent1')}
                                    </button>
                                </label>
                                {/* Modal Popup */}
                                {isModalOpen && (
                                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                                        <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
                                            <h2 className="text-xl font-semibold mb-2">{t('step4.consents.consent1')}</h2>

                                            {/* PDF iframe */}
                                            <iframe
                                                src="media/pdf/1.pdf" // Replace with the path to your PDF
                                                width="100%"
                                                height="400px"
                                                className="border-none"
                                                title="Zgoda nr 1"
                                            ></iframe>

                                            <button
                                                onClick={handleCloseModal1}
                                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                {t('step4.modal.closeButton')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="input6e"
                                    type="checkbox"
                                    checked={formData.input6c === `${t("step4.consents.consent2")}`}
                                    onChange={() => handleCheckboxChangeDynamic('group1', 'input6c', `${t("step4.consents.consent2")}`)}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="input6e"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    <button onClick={handleOpenModal2} className="text-blue-500 hover:underline">
                                        {t('step4.consents.consent2')}
                                    </button>
                                </label>
                                {/* Modal Popup */}
                                {isModalOpen2 && (
                                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                                        <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
                                            <h2 className="text-xl font-semibold mb-2">{t('step4.consents.consent2')}</h2>

                                            {/* PDF iframe */}
                                            <iframe
                                                src="media/pdf/2.pdf" // Replace with the path to your PDF
                                                width="100%"
                                                height="400px"
                                                className="border-none"
                                                title="Zgoda nr 2"
                                            ></iframe>

                                            <button
                                                onClick={handleCloseModal2}
                                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                {t('step4.modal.closeButton')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
        ;
};

const Step7 = ({formData, handleInputChange, checkboxes, handleCheckboxChange, setData}) => {
    const [yesChecked, setYesChecked] = useState(false);
    const [noChecked, setNoChecked] = useState(false);

    const handleCheckboxChangeDynamic = (group, inputName, index) => {
        setData((prevState) => {
            const newState = { ...prevState };
            // Toggle the state of the clicked checkbox
            newState[inputName] = index;
            // Define the checkbox groups
            const checkboxGroups = {
                group1: ['input7a', 'input7b']
                // Add more groups here if needed
            };
            // Get the relevant group of checkboxes
            const otherInputNames = checkboxGroups[group];
            // Set other checkboxes in the group to false
            otherInputNames.forEach((name) => {
                if (name !== inputName) {
                    newState[name] = false;
                }
            });
            return newState;
        });
    };

    return (
        <div>
            <div className="container container-padding">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input7" className="block text-gray-700 text-sm font-bold mb-2">{t('step5.title1')}</label>
                </div>
            </div>
            <div className="container  container-padding mt-5">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input7a" className="block text-gray-700 text-sm font-bold mb-2">{t('step5.title2')}</label>
                    <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="yes-checkbox"
                                    type="checkbox"

                                    checked={formData.input7a === `${t('step5.checkboxYes')}`}
                                    onChange={() => handleCheckboxChangeDynamic('group1', 'input7a',`${t('step5.checkboxYes')}`)}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="yes-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {t('step5.checkboxYes')}
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="no-checkbox"
                                    type="checkbox"
                                    checked={formData.input7a === `${t('step5.checkboxNo')}`}
                                    onChange={() => handleCheckboxChangeDynamic('group1', 'input7a',`${t('step5.checkboxNo')}`)}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="no-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {t('step5.checkboxNo')}
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {formData.input7a === `${t('step5.checkboxYes')}` && (
                <div className="container container-padding mt-5">
                    <div className="card p-5" style={{
                        backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                    }}>
                        <label htmlFor="input7c" className="block text-gray-700 text-sm font-bold mb-2">{t('step5.passengersLabel')}</label>
                        <textarea id="input7c" placeholder={t('step5.passengersPlaceholder')} name="input7c" value={formData.input7c}
                                  onChange={handleInputChange}
                                  className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        {/*<input type="text" id="input7d" placeholder="Nazwisko" name="input7d" value={formData.input7d}*/}
                        {/*       onChange={handleInputChange}*/}
                        {/*       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>*/}
                        {/*<input type="text" id="input7e" placeholder="Adres Email" name="input7e" value={formData.input7e}*/}
                        {/*       onChange={handleInputChange}*/}
                        {/*       className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>*/}

                    </div>
                </div>
            )}
    </div>

);
};

const Step8 = ({formData, handleInputChange}) => (
    <div>
        <div className="container container-padding">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input8" className="block text-gray-700 text-sm font-bold mb-2">{t('step6.title')}</label>
                <input type="text" id="input8" placeholder={t('step6.addressPlaceholder')} name="input8" value={formData.input8}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8a" placeholder={t('step6.apartmentPlaceholder')} name="input8a"
                       value={formData.input8a}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8b" placeholder={t('step6.cityPlaceholder')} name="input8b" value={formData.input8b}
                       onChange={handleInputChange}
                       className=" mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8c" placeholder={t('step6.postalCodePlaceholder')} name="input8c" value={formData.input8c}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8d" placeholder={t('step6.provincePlaceholder')} name="input8d" value={formData.input8d}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8e" placeholder={t('step6.countryPlaceholder')} name="input8e" value={formData.input8e}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8f" placeholder={t('step6.phonePlaceholder')} name="input8f" value={formData.input8f}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8g" placeholder={t('step6.peselPlaceholder')} name="input8g" value={formData.input8g}
                       onChange={handleInputChange}
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
        </div>
    </div>
);

const Step9 = ({formData, handleInputChange}) => (
    <div>
        <div className="container container-padding">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input9" className="block text-gray-700 text-sm font-bold mb-2">{t('step7.title')}</label>
        <input type="text" id="input9" placeholder={t('step7.reservationNumberPlaceholder')} name="input9" value={formData.input9} onChange={handleInputChange}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
        </div>
        <div className="container container-padding mt-5">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input9a" className="block text-gray-700 text-sm font-bold mb-2">{t('step7.reservationNumberInfoTitle')}</label>
                <p>{t('step7.reservationNumberInfo')}</p>
                <p></p>
            </div>
        </div>
    </div>
);

const Step10 = ({ formData, handleInputChange, setData }) => {
    const [discountValidation, setDiscountValidation] = useState(null);
    const signatureRef = useRef(null);

    // Function to clear the signature pad
    const clearSignature = () => {
        signatureRef.current.clear();
    };

    // Function to save the signature
    const saveSignature = () => {
        if (signatureRef.current.isEmpty()) {
            // Signature is empty, handle error or prompt user to draw a signature
            return;
        }

        // Get the signature data as an image URL
        const signatureData = signatureRef.current.toDataURL();
        handleInputChange({ target: { name: 'signature', value: signatureData } });

        // // Set the captured signature in state
        // setSignature(signatureData);

        // You can now handle saving the signature data here, such as sending it to a server or saving it locally
        // Example:
        // axios.post('/save-signature', { signature: signatureData })
        //   .then(response => {
        //     console.log('Signature saved:', response.data);
        //   })
        //   .catch(error => {
        //     console.error('Error saving signature:', error);
        //   });
    };

    const validateDiscountCode = () => {
        axios.post(route('multistep.validateDiscount'), { input10: formData.input10 }) // Changed to input10
            .then(response => {
                setDiscountValidation(response.data);
                if (!response.data.valid) {
                    setData('input10', ''); // Clear the input if the code is invalid
                }
            })
            .catch(error => {
                console.error(t('step8.discountValidationMessage.invalid'), error);
                setDiscountValidation({ valid: false, message: t('step8.discountValidationMessage.invalid') });
                setData('input10', ''); // Clear the input if there is an error
            });
    };

    const handleDiscountCodeChange = (e) => {
        const code = e.target.value;
        validateDiscountCode(code);
    };

    return (
        <div>
            <div className="container container-padding">
                <div className="card p-5" style={{backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"}}>
                    <label htmlFor="input10" className="block text-gray-700 text-sm font-bold mb-2">{t('step8.title')}</label>
                    {/* Signature Pad */}
                    <div>
                        {/*<SignatureCanvas*/}
                        {/*    ref={signatureRef}*/}
                        {/*    canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}*/}
                        {/*/>*/}
                    </div>
                    {/* End Signature Pad */}
                    <input type="text" placeholder={t('step8.discountCodePlaceholder')}
                           id="input10" name="input10" value={formData.input10} onChange={handleInputChange}
                           onBlur={handleDiscountCodeChange}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <button onClick={handleDiscountCodeChange} className="btn btn-primary mt-2">{t('step8.checkCodeButton')}
                    </button>
                    {discountValidation && (
                        <p className={discountValidation.valid ? 'text-green-500' : 'text-red-500'}>
                            {discountValidation.valid
                                ? t('step8.discountValidationMessage.valid')
                                : t('step8.discountValidationMessage.invalid')}
                        </p>
                    )}
                    <div>
                        <div className="signature-container mt-3">
                            <SignaturePad ref={signatureRef}/>
                            <div className="pen-icon">
                                <FontAwesomeIcon icon={faPencil}/>
                            </div>
                        </div>
                        <div className="p-3">
                            <button className="bg-gray-700 text-white rounded-sm mr-2 shadow p-1" onClick={clearSignature} style={{backgroundColor: "#FE9898"}}>{t('step8.resetButton')}</button>
                            <button className="bg-gray-700 text-white rounded-sm mr-2 shadow p-1" onClick={saveSignature}>{t('step8.saveButton')}</button>
                        </div>

                        <p className="text-yellow-500">
                            {t('step8.signaturePrompt')}
                        </p>
                    </div>
                    {/*/!* Display the saved signature *!/*/}
                    {/*{signature && (*/}
                    {/*    <img src={signature} alt="Saved Signature" />*/}
                    {/*)}*/}

                </div>
            </div>
        </div>
    );
};


const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [step1Valid, setStep1Valid] = useState(true); // State to track Step 1 validation
    const { data, setData, post } = useForm({
        input1: '',
        input1a: '',
        input1b: '',
        input1c: '',
        input2: '',
        input3: '',
        input3a: '',
        input4: '',
        input4a: '',
        input4b: '',
        input5: '',
        input5a: '',
        input5b: '',
        input5c: '',
        input5d: '',
        input5e: '',
        input5f: '',
        input5g: '',
        input5h: '',
        input5i: '',
        input5j: '',
        input6: '',
        input6a: '',
        input6b: '',
        input6c: '',
        input6d: '',
        input6e: '',
        input7a: '',
        input7b: '',
        input7c: '',
        input7d: '',
        input7e: '',
        input8: '',
        input8a: '',
        input8b: '',
        input8c: '',
        input8d: '',
        input8e: '',
        input8f: '',
        input8g: '',
        input9: '',
        input10: '',
        signature: '', // Add the signature field
        uuid: '',
        pdf_path: '',
        // Define other form fields here
    });



    const steps = [Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10]; // Add other steps here
    const totalSteps = steps.length;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));

    };


    const handleCheckboxChange = (inputName1, inputName2, inputName3, inputName4, inputName5, inputName6, inputName7, inputName8, inputName9, inputName10, text = '') => {
        setData((prevState) => {
            const newState = {
                ...prevState,
                [inputName1]: !prevState[inputName1],
                [inputName2]: false,
                [inputName3]: false,
                [inputName4]: false,
                [inputName5]: false,
                [inputName6]: false,
                [inputName7]: false,
                [inputName8]: false,
                [inputName9]: false,
                [inputName10]: false,
                text: text
            };

            // Only set the text if the checkbox is being checked
            if (!prevState[inputName1]) {
                newState.text = text;
            } else {
                newState.text = ''; // Clear text if the checkbox is being unchecked
            }

            return newState;
        });
    };



    // const handleCheckboxChange = (inputName, index) => {
    //     setData((prevState) => {
    //         // Create a new state object
    //         const newState = { ...prevState };
    //         // Toggle the state of the clicked checkbox
    //         newState[inputName] = index;
    //         // Set other checkboxes to false
    //         const otherInputNames = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6', 'input7', 'input8', 'input9', 'input10'];
    //         otherInputNames.forEach((name) => {
    //             if (name !== inputName) {
    //                 newState[name] = false;
    //             }
    //         });
    //         return newState;
    //     });
    // };

    const [error, setError] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.signature) {
            setError('Signature is required.');
            return;
        }
        post(route('form.submit'), {
            onSuccess: () => {
                console.log('Form submitted successfully!');
                Inertia.visit(route('form.success'));
            },
            onError: (errors) => {
                console.error('Error submitting form:', errors);
                // Handle errors here (e.g., display error messages)
            },
        });
    };

    const nextStep = () => {
        const currentStepValidation = validateStep(step);
        if (!currentStepValidation) return;
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const [errorMessage, setErrorMessage] = useState('');

    const validateStep = (stepNumber) => {
        setErrorMessage(''); // Clear previous error messages

    // const validateStep = (stepNumber) => {
        // Implement validation logic for each step
        switch (stepNumber) {
            case 1:
            //     if (!data.input1 || !data.input1a) {
            //         console.log("Please fill out input1 and input1a");
            //         setStep1Valid(false); // Set Step 1 validation status to false
            //         return false;
            //     }
            //
                // Check if either input1b or input1c is selected, but not both
                if ((data.input1b && data.input1c) || (!data.input1b && !data.input1c)) {
                    console.log("Zaznacz swój lot i zaznacz czy pzesiadka też miała miejsce");
                    setErrorMessage(t('validation.input1bInput1cError')); // Clear previous error messages                    setStep1Valid(false); // Set Step 1 validation status to false
                    setStep1Valid(false);
                    return false;
                }

                // if (!data.input2) {
                //     console.log("Please fill out input2");
                //     <p className="text-red-500">Zaznacz swój lot i zaznacz czy pzesiadka też miała miejsce </p>
                //     setStep1Valid(false); // Set Step 1 validation status to false
                //     return false;
                // }

                // Check if either input1b or input1c is selected, but not both
                if ((data.input3 && data.input3a) || (!data.input3a && !data.input3)) {
                    console.log("Please select either input1b or input1c");
                    setErrorMessage("Zaznacz swój lot"); // Clear previous error messages
                    setStep1Valid(false); // Set Step 1 validation status to false
                    return false;
                } else {
                    setStep1Valid(true); // Set Step 1 validation status to true if validation passes
                }
                break;
            // Add validation for other steps as needed
            case 2:
                if (!data.input4) {
                    setErrorMessage(t('validation.input4Error'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input4a) {
                    setErrorMessage(t('validation.input4aError'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input4b) {
                    setErrorMessage(t('validation.input4bError'));
                    setStep1Valid(false);
                    return false;
                }

                setStep1Valid(true);
                break;
            // Add validation for other steps as needed
            case 3:
                // Check if either input1b or input1c is selected, but not both
                if ((data.input5 && data.input5a && data.input5b) || (!data.input5 && !data.input5a && !data.input5b)) {
                    console.log("Please select either input1b or input1c");
                    setErrorMessage(t('validation.input5input5ainput5bError'));
                    setStep1Valid(false); // Set Step 1 validation status to false
                    return false;
                }

                // Check if either input1b or input1c is selected, but not both
                if ((data.input5c && data.input5d && data.input5e && data.input5f && data.input5g && data.input5h) || (!data.input5c && !data.input5d && !data.input5e && !data.input5f && !data.input5g && !data.input5h))  {
                    console.log("Please select either input1b or input1c");
                    setErrorMessage(t('validation.input5ctoinput5hError'));
                    setStep1Valid(false); // Set Step 1 validation status to false
                    return false;
                }

                // Check if either input1b or input1c is selected, but not both
                if ((data.input5i && data.input5j) || (!data.input5i && !data.input5j)) {
                    setErrorMessage(t('validation.input5iInput5cError'));
                    console.log("Please select either input1b or input1c");
                    setStep1Valid(false); // Set Step 1 validation status to false
                    return false;
                }

                setStep1Valid(true); // Set Step 1 validation status to true if validation passes
                break;
            // Add validation for other steps as needed
            case 4:
                if (!data.input6) {
                    setErrorMessage(t('validation.input6Error'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input6a) {
                    setErrorMessage(t('validation.input6aError'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input6b) {
                    setErrorMessage(t('validation.input6bError'));
                    setStep1Valid(false);
                    return false;
                }

                // Validate email format using a regular expression
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailPattern.test(data.input6b)) {
                    setErrorMessage(t('validation.input6bbError'));
                    setStep1Valid(false);
                    return false;
                }

                // // Check if either input1b or input1c is selected, but not both
                // if (!data.input6 || !data.input6a || !data.input6b) {
                //     console.log("Please fill out input1 and input1a");
                //     setStep1Valid(false); // Set Step 1 validation status to false
                //     return false;
                // }

                // Check if either input1b or input1c is selected, but not both
                if ((data.input6c && data.input6d && data.input6e) || (!data.input6c && !data.input6d && !data.input6e)) {
                    console.log("Please select either input1b or input1c");
                    setErrorMessage(t('validation.input6cError'));
                    setStep1Valid(false); // Set Step 1 validation status to false
                    return false;
                }

                setStep1Valid(true); // Set Step 1 validation status to true if validation passes
                break;
            case 5:
                // Check if either input1b or input1c is selected, but not both
                if ((data.input7a && data.input7b) || (!data.input7a && !data.input7b)) {
                    console.log("Please select either input1b or input1c");
                    setErrorMessage(t('validation.input5input5ainput5bError'));
                    setStep1Valid(false); // Set Step 1 validation status to false
                    return false;
                }

                // // Check if either input1b or input1c is selected, but not both
                // if (!data.input7c) {
                //     console.log("Please fill out input1 and input1a");
                //     setStep1Valid(false); // Set Step 1 validation status to false
                //     return false;
                // }

                setStep1Valid(true); // Set Step 1 validation status to true if validation passes
                break;
            case 6:
                if (!data.input8) {
                    setErrorMessage(t('validation.input8Error'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input8a) {
                    setErrorMessage(t('validation.input8aError'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input8b) {
                    setErrorMessage(t('validation.input8bError'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input8c) {
                    setErrorMessage(t('validation.input8cError'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input8d) {
                    setErrorMessage(t('validation.input8dError'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input8e) {
                    setErrorMessage(t('validation.input8eError'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input8f) {
                    setErrorMessage(t('validation.input8fError'));
                    setStep1Valid(false);
                    return false;
                }

                if (!data.input8g) {
                    setErrorMessage(t('validation.input8gError'));
                    setStep1Valid(false);
                    return false;
                } else {
                    setStep1Valid(true); // Set Step 1 validation status to true if validation passes
                }
                break;

            // Add validation for other steps as needed
            case 7:
                // Check if either input1b or input1c is selected, but not both
                if (!data.input9 ) {
                    setErrorMessage(t('validation.input9Error'));
                    setStep1Valid(false); // Set Step 1 validation status to false
                    return false;
                } else {
                    setStep1Valid(true); // Set Step 1 validation status to true if validation passes
                }
                break;
            case 8:
                if ((!data.signature)) {
                    setErrorMessage(t('validation.signatureError'));
                    setStep1Valid(false);
                    return false;
                } else {
                    setStep1Valid(true); // Set Step 1 validation status to true if validation passes
                }

            case 9:

            default:
                break;

        }
        return true;
    };

    const [selectedFlight, setSelectedFlight] = useState(null); // State to store the selected flight

    const renderStep = (stepNumber) => {
        const CurrentStepComponent = steps[stepNumber - 1];
        return (
            <div className="container container-padding" style={{flexWrap: "wrap"}}>
                <CurrentStepComponent formData={data} handleInputChange={handleInputChange} handleCheckboxChange={handleCheckboxChange} setData={setData}  setSelectedFlight={setSelectedFlight} selectedFlight={selectedFlight}/>
                {stepNumber === 1 && !step1Valid && (
                    <p className="text-red-500">{errorMessage}</p>
                )}
                {stepNumber === 2 && !step1Valid && (
                    <p className="text-red-500">
                        {errorMessage}
                    </p>
                )}
                {stepNumber === 3 && !step1Valid && (
                    <p className="text-red-500">
                        {errorMessage}
                    </p>
                )}
                {stepNumber === 4 && !step1Valid && (
                    <div className="container">
                        <p className="text-red-500">
                            {errorMessage}
                        </p>
                    </div>
                )}
                {stepNumber === 5 && !step1Valid && (
                    <p className="text-red-500">
                        {errorMessage}
                    </p>
                )}
                {stepNumber === 6 && !step1Valid && (
                    <p className="text-red-500">
                        {errorMessage}
                    </p>
                )}
                {stepNumber === 7 && !step1Valid && (
                    <p className="text-red-500">
                        {errorMessage}
                    </p>
                )}
                {stepNumber === 8 && !step1Valid && (
                    <p className="text-red-500">
                        {errorMessage}
                    </p>
                )}
                {stepNumber === 9 && !step1Valid && (
                    <p className="text-red-500">
                        Wypełnij brakujące pola
                    </p>
                )}
                {stepNumber === 10 && !step1Valid && (
                    <p className="text-red-500">
                        Wypełnij brakujące pola
                    </p>
                )}
            </div>
        );
    };

    return (
        <div>
            <div className="p-3 form-logo">
                <Link href="/">
                    <ApplicationLogo/>
                </Link>

            </div>
            <div className="bg-neutral-100">
                <div className="outer min-h-screen" style={{
                    backgroundImage: "url('media/Component_2.png')",
                    backgroundPosition: "left bottom",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100%"
                }}>
                    <div className="logo-multi mt-5 ml-5" style={{width: "200px"}}>
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                        </Link>
                    </div>
                    <div className="progress">
                        <div className="left">
                            {Array.from({length: totalSteps}).map((_, index) => (
                                <div key={index}>{index === 0 ? t('multiStep.start') : ''}</div>
                            ))}
                        </div>
                        <div className="right">
                            {Array.from({length: totalSteps}).map((_, index) => (
                                <div key={index}
                                     className={step === index + 1 ? 'current' : step > index + 1 ? 'done' : ''}>{index + 1}</div>
                            ))}
                            <div>{t('multiStep.end')}</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white min-h-screen h-full rounded-b-xl multi-form">
                    <div className="d-flex align-items-center">
                        <div className="container justify-content-end  m-5 mb-4 mr-5">
                            <label htmlFor="input9" className="block text-gray-700 text-sm font-bold mr-5 mb-2 hide-help text-right">{t('multiStep.help_text')}</label>
                        </div>
                    </div>
                    <div className="d-flex align-items-center mb-4 ml-5">
                        <img className="w-20 mr-3" src="media/employee.png" />
                        <div className="flex flex-col justify-center items-start mb-4">
                            <h5 htmlFor="input9" className="mb-2 ml-3">‎ </h5>
                            <h5 htmlFor="input9" className="mb-2 ml-3">{t('multiStep.employee_name')}</h5>
                            <label htmlFor="input9" className="block text-gray-900 text-sm font-bold mb-2 ml-3">{t('multiStep.employee_title')}</label>
                        </div>
                    </div>
                    <div className="p-6 text-gray-900">
                        {renderStep(step)}
                        <div className="mt-4">
                            {step > 1 && (
                                <button onClick={prevStep} className="mr-2 bg-transparent hover:bg-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ color: "#4F914A" }}>
                                    {t('multiStep.previous')}
                                </button>
                            )}
                            {step < totalSteps ? (
                                <button onClick={nextStep} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ backgroundColor: "#4F914A" }}>
                                    {t('multiStep.next')}
                                </button>
                            ) : (
                                <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    {t('multiStep.submit')}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiStepForm;
