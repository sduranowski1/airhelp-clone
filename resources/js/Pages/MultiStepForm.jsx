import {useEffect, useRef, useState} from 'react';
import "/resources/css/styles.css";
import axios from 'axios';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faPlaneArrival, faPlaneDeparture, faWallet} from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import SignatureCanvas from "react-signature-canvas/src";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {Link} from "@inertiajs/react";

const Step1 = ({ formData, handleInputChange }) => {
    const [airportData, setAirportData] = useState([]); // State to store airport data
    const [input1Suggestions, setInput1Suggestions] = useState([]); // Suggestions for input1
    const [input2Suggestions, setInput2Suggestions] = useState([]); // Suggestions for input2

    useEffect(() => {
        async function fetchAirportData() {
            const options = {
                method: 'GET',
                url: 'https://flight-radar1.p.rapidapi.com/airports/list',
                headers: {
                    'X-RapidAPI-Key': '235f019031msh31119753b88d6a1p197b4bjsn51625ba4c2e9',
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

    return (
        <div>
            <div className="container">
                <div className="card p-5" style={{ backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F" }}>
                    <label htmlFor="input1" className="block text-gray-700 text-sm font-bold mb-2">Dzień dobry!
                        Sprawdźmy, czy linia lotnicza jest Ci winna odszkodowanie. Podaj miejsce docelowe podróży.</label>
                    <div className="flex">
                            <FontAwesomeIcon icon={faPlaneDeparture} className="icon p-2" />
                        <input placeholder="e.g. New York or JFK" type="text" id="input1" name="input1"
                               value={formData.input1}
                               onChange={handleInputChange1}
                               className="flex-1 mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
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
                    <label htmlFor="input12" className="block text-gray-700 text-sm font-bold mb-2">Czy Twój lot
                        obejmował przesiadkę?:</label>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="yes-checkbox"
                                    type="checkbox"
                                    checked={yesChecked}
                                    onChange={() => {
                                        setYesChecked(!yesChecked);
                                        if (noChecked) setNoChecked(false);
                                    }}
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
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="no-checkbox"
                                    type="checkbox"
                                    checked={noChecked}
                                    onChange={() => {
                                        setNoChecked(!noChecked);
                                        if (yesChecked) setYesChecked(false);
                                    }}
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

const Step2 = ({formData, handleInputChange}) => (
    <div>
        <div className="container">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input2" className="block text-gray-700 text-sm font-bold mb-2">Podaj date wylotu</label>
                <div className="flex">
                    <FontAwesomeIcon icon={faCalendarDays} className="icon p-2" />
                    <DatePicker
                        selected={formData.input2}
                        onChange={date => handleInputChange({ target: { name: 'input2', value: date } })}
                        dateFormat="MM/dd/yyyy" // You can customize the date format
                        placeholderText="Wybierz date"
                        className="date-picker flex-1 mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>
        </div>
    </div>
);

const Step3 = ({ formData, handleInputChange, checkboxes, handleCheckboxChange }) => {
    return (
        <div>
            <div className="container">
                <div className="card p-5" style={{ backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F" }}>
                    <label htmlFor="input12" className="block text-gray-700 text-sm font-bold mb-2">Następnie wybierz swój lot z listy:</label>
                    <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="yes-checkbox"
                                    type="checkbox"
                                    checked={formData.input3}
                                    onChange={() => handleCheckboxChange('input3', 'Dynamiczna Lista Lotów')} // Pass label name
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="yes-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Dynamiczna Lista Lotów
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="no-checkbox"
                                    type="checkbox"
                                    checked={formData.input3a}
                                    onChange={() => handleCheckboxChange('input3a', 'Nie mogę znaleść swojego lotu')} // Pass label name
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="no-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Nie mogę znaleść swojego lotu
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};



const Step4 = ({formData, handleInputChange}) => (
    <div>
        <div className="container">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input3" className="block text-gray-700 text-sm font-bold mb-2">W porządku. Potrzebuję
                    jeszcze tylko kilku informacji dotyczących lotu, aby sprawdzić, czy kwalifikuje się on do
                    odszkodowania.</label>
                <input type="text" placeholder="Np. British Airways" id="input4" name="input4" value={formData.input4}
                       onChange={handleInputChange}
                       className="mb-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <div className="flex items-center">
                    <input
                        type="text"
                        id="input4a"
                        name="input4a"
                        placeholder="Nr Lotu"
                        value={formData.input4a}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded py-2 col-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <FontAwesomeIcon icon={faCalendarDays} className="icon p-2"/>
                    <DatePicker
                        selected={formData.input4b}
                        onChange={date => handleInputChange({target: {name: 'input4b', value: date}})}
                        dateFormat="MM/dd/yyyy" // You can customize the date format
                        placeholderText="Pick date"
                        className="date-picker flex-1 mr-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>
        </div>
    </div>
);

const Step5 = ({formData, handleInputChange}) => {
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

    return (
    <div>
        <div className="container">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
            <label htmlFor="input5" className="block text-gray-700 text-sm font-bold mb-2">Teraz przejdźmy do samego
                    zakłócenia. Co dokładnie się wydarzyło?</label>
                <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5"
                                type="checkbox"
                                checked={input5}
                                onChange={() => {
                                    setInput5(!input5);
                                    // You can add logic here if needed
                                }}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Mój lot został opóźniony
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5a"
                                type="checkbox"
                                checked={input5a}
                                onChange={() => {
                                    setInput5a(!input5a);
                                    // You can add logic here if needed
                                }}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5a"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Mój lot został odwołany
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5b"
                                type="checkbox"
                                checked={input5b}
                                onChange={() => {
                                    setInput5b(!input5b);
                                    // You can add logic here if needed
                                }}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5b"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Odmówiono mi wejścia na pokład
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container  mt-5">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input4c" className="block text-gray-700 text-sm font-bold mb-2">Bardzo nam przykro. Ile
                    wynosiło opóźnienie Twojego lotu do miasta Seoul (ICN)?</label>
                <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5b"
                                name="input5b" value={formData.input5b}
                                type="checkbox"
                                checked={input5c}
                                onChange={() => {
                                    setInput5c(!input5c);
                                    // You can add logic here if needed
                                }}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5c"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                0-1 godz
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5d"
                                type="checkbox"
                                checked={input5d}
                                onChange={() => {
                                    setInput5d(!input5d);
                                    // You can add logic here if needed
                                }}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5d"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                1-2 godz
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5e"
                                type="checkbox"
                                checked={input5e}
                                onChange={() => {
                                    setInput5e(!input5e);
                                    // You can add logic here if needed
                                }}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5e"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                2-3 godz
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5f"
                                type="checkbox"
                                checked={input5f}
                                onChange={() => {
                                    setInput5f(!input5f);
                                    // You can add logic here if needed
                                }}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5f"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                3-4 godz
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5g"
                                type="checkbox"
                                checked={input5g}
                                onChange={() => {
                                    setInput5g(!input5g);
                                    // You can add logic here if needed
                                }}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5g"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Ponad 4 godziny
                            </label>
                        </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="input5h"
                                type="checkbox"
                                checked={input5h}
                                onChange={() => {
                                    setInput5h(!input5h);
                                    // You can add logic here if needed
                                }}
                                className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                                htmlFor="input5h"
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Nie dotarłem (-am) na miejsce
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="container  mt-5">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input4i" className="block text-gray-700 text-sm font-bold mb-2">Czy dobrowolnie
                    zrzekłeś(-aś) się miejsca na pokładzie w zamian za inne korzyści oferowane przez linię
                    lotniczą?</label>
                <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center ps-3">
                            <input
                                id="yes-checkbox"
                                type="checkbox"

                                checked={yesChecked}
                                onChange={() => {
                                    setYesChecked(!yesChecked);
                                    if (noChecked) setNoChecked(false);
                                }}
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
                                checked={noChecked}
                                onChange={() => {
                                    setNoChecked(!noChecked);
                                    if (yesChecked) setYesChecked(false);
                                }}
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
    </div>
    );
};


const Step6 = ({formData, handleInputChange}) => {
    const [input6c, setInput6c] = useState(false);
    const [input6d, setInput6d] = useState(false);
    const [input6e, setInput6e] = useState(false);

    return (
        <div>
            <div className="container">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input6_label" className="block text-gray-700 text-sm font-bold mb-2">Aby ruszyć z
                        Twoją
                        sprawą, potrzebuję kilku informacji.</label>
                    <input type="text" id="input6" placeholder="Imię" name="input6" value={formData.input6}
                           onChange={handleInputChange}
                           className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <input type="text" id="input6a" placeholder="Nazwisko" name="input6a" value={formData.input6a}
                           onChange={handleInputChange}
                           className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                    <input type="text" id="input6b" placeholder="Adres Email" name="input6b" value={formData.input6b}
                           onChange={handleInputChange}
                           className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

                </div>
            </div>
            <div className="container mt-5">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input6a_label" className="block text-gray-700 text-sm font-bold mb-2">Aby ruszyć z
                        Twoją
                        sprawą, potrzebuję kilku informacji.</label>
                    <br/>
                    <ul>
                        <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="input6c"
                                    type="checkbox"
                                    checked={input6c}
                                    onChange={() => {
                                        setInput6c(!input6c);
                                        // You can add logic here if needed
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="input6c"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Zaznacz wszystkie zgody
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="input6d"
                                    type="checkbox"
                                    checked={input6d}
                                    onChange={() => {
                                        setInput6d(!input6d);
                                        // You can add logic here if needed
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="input6d"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Zgoda 1
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="input6e"
                                    type="checkbox"
                                    checked={input6e}
                                    onChange={() => {
                                        setInput6e(!input6e);
                                        // You can add logic here if needed
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="input6e"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Zgoda 2
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
        ;
};

const Step7 = ({formData, handleInputChange}) => {
    const [yesChecked, setYesChecked] = useState(false);
    const [noChecked, setNoChecked] = useState(false);

    return (
        <div>
            <div className="container">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input7" className="block text-gray-700 text-sm font-bold mb-2">Każdemu
                        współpasażerowi z
                        Twojej rezerwacji może przysługiwać odszkodowanie w wysokości do 600 €</label>
                </div>
            </div>
            <div className="container  mt-5">
                <div className="card p-5" style={{
                    backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
                }}>
                    <label htmlFor="input7a" className="block text-gray-700 text-sm font-bold mb-2">Możesz złożyć
                        wniosek w
                        imieniu wszystkich osób wymienionych w Twojej rezerwacji. Czy ktoś z Tobą podróżował?</label>
                    <ul className="w-100 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="yes-checkbox"
                                    type="checkbox"

                                    checked={yesChecked}
                                    onChange={() => {
                                        setYesChecked(!yesChecked);
                                        if (noChecked) setNoChecked(false);
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="yes-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Tak, ktoś ze mną podróżował
                                </label>
                            </div>
                        </li>
                        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                            <div className="flex items-center ps-3">
                                <input
                                    id="no-checkbox"
                                    type="checkbox"
                                    checked={noChecked}
                                    onChange={() => {
                                        setNoChecked(!noChecked);
                                        if (yesChecked) setYesChecked(false);
                                    }}
                                    className="w-4 h-4 text-blue-600 bg-blue-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                    htmlFor="no-checkbox"
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Nie, nikt ze mną nie podróżował
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
                <label htmlFor="input7c" className="block text-gray-700 text-sm font-bold mb-2">Pasażer 2</label>
                <input type="text" id="input7c" placeholder="Imię" name="input7c" value={formData.input7c}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input7d" placeholder="Nazwisko" name="input7d" value={formData.input7d}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input7e" placeholder="Adres Email" name="input7e" value={formData.input7e}
                       onChange={handleInputChange}
                       className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

            </div>
        </div>
    </div>

);
};

const Step8 = ({formData, handleInputChange}) => (
    <div>
        <div className="container">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input8" className="block text-gray-700 text-sm font-bold mb-2">Dodaj swój adres.</label>
                <input type="text" id="input8" placeholder="Adres" name="input8" value={formData.input8}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8a" placeholder="Numer Lokalu (opcjonalnie)" name="input8a" value={formData.input8a}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8b" placeholder="Miasto" name="input8b" value={formData.input8b}
                       onChange={handleInputChange}
                       className=" mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8c" placeholder="Kod pocztowy" name="input8c" value={formData.input8c}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8d" placeholder="Województwo" name="input8d" value={formData.input8d}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8e" placeholder="Kraj" name="input8e" value={formData.input8e}
                       onChange={handleInputChange}
                       className="mb-2 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                <input type="text" id="input8f" placeholder="Numer telefonu" name="input8f" value={formData.input8f}
                       onChange={handleInputChange}
                       className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

            </div>
        </div>
    </div>
);

const Step9 = ({formData, handleInputChange}) => (
    <div>
        <div className="container">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
        <label htmlFor="input9" className="block text-gray-700 text-sm font-bold mb-2">Podaj numer rezerwacji.</label>
        <input type="text" id="input9" placeholder="np DXG 786 albo FHU 674" name="input9" value={formData.input9} onChange={handleInputChange}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
            </div>
        </div>
        <div className="container mt-5">
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <label htmlFor="input9a" className="block text-gray-700 text-sm font-bold mb-2">Gdzie znajdę numer rezerwacji ?</label>
                <p>Numer rezerwacji to oznaczenie danej rezerwacji wygenerowane przez linię lotniczą. Znajdziesz go na swoim bilecie elektronicznym, potwierdzeniu rezerwacji lub innym dokumencie otrzymanym po zakończeniu rezerwacji lotu. Zazwyczaj składa się z 6 znaków, w tym liter i cyfr (np. DF87G#, REDYYD, L5W4NW). Pamiętaj, żeby nie używać spacji.</p>
                <p></p>
            </div>
        </div>
    </div>
);

const Step10 = ({ formData, handleInputChange }) => {
    const [signature, setSignature] = useState(null); // State to store the captured signature

    // Reference to the signature pad
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

        // Set the captured signature in state
        setSignature(signatureData);

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

    return (
        <div>
            <div className="container">
                <div className="card p-5" style={{ backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F" }}>
                    <label htmlFor="input10" className="block text-gray-700 text-sm font-bold mb-2">Dobre wieści! Wygląda na
                        to, że możliwe jest uzyskanie do 600 € na osobę na podstawie europejskiego rozporządzenia WE 261.
                        Aby uzyskać pieniądze, które Ci się należą, złóż podpis poniżej.</label>
                    {/* Signature Pad */}
                    <div>
                        <SignatureCanvas
                            ref={signatureRef}
                            canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}
                        />
                    </div>
                    {/* End Signature Pad */}
                    <div>
                        <button className="bg-white rounded-sm mr-2" onClick={clearSignature}>Clear</button>
                        <button className="bg-white rounded-sm mr-2" onClick={saveSignature}>Save</button>
                    </div>
                    {/* Display the saved signature */}
                    {signature && (
                        <img src={signature} alt="Saved Signature" />
                    )}
                    <input type="text" id="input10" name="input10" value={formData.input10} onChange={handleInputChange}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
            </div>
        </div>
    );
};

            // Define remaining steps similarly

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
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
        input6: '',
        input6a: '',
        input6b: '',
        input6c: false,
        input6d: false,
        input6e: false,
        input7: '',
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
        input9: '',
        input10: '',
        // Define other form fields here
    });

    const steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10]; // Add other steps here
    const totalSteps = steps.length;

    const [checkboxes, setCheckboxes] = useState({
        input3: false,
        input3a: false,
    });

    const handleInputChange = (e) => {
        if (e && e.target && e.target.name) {
            const { name, type, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleCheckboxChange = (checkboxName, label) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [checkboxName]: !prevFormData[checkboxName], // Toggle the checkbox value
            [`${checkboxName}Label`]: !prevFormData[checkboxName] ? label : '', // Set the label if the checkbox is checked
            // Update input3 and input3a based on checkboxName
            input3: checkboxName === 'input3' ? !prevFormData[checkboxName] ? label : '' : prevFormData.input3,
            input3a: checkboxName === 'input3a' ? !prevFormData[checkboxName] ? label : '' : prevFormData.input3a,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/multi-step-form/submit', formData);
            console.log('Form submitted successfully!', response.data);
            // Redirect or do something else upon success
        } catch (error) {
            console.error('Error submitting form:', error);
            // Handle errors if needed
        }
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };


    return (
        // <div className="py-12">
        <div>
            <div className="bg-neutral-100" style={{backgroundImage: "url('media/side-img.png')", backgroundPosition: "0% 300px", backgroundRepeat: "no-repeat", backgroundSize: "20%"}}>
                <div className="outer min-h-screen">
                    <div className="mt-5 ml-5" style={{width: "200px"}}>
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                        </Link>
                    </div>
                    <div className="progress">
                        <div className="left">
                            {Array.from({length: totalSteps}).map((_, index) => (
                                <div key={index}>{index === 0 ? 'Start' : ''}</div>
                            ))}
                        </div>
                        <div className="right">
                            {Array.from({length: totalSteps}).map((_, index) => (
                                <div key={index}
                                     className={step === index + 1 ? 'current' : step > index + 1 ? 'done' : ''}>{index + 1}</div>
                            ))}
                            <div>Done</div>
                        </div>
                    </div>
                </div>
                <div className="bg-white min-h-screen h-full rounded-b-xl"
                     style={{marginLeft: "30%", boxShadow: "2px 2px 20px 0px #0000001F"}}>
                    <div className="d-flex justify-content-end align-items-center mb-4 mr-5">
                        {/*<h5 className="p-5 m-0">Pomagamy w egzekwowaniu praw konsumenta</h5>*/}
                        <label htmlFor="input9" className="block text-gray-700 text-sm font-bold mb-2 m-5">Pomagamy w
                            egzekwowaniu praw konsumenta</label>
                        <FontAwesomeIcon icon={faWallet} size="2x"/>
                    </div>
                    <div className="d-flex align-items-center mb-4 ml-5">
                        <img className="w-20 mr-3" src="media/employee.png"/>
                        <div className="flex flex-col justify-center items-start mb-4">
                            {/*<h5 className="p-5 m-0">Pomagamy w egzekwowaniu praw konsumenta</h5>*/}
                            <h5 htmlFor="input9" className="mb-2 ml-3">‎ </h5>
                            <h5 htmlFor="input9" className="mb-2 ml-3">Albert Konrad</h5>
                            <label htmlFor="input9" className="block text-gray-900 text-sm font-bold mb-2 ml-3">Asystenci
                                BeSmart</label>
                        </div>
                    </div>
                    <div className="p-6 text-gray-900">
                        {step === 1 &&
                            <Step1 formData={formData} handleInputChange={handleInputChange} checkboxes={checkboxes}
                                   handleCheckboxChange={handleCheckboxChange}/>}
                        {step === 2 && <Step2 formData={formData} handleInputChange={handleInputChange}/>}
                        {step === 3 &&
                            <Step3 formData={formData} handleInputChange={handleInputChange} checkboxes={checkboxes}
                                   handleCheckboxChange={handleCheckboxChange}/>}
                        {step === 4 && <Step4 formData={formData} handleInputChange={handleInputChange}/>}
                        {step === 5 && <Step5 formData={formData} handleInputChange={handleInputChange}/>}
                        {step === 6 && <Step6 formData={formData} handleInputChange={handleInputChange}/>}
                        {step === 7 && <Step7 formData={formData} handleInputChange={handleInputChange}/>}
                        {step === 8 && <Step8 formData={formData} handleInputChange={handleInputChange}/>}
                        {step === 9 && <Step9 formData={formData} handleInputChange={handleInputChange}/>}
                        {step === 10 && <Step10 formData={formData} handleInputChange={handleInputChange}/>}
                        {/* Render remaining steps similarly */}
                        <div className="mt-4">
                            {step > 1 && <button onClick={prevStep}
                                                 className="mr-2 bg-transparent hover:bg-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                 style={{color: "#4F914A"}}>Previous</button>}
                            {step < 10 ? (
                                <button onClick={nextStep}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        style={{backgroundColor: "#4F914A"}}>Next</button>
                            ) : (
                                <button onClick={handleSubmit}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MultiStepForm;

