import {Head, Link} from '@inertiajs/react';
import Guest from "@/Layouts/GuestLayout.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useState} from "react";
import "/resources/css/styles.css"
import TestimonialsSlider from "@/Partials/TestimonialsSlider.jsx";
import Footer from "@/Layouts/Footer.jsx";
import "/resources/css/build-issue.css"
import airportsData from "@/Pages/airports.js";
import { Inertia } from '@inertiajs/inertia';
import CookieConsent from "@/Components/CookieConsent.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faCircleXmark, faPlaneArrival, faPlaneDeparture} from "@fortawesome/free-solid-svg-icons";
import NumberAnimate from "@/Components/NumberAnimate/NumberAnimate.jsx";
import {useTranslation} from "react-i18next";
import HeroHeader from "@/Components/TextResponsiveness/HeroHeader.jsx";

// Common content component
const HomeContent = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');

    const [arrivalCode, setArrivalCode] = useState('');
    const [airportCode, setAirportCode] = useState('');
    const [departureSuggestions, setDepartureSuggestions] = useState([]);
    const [arrivalSuggestions, setArrivalSuggestions] = useState([]);
    const [errors, setErrors] = useState({ departureIata: '', arrivalIata: '' });

    const handleAirportCodeChange = (e) => {
        const { name, value } = e.target;
        setErrors({ ...errors, [name]: '' });

        if (name === 'departureIata') {
            setAirportCode(value);
            handleInputChange(e);

            const filteredAirports = airportsData.filter((airport) =>
                airport.name.toLowerCase().includes(value.toLowerCase()) ||
                airport.city.toLowerCase().includes(value.toLowerCase()) ||
                airport.iata_code.toLowerCase().includes(value.toLowerCase())
            );
            setDepartureSuggestions(filteredAirports.slice(0, 5));
        } else if (name === 'arrivalIata') {
            setArrivalCode(value);
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
            setAirportCode(suggestion.iata_code);
            setDepartureSuggestions([]);
            const event = { target: { name: 'departureIata', value: suggestion.iata_code } };
            handleInputChange(event);
        } else if (type === 'arrival') {
            setArrivalCode(suggestion.iata_code);
            setArrivalSuggestions([]);
            const event = { target: { name: 'arrivalIata', value: suggestion.iata_code } };
            handleInputChange(event);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;
        let newErrors = { departureIata: '', arrivalIata: '' };

        if (airportCode.trim() === '') {
            newErrors.departureIata = 'Pole nie może być puste';
            valid = false;
        }

        if (arrivalCode.trim() === '') {
            newErrors.arrivalIata = 'Pole nie może być puste';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            const url = route('multistep.index', {
                input1: airportCode,
                input1a: arrivalCode,
            });
            console.log('Navigating to:', url); // Debug URL
            Inertia.visit(url);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // setData(name, value);

    };

    const { t } = useTranslation();

    return (
        <div>
            <div style={{background: "#F4FFF199"}}>
            <div className="container hero-section">

                {/*<div className="home-hero sm:px-6 lg:px-8 container-custom  relative">*/}
                    <div className="home-hero" style={{
                        // backgroundImage: 'url("media/hero-improved.png")',
                        // backgroundRepeat: 'no-repeat',
                        // backgroundPosition: 'bottom right',
                        // backgroundSize: '40%',
                    }}>
                    {/*<div className="row">*/}
                    {/*    <div className="container">*/}
                    {/*        <div className="flex flex-col  items-start h-screen2">*/}


                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*<div className="p-6 heading-custom">*/}
                    <HeroHeader/>
                    {/*</div>*/}
                    <div className="p-6 info-text-custom">
                        {t('heroSection.infoText')}
                    </div>

                    <div className="image-container absolute top-0 right-0 w-1/2 h-full z-10">
                        {/* Content */}
                    </div>

                        <form onSubmit={handleSubmit}
                              className="p-6 text-gray-900 flex flex-col md:flex-row items-center md:items-start relative z-20">
                            <div className="relative mobile-inputs md:mb-0 md:mr-4 w-full md:w-80">
                                <div className="flex md:flex-row items-center">
                                    {/* Icon inside input */}
                                    <FontAwesomeIcon
                                        icon={faPlaneDeparture}
                                        className="absolute left-3 text-gray-500"
                                    />

                                    <input
                                        type="text"
                                        id="input1"
                                        placeholder={t('heroSection.form.departurePlaceholder')}
                                        name="departureIata"
                                        value={airportCode}
                                        onChange={handleAirportCodeChange}
                                        className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />

                                    {errors.departureIata && (
                                        <p className="text-red-500 text-xs italic">{errors.departureIata}</p>
                                    )}

                                    {departureSuggestions.length > 0 && (
                                        <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto z-10">
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
                                </div>
                            </div>

                            <div className="relative mobile-inputs md:mb-0 md:mr-4 w-full md:w-80">
                                <div className="flex md:flex-row items-center">
                                    <FontAwesomeIcon icon={faPlaneArrival} className="absolute left-3 text-gray-500" />
                                    <input
                                        type="text"
                                        id="input1a"
                                        placeholder={t('heroSection.form.arrivalPlaceholder')}
                                        name="arrivalIata"
                                        value={arrivalCode}
                                        onChange={handleAirportCodeChange}
                                        className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    {errors.arrivalIata && (
                                        <p className="text-red-500 text-xs italic">{errors.arrivalIata}</p>
                                    )}
                                    {arrivalSuggestions.length > 0 && (
                                        <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto z-10">
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
                            </div>

                            <div className="w-full md:w-80 mb-5">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-100"
                                    style={{backgroundColor: "#4F914A"}}>
                            <span className="text-white text-center block">
                                {t('heroSection.form.checkCompensationButton')}
                            </span>
                                </button>
                            </div>
                        </form>
                    </div>
            </div>
            </div>
            <div className="flex justify-center p-4">
                <div className="container lapping">
                    <div className="overlapping">
                        <div className="card overlap_shadow p-4">
                            <div className="we_do mb-4">{t('regulations.title')}</div>
                            <ul className="flex flex-col md:flex-row justify-between uppercase space-y-4 md:space-y-0 text-sm	">
                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/euro.png"/>
                                    <strong className="ml-2">{t('regulations.items.europeRegulation')}</strong>
                                </li>


                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/brazil.png"/>
                                    <strong className="ml-2">{t('regulations.items.brazilRegulation')}</strong>
                                </li>
                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/convention.png"/>
                                    <strong className="ml-2">{t('regulations.items.montrealConvention')}</strong>
                                </li>
                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/turkey_flag.avif"/>
                                    <strong className="ml-2">{t('regulations.items.turkeyRegulation')}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lapping-space text-center m-5">
                <h2>‎ </h2>
            </div>
            <div className="lapping-space text-center m-5">
                <h2>‎ </h2>
            </div>
            <div className="lapping-space text-center m-5">
                <h2>‎ </h2>
            </div>

            <div className="header text-center m-5">
                <h2>{t('benefits.header')}</h2>
            </div>
            <div className="container flex flex-col md:flex-row">
                <div className="card bg-transparent pt-5 p-4">
                    <h5 className="font-weight-bold">{t('benefits.withUs.title')}</h5>
                        <ul className="mt-3 text-success">
                            <li className="d-flex align-items-start mb-3">
                                <FontAwesomeIcon icon={faCircleCheck} className="text-success me-3 mt-1"/>
                                <div>
                                    <strong>{t('benefits.withUs.points.1title')}</strong>
                                    <p>{t('benefits.withUs.points.1description')}</p>
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                                <FontAwesomeIcon icon={faCircleCheck} className="text-success me-3 mt-1"/>
                                <div>
                                    <strong>{t('benefits.withUs.points.2title')}</strong>
                                    <p>{t('benefits.withUs.points.2description')}</p>
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                                <FontAwesomeIcon icon={faCircleCheck} className="text-success me-3 mt-1"/>
                                <div>
                                    <strong>{t('benefits.withUs.points.3title')}</strong>
                                    <p>{t('benefits.withUs.points.3description')}</p>
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-success me-3 mt-1"/>
                                <div>
                                    <strong>{t('benefits.withUs.points.4title')}</strong>
                                    <p>{t('benefits.withUs.points.4description')}</p>
                                </div>
                            </li>
                            <li className="d-flex align-items-start">
                                <FontAwesomeIcon icon={faCircleCheck} className="text-success me-3 mt-1"/>
                                <div>
                                    <strong>{t('benefits.withUs.points.5title')}</strong>
                                    <p>{t('benefits.withUs.points.5description')}</p>
                                </div>
                            </li>
                        </ul>
                </div>
                <div className="card overlap_shadow pt-5 p-4">
                    <h5 className="font-weight-bold">{t('benefits.byYourself.title')}</h5>
                    <ul className="mt-3">
                        <li className="d-flex align-items-start mb-3">
                            <FontAwesomeIcon icon={faCircleXmark} className="text-danger me-3 mt-1"/>
                            <div>
                                <strong>{t('benefits.byYourself.points.1title')}</strong>
                                <p>{t('benefits.byYourself.points.1description')}</p>
                            </div>
                        </li>
                        <li className="d-flex align-items-start mb-3">
                            <FontAwesomeIcon icon={faCircleXmark} className="text-danger me-3 mt-1"/>
                            <div>
                                <strong>{t('benefits.byYourself.points.2title')}</strong>
                                <p>{t('benefits.byYourself.points.2description')}</p>
                            </div>
                        </li>
                        <li className="d-flex align-items-start mb-3">
                            <FontAwesomeIcon icon={faCircleXmark} className="text-danger me-3 mt-1"/>
                            <div>
                                <strong>{t('benefits.byYourself.points.3title')}</strong>
                                <p>{t('benefits.byYourself.points.3description')}</p>
                            </div>
                        </li>
                        <li className="d-flex align-items-start mb-3">
                            <FontAwesomeIcon icon={faCircleXmark} className="text-danger me-3 mt-1"/>
                            <div>
                                <strong>{t('benefits.byYourself.points.4title')}</strong>
                                <p>{t('benefits.byYourself.points.4description')}</p>
                            </div>
                        </li>
                        <li className="d-flex align-items-start">
                            <FontAwesomeIcon icon={faCircleXmark} className="text-danger me-3 mt-1"/>
                            <div>
                                <strong>{t('benefits.byYourself.points.5title')}</strong>
                                <p>{t('benefits.byYourself.points.5description')}</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container">
                <div className="header text-center pt-5 m-5">
                    <div className="why">{t('whyUs.header')}</div>
                    <div className="we_do">{t('whyUs.subheader')}</div>
                    <div className="our_com">{t('whyUs.description')}
                    </div>
                </div>
            </div>
            <div className="container m-5 ml-auto mr-auto card-container">

                <div className="card-landing card-hover hoverix image-container"><div className="image-wrapper_2">
                            <img src="media/canceled_plane.png" alt="plane clock" className="plane-image"/>
                        </div>
                        <h5 className="font-weight-bold">{t('services.1title')}</h5>
                        <ul className="list-hidden">
                            <li>{t('services.1description')}</li>
                        </ul></div>
                <div className="card-landing card-hover hoverix image-container"><div className="image-wrapper">
                            <img src="media/plane_clock.png" alt="plane clock" className="plane-image"/>
                        </div>
                        <h5 className="font-weight-bold">{t('services.2title')}</h5>
                        <ul className="list-hidden">
                            <li>{t('services.2description')}
                            </li>
                        </ul></div>
                <div className="card-landing card-hover hoverix image-container"><div className="image-wrapper_4">
                    <img src="media/plane_swap.png" alt="plane clock" className="plane-image"/>
                </div>
                    <h5 className="font-weight-bold">{t('services.3title')}</h5>
                    <ul className="list-hidden">
                        <li>{t('services.3description')}
                        </li>
                    </ul>
                </div>
                <div className="card-landing card-hover hoverix image-container">
                    <div className="image-wrapper_3">
                            <img src="media/1.png" alt="plane clock" className="plane-image"/>
                </div>
                    <h5 className="font-weight-bold">{t('services.4title')}</h5>
                    <ul className="list-hidden">
                        <li>{t('services.4description')}</li>
                    </ul>
                </div>
            </div>
            <div className="row bg-white">
                <div className="container mt-5  flex flex-col md:flex-row">
                    <div className="card mt-5">
                        <div className="container">
                            <h2 className="darkGreenText">{t('gain.compensation.title')}</h2>
                            <div className="greenText">{t('gain.compensation.description')}</div>
                        </div>
                    </div>
                    <div className="card mt-5 mb-5">
                        <img src={"media/walett.png"}/>
                    </div>
                </div>
                <div className="container custom-hr mt-5 mb-5"/>
                <div className="container  flex flex-col md:flex-row mt-5 mb-5">
                    <div className="card">
                        <div className="container mt-5 mb-5">
                            <h4 className="darkGreenText">{t('gain.clients.awareness')}</h4>
                            <div className="p-2">
                                <div
                                    className="container mb-5 mt-3 w-80 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    style={{backgroundColor: "#4F914A"}}
                                >
                                    <Link href={route('multistep.index')} className="text-white">
                                        {t('gain.compensation.check')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vert-hr m-5"/>
                    <div className="card">
                        <div className="container mt-5 mb-5">
                            <div className="column">
                                <NumberAnimate targetNumber={195000} duration={3}/>
                                <div className="greenText font-weight-bold">{t('gain.statistics.cancelledFlights')}</div>
                                <br/>
                                <br/>
                                <NumberAnimate targetNumber={2000} duration={3}/>
                                <div
                                    className="greenText font-weight-bold">{t('gain.statistics.internationalAirports')}</div>
                            </div>
                            <div className="column">
                                <NumberAnimate targetNumber={30000} duration={3}/>
                                <div className="greenText font-weight-bold">{t('gain.statistics.delayedFlights')}</div>
                                <br/>
                                <br/>
                                <div className="font-weight-bold">{t('gain.statistics.passengerClaims')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header text-center m-5">
                <h2>{t('gain.clientFeedback.title')}</h2>
            </div>
            <TestimonialsSlider/>
        </div>
    );
};

export default function Home({auth}) {
    return (
        <>
            {auth.user ? (
                <AuthenticatedLayout user={auth.user}>
                    {/*<AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}>*/}
                    <Head title="Home"/>
                    <HomeContent/>
                    <CookieConsent/>
                    <Footer/>
                </AuthenticatedLayout>
            ) : (
                <Standard user={auth.user}>
                    {/*<Standard header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}>*/}
                    <Head title="Home"/>
                    <HomeContent/>
                    <CookieConsent />
                    <Footer/>
                </Standard>
            )}
        </>
    );
}
