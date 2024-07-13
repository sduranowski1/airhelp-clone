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
// import route from 'ziggy-js';


// Common content component
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

        // if (valid) {
        //     Inertia.visit(route('multistep.iatas', {
        //         input1: airportCode,
        //         input1a: arrivalCode,
        //     }));
        // }

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



    return (
        <div>
            <div>
                <div className="home-hero sm:px-6 lg:px-8 container-custom relative">
                    {/*<div className="home-hero sm:px-6 lg:px-8 container-custom relative" style={{*/}
                    {/*    backgroundImage: 'url("media/home_hero.png")',*/}
                    {/*    backgroundRepeat: 'no-repeat',*/}
                    {/*    backgroundPosition: 'bottom right',*/}
                    {/*    backgroundSize: '50%',*/}
                    {/*}}>*/}
                    {/*<div className="row">*/}
                    {/*    <div className="container">*/}
                    {/*        <div className="flex flex-col  items-start h-screen2">*/}


                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="heading-custom">
                        Masz odwołany bądź opóźniony lot ?
                    </div>
                    <div className="info-text-custom">
                        Bez względu na cenę biletu nawet do 600eur odszkodowania przysługuje za każdego
                        pasażera!
                    </div>

                    <div className="image-container absolute top-0 right-0 w-1/2 h-full z-10">
                        {/* Content */}
                    </div>

                    <form onSubmit={handleSubmit}
                          className="p-6 text-gray-900 flex flex-col md:flex-row items-center md:items-start relative z-20">
                        <div className="relative mobile-inputs md:mb-0 md:mr-4 w-full md:w-80">
                            <input
                                type="text"
                                id="input1"
                                placeholder="Lotnisko wylotu"
                                name="departureIata"
                                value={airportCode}
                                onChange={handleAirportCodeChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        <div className="relative mobile-inputs md:mb-0 md:mr-4 w-full md:w-80">
                            <input
                                type="text"
                                id="input1a"
                                placeholder="Lotnisko przylotu"
                                name="arrivalIata"
                                value={arrivalCode}
                                onChange={handleAirportCodeChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

                        <div className="w-full md:w-80 mb-5">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                style={{backgroundColor: "#4F914A"}}>
                            <span className="text-white text-center block">
                                Sprawdź odszkodowanie
                            </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex justify-center p-4">
                <div className="container lapping">
                <div className="overlapping">
                        <div className="card overlap_shadow p-4">
                            <div className="we_do mb-4">BeSmartAir DBA O PRAWA PASAŻERÓW LOTNICZYCH</div>
                            <ul className="flex flex-col md:flex-row justify-between uppercase space-y-4 md:space-y-0">
                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/euro.png"/>
                                    <strong className="ml-2">Europejskie Rozporządzenie we261</strong>
                                </li>


                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/brazil.png"/>
                                    <strong className="ml-2">Przepisy Brazylijskie</strong>
                                </li>
                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/convention.png"/>
                                    <strong className="ml-2">Konwencja montrealska</strong>
                                </li>
                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/tunisia.png"/>
                                    <strong className="ml-2">Przepisy Tureckie</strong>
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
                <h2>DLACZEGO WYBRAĆ POMOC BeSmartAir?</h2>
            </div>
            <div className="container flex flex-col md:flex-row">
                <div className="card bg-transparent pt-5 p-4">
                    <h5>WNIOSEK PRZY POMOCY BeSmartAir </h5>
                    <ul className="mt-3">
                        <li><strong>Łatwa procedura:</strong> <p>Zajmujemy się Twoją sprawą od złożenia wniosku, aż do wypłaty odszkodowania. </p>
                        </li>
                        <li><strong>Pełna obsługa:</strong> <p> W Twoim imieniu składamy wszelkie niezbędne dokumenty.</p>
                        </li>
                        <li><strong>Sprawne działanie:</strong> <p> Po przesłaniu nam dokumentów online zajmujemy się całą resztą.</p>
                        </li>
                        <li><strong>Stałe monitorowanie statusu:</strong> <p>Cały czas jesteśmy w kontakcie i do Twojej dyspozycji informując o postępie sprawy. </p>
                        </li>
                        <li><strong>Brak kosztów za złożenie wniosku:</strong> <p>Brak kosztów za złożenie wniosku Wszelkie koszty obsługi prawnej są po naszej stronie, pobieramy opłatę tylko, gdy odszkodowanie zostanie wypłacone.  </p>
                        </li>

                    </ul>
                </div>
                <div className="card overlap_shadow pt-5 p-4">
                    <h5>DOCHODZENIE ODSZKODOWANIA LOTNICZEGO NA WŁASNĄ RĘKĘ</h5>
                    <ul className="mt-3">
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do złożenia wniosku.</p>
                        </li>
                        <li><strong>Czas:</strong> <p>Dochodzenie swoich praw wymaga dużej cierpliwości podczas kontaktu z biurami obsługi klienta linii lotniczych oraz cały proces może trwać miesiącami. </p>
                        </li>
                        <li><strong>Stres:</strong> <p>Samodzielne przeprowadzenie całego procesu łącznie z negocjacjami z liniami lotniczymi.</p>
                        </li>
                        <li><strong>Ryzyko:</strong> <p>W sytuacji skierowania Twojego wniosku na drogę sądową musisz liczyć się kosztami bez względu na ostateczny wynik sprawy.</p>
                        </li>
                        <li><strong>Utrudniony kontakt z liniami lotniczymi:</strong> <p>Nie zawsze a wręcz bardzo rzadko linie lotnicze informują klientów o przebiegu spray i jej statusie. </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="header text-center pt-5 m-5">
                <div className="why">DLACZEGO BEMSARTAIR?</div>
                <div className="we_do">Zajmujemy się profesjonalnym rozwiązywaniem problemów związanych z lotami
                    samolotowymi
                </div>
                <div className="our_com">Nasza firma specjalizuje się w uzyskiwaniu odszkodowań dla naszych klientów z
                    całego świata. Nie boimy się nawet trudnych i skomplikowanych przypadków. Zadowolenie klientów z
                    realizacji naszych usług jest dla nas priorytetem.
                </div>
            </div>
            <div className="container mb-5 flex flex-col md:flex-row">
                <div className="card p-4 hoverix image-container m-2">
                    <div className="image-wrapper_2">
                        <img src="media/canceled_plane.png" alt="plane clock" className="plane-image"/>
                    </div>
                    <h5 className="font-weight-bold">Odwołany lot</h5>
                    <ul className="list-hidden">
                        <li>Twój lot został odwołany z krótkim wyprzedzeniem? Poza zwrotem pieniedzy przysługuje Tobie
                            odszkodowanie w wysokosci do 600 eur.

                        </li>
                    </ul>
                </div>
                <div className="card p-4 hoverix image-container  m-2">
                    <div className="image-wrapper">
                        <img src="media/plane_clock.png" alt="plane clock" className="plane-image"/>
                    </div>
                    <h5 className="font-weight-bold">Opóźniony lot</h5>
                    <ul className="list-hidden">
                        <li> W
                            sytuacji opóźnienia powyżej 3
                            godzin, dowiedz sie czy nasi
                            specjaliści uzyskają dla Ciebie
                            odszkodowanie do 600 eur.
                        </li>
                    </ul>
                </div>
                <div className="card p-4 hoverix image-container  m-2">
                    <div className="image-wrapper_3">
                        <img src="media/1.png" alt="plane clock" className="plane-image"/>
                    </div>
                    <h5 className="font-weight-bold">Spóźnienie na lot przesiadkowy</h5>
                    <ul className="list-hidden">
                        <li>W
                            przypadku wylądowania z
                            3-godzinnym opóznieniem w
                            miejscu docelowym równiez
                            moze przysługiwać Tobie
                            odszkodowanie.
                        </li>
                    </ul>
                </div>
                <div className="card p-4 hoverix image-container m-2">
                    <div className="image-wrapper_4">
                        <img src="media/plane_swap.png" alt="plane clock" className="plane-image"/>
                    </div>
                    <h5 className="font-weight-bold">Ciężka komunikacja z linią</h5>
                    <ul className="list-hidden">
                        <li>Twój
                            wniosek o odszkodowanie został
                            odrzucony badź zignorowany?
                            Sprawdzimy zasadność wniosku
                            oraz wywrzemy nacisk na linie
                            lotniczą, aby poczuła sie do
                            odpowiedzialności.

                        </li>
                    </ul>
                </div>
            </div>
            <div className="row bg-white">
                <div className="container mt-5  flex flex-col md:flex-row">
                    <div className="card mt-5">
                        <h2 className="darkGreenText">Rozliczamy nasze
                            wynagrodzenie jedynie, gdy
                            otrzymasz należne
                            odszkodowanie</h2>
                        <div className="greenText">Nasze wynagrodzenie liczymy od kwoty odszkodowania, które dla Ciebie
                            uzyskamy, tym samym nie ponosisz ryzyka. Nasz opłata wynosi 20%
                        </div>

                    </div>
                    <div className="card mt-5 mb-5">
                        <img
                            src={"media/wallet.png"}/>
                    </div>
                </div>
                <div className="container custom-hr mt-5 mb-5"/>
                <div className="container  flex flex-col md:flex-row mt-5 mb-5">
                    <div className="card">
                        <h2 className="darkGreenText">Pasażerowie nie są świadomi jak dużym problemem są opóźnione i
                            odwołane loty w globalnej skali. BeSmartAir zadba o Twoje prawa dążąc do uzyskania
                            odszkodowania lotniczego na Twoja prośbę.</h2>
                        <div
                            className="mb-5 mt-3 w-80 bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            style={{backgroundColor: "#4F914A"}}
                        >
                            <Link href={route('multistep.index')} className="text-white">
                                Sprawdź odszkodowanie
                            </Link>
                        </div>
                    </div>
                    <div className="vert-hr m-5"/>
                    <div className="card">
                        <div className="container mt-5 mb-5">
                            <div className="column">
                                <h3 className="greenText font-weight-bold">195 000</h3>
                                <div className="greenText font-weight-bold">Odwołanych lotów lotniczych</div>
                                <br/>
                                <br/>
                                <h3 className="greenText font-weight-bold">2 000</h3>
                                <div className="greenText font-weight-bold">Międzynarodowych lotnisk</div>
                            </div>
                            <div className="column">
                                <h3 className="greenText font-weight-bold">30 000</h3>
                                <div className="greenText font-weight-bold">Opóźnionych lotów dziennie</div>
                                <br/>
                                <br/>
                                <div className="font-weight-bold">Jedynie co 2 uprawiony pasażer stara się o uzyskanie
                                    odszkodowania lotniczego
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="header text-center m-5">
                <h2>Co mówią o nas klienci</h2>
            </div>
            <TestimonialsSlider/>

        </div>


        // </div>
        // </div>

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
                    <CookieConsent />
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

