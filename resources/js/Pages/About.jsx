import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Footer from "@/Layouts/Footer.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";


const AboutUs = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold m-6 text-center">O Nas</h1>
            <div className="container mx-auto">
                <ul className="list-none space-y-4">
                    <li className="shadow rounded p-4 hover:bg-gray-100">
                        <header>
                            <h1>BeSmartAir</h1>
                            <p>Pomoc w dochodzeniu odszkodowań za opóźnione, odwołane lub przesiadkowe loty</p>
                        </header>

                        <section>
                            <h2>Kim jesteśmy?</h2>
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230805110219/a.png" className="w-full h-96 object-cover mb-4 rounded"/>
                            <p>BeSmartAir to wiodąca firma specjalizująca się w pomocy pasażerom w dochodzeniu odszkodowań za opóźnione, odwołane lub przesiadkowe loty. Nasza misja to zapewnienie, że każdy pasażer ma prawo do rekompensaty, której jest wart, niezależnie od sytuacji.</p>

                            <h3>Nasza Ekspertyza</h3>
                            <p>Zespół naszych ekspertów z branży lotniczej ma wieloletnie doświadczenie w interpretacji
                                przepisów prawa europejskiego, w tym Rozporządzenia WE 261/2004, które chroni prawa pasażerów. Dzięki temu jesteśmy w stanie skutecznie reprezentować naszych klientów w negocjacjach z liniami lotniczymi.</p>

                            <h3>Nasza Usługa</h3>
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230805110219/a.png"
                                 className="w-full h-96 object-cover mb-4 rounded"/>
                            <p>W BeSmartAir oferujemy kompleksową obsługę – od analizy przypadków, przez zbieranie
                                niezbędnych dokumentów, aż po reprezentowanie klientów w postępowaniach przed liniami lotniczymi. Nasz proces jest prosty i przejrzysty: klienci mogą zgłosić swoje roszczenie online, a my zajmiemy się resztą.</p>

                            <h3>Dlaczego warto z nami współpracować?</h3>
                            <p>Dzięki współpracy z nami, pasażerowie mogą skupić się na swoich podróżach, mając pewność,
                                że ich prawa są w dobrych rękach. Nasza firma działa na zasadzie "no win, no fee", co oznacza, że płacisz tylko w przypadku sukcesu.</p>

                            <h3>Dołącz do nas!</h3>
                            <img src="https://media.geeksforgeeks.org/wp-content/uploads/20230805110219/a.png"
                                 className="w-full h-96 object-cover mb-4 rounded"/>

                            <p>Dołącz do grona zadowolonych klientów BeSmartAir i odzyskaj swoje pieniądze za
                                nieprzyjemne doświadczenia lotnicze!</p>
                        </section>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default function About({auth}) {

    return (
        <>
            {auth.user ? (
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Blog"/>
                    <AboutUs/>
                    <Footer/>
                </AuthenticatedLayout>
            ) : (
                <Standard user={auth.user}>
                    <Head title="Blog"/>
                    <AboutUs />
                    <Footer />
                </Standard>
            )}
        </>
    );
}
