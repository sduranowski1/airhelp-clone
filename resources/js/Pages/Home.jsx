import {Head, Link} from '@inertiajs/react';
import Guest from "@/Layouts/GuestLayout.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useState} from "react";
import "/resources/css/styles.css"
import TestimonialsSlider from "@/Partials/TestimonialsSlider.jsx";
import Footer from "@/Layouts/Footer.jsx";

// Common content component
// Common content component
const HomeContent = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');

    const handleInputChange1 = (e) => {
        setInput1(e.target.value);
    };

    const handleInputChange2 = (e) => {
        setInput2(e.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission here
        console.log('Input 1:', input1);
        console.log('Input 2:', input2);
    };



    return (
        <div>
            <div className="sm:px-6 lg:px-8 container-custom relative" style={{
                backgroundImage: 'url("media/home_hero.png")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom right',
                backgroundSize: '50%',
            }}>
                <div className="row">
                    <div className="flex flex-col justify-center items-start h-screen2">
                        <div className="heading-custom">
                            Masz odwołany bądź opóźniony lot ?
                        </div>
                        <div className="info-text-custom">
                            Bez względu na cenę biletu nawet do 600eur odszkodowania przysługuje za każdego pasażera!
                        </div>
                    </div>
                </div>

                <div className="image-container absolute top-0 right-0 w-1/2 h-full z-10">
                    {/* Content */}
                </div>

                <div className="p-6 text-gray-900 flex flex-col md:flex-row items-center md:items-start relative z-20">
                    <div className="mb-5 md:mb-0 md:mr-4 w-full md:w-80">
                        <input
                            type="text"
                            id="input1"
                            placeholder="Zweryfikuj status wniosku"
                            value={input1}
                            onChange={handleInputChange1}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-5 md:mb-0 md:mr-4 w-full md:w-80">
                        <input
                            type="text"
                            id="input2"
                            placeholder="Zweryfikuj status wniosku"
                            value={input2}
                            onChange={handleInputChange2}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="w-full md:w-80 mb-5">
                        <div
                            className="bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            style={{backgroundColor: "#4F914A"}}>
                            <Link href={route('multistep.index')} className="text-white text-center block">
                                Sprawdź odszkodowanie
                            </Link>
                        </div>
                    </div>
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
                                    <strong className="ml-2">Europejskie</strong>
                                </li>
                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/convention.png"/>
                                    <strong className="ml-2">Konwencja montrealska</strong>
                                </li>
                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/tunisia.png"/>
                                    <strong className="ml-2">Przepisy Tureckie</strong>
                                </li>
                                <li className="flex items-center">
                                    <img className="w-10" src="media/flags/brazil.png"/>
                                    <strong className="ml-2">Przepisy Brazylijskie</strong>
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
                    <h5>DOCHODZENIE ODSZKODOWANIA LOTNICZEGO NA WŁASNĄ RĘKĘ</h5>
                    <ul className="mt-3">
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                    </ul>
                </div>
                <div className="card overlap_shadow pt-5 p-4">
                    <h5>DOCHODZENIE ODSZKODOWANIA LOTNICZEGO NA WŁASNĄ RĘKĘ</h5>
                    <ul className="mt-3">
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
                        </li>
                        <li><strong>Biurokracja:</strong> <p>Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.</p>
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
                    <div className="image-wrapper">
                        <img src="media/plane_clock.png" alt="plane clock" className="plane-image"/>
                    </div>
                    <h5 className="font-weight-bold">DOCHODZENIE ODSZKODOWANIA LOTNICZEGO NA WŁASNĄ RĘKĘ</h5>
                    <ul className="list-hidden">
                        <li><strong>Biurokracja:</strong> Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.
                        </li>
                    </ul>
                </div>
                <div className="card p-4 hoverix image-container  m-2">
                    <div className="image-wrapper_2">
                        <img src="media/canceled_plane.png" alt="plane clock" className="plane-image"/>
                    </div>
                    <h5 className="font-weight-bold">DOCHODZENIE ODSZKODOWANIA LOTNICZEGO NA WŁASNĄ RĘKĘ</h5>
                    <ul className="list-hidden">
                        <li><strong>Biurokracja:</strong> Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.
                        </li>
                    </ul>
                </div>
                <div className="card p-4 hoverix image-container  m-2">
                    <div className="image-wrapper_3">
                        <img src="media/plane_swap.png" alt="plane clock" className="plane-image"/>
                    </div>
                    <h5 className="font-weight-bold">DOCHODZENIE ODSZKODOWANIA LOTNICZEGO NA WŁASNĄ RĘKĘ</h5>
                    <ul className="list-hidden">
                        <li><strong>Biurokracja:</strong> Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.
                        </li>
                    </ul>
                </div>
                <div className="card p-4 hoverix image-container m-2 mb-5">
                    <div className="image-wrapper_3">
                        <img src="media/plane_swap.png" alt="plane clock" className="plane-image"/>
                    </div>
                    <h5 className="font-weight-bold">DOCHODZENIE ODSZKODOWANIA LOTNICZEGO NA WŁASNĄ RĘKĘ</h5>
                    <ul className="list-hidden">
                        <li><strong>Biurokracja:</strong> Nieoczywiste informacje odnośnie dokumentacji niezbędnej do
                            złożenia wniosku.
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row bg-white">
                <div className="container mt-5  flex flex-col md:flex-row">
                    <div className="card mt-5">
                        <h2 className="darkGreenText">Pobierzemy nasze wynagrodzenie jedynie, gdy otrzymasz należne
                            odszkodowanie</h2>
                        <div className="greenText">Nasze wynagrodzenie liczymy od kwoty odszkodowania, które dla Ciebie
                            uzyskamy , tym samym nie ponosisz ryzyka. Nasz opłata wynosi 20%
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
                                <h3 className="greenText font-weight-bold">30 000</h3>
                                <div className="greenText font-weight-bold">Międzynarodowych lotnisk</div>
                            </div>
                            <div className="column">
                                <h3 className="greenText font-weight-bold">2 000</h3>
                                <div className="greenText font-weight-bold">Międzynarodowych lotnisk</div>
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
                <h2>What Our Clients Say</h2>
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
                    <Footer/>
                </AuthenticatedLayout>
            ) : (
                <Standard user={auth.user}>
                    {/*<Standard header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}>*/}
                    <Head title="Home"/>
                    <HomeContent/>
                    <Footer/>
                </Standard>
            )}
        </>
    );
}

