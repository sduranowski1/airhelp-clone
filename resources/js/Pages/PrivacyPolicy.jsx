import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Footer from "@/Layouts/Footer.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";

const Privacy = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold m-6 text-center">Poznaj swoje prawa</h1>
            <div className="container mx-auto">
                <ul className="list-none space-y-4">
                    <li className="shadow rounded p-4 hover:bg-gray-100">
                        <h2>Prawa pasażera zgodnie z Rozporządzeniem UE 261/2004: Odszkodowania za opóźnienia i odwołane loty</h2>
                        <p>Rozporządzenie (WE) nr 261/2004 Parlamentu Europejskiego i Rady, znane również jako rozporządzenie UE 261, reguluje prawa pasażerów lotniczych w przypadku opóźnień, odwołań lub odmowy przyjęcia na pokład. Celem tego aktu prawnego jest zapewnienie ochrony podróżnym i zagwarantowanie im odpowiednich rekompensat w sytuacjach, które mogą zakłócić ich plan podróży.</p>

                        <p>Poniżej omówimy, w jaki sposób rozporządzenie to określa zasady wypłaty odszkodowań, zwłaszcza w zależności od dystansu lotu.</p>

                        <h2 className="pt-2">Kluczowe zasady rozporządzenia UE 261/2004</h2>
                        <p>Rozporządzenie UE 261 zapewnia pasażerom prawa do odszkodowania w przypadku:</p>
                        <ul>
                            <li>Odwołania lotu – jeśli lot zostanie odwołany przez przewoźnika.</li>
                            <li>Opóźnienia lotu – jeśli lot jest opóźniony o więcej niż 3 godziny przy przylocie do miejsca docelowego.</li>
                            <li>Odmowy przyjęcia na pokład – w przypadku, gdy pasażer nie może zostać przyjęty na pokład z powodu braku miejsc.</li>
                        </ul>

                        <p>Wszystkie te sytuacje mogą skutkować koniecznością wypłaty odszkodowania pasażerowi. Jednakże wysokość rekompensaty zależy od kilku czynników, takich jak długość opóźnienia, odległość lotu, a także konkretne okoliczności związane z daną sytuacją.</p>

                        <h2 className="pt-2">Stawki odszkodowań w zależności od dystansu</h2>
                        <p>Zgodnie z rozporządzeniem UE 261/2004, odszkodowanie za opóźniony, odwołany lub niewykonany lot ustalane jest na podstawie odległości lotu oraz długości opóźnienia. Wysokość rekompensaty wynosi:</p>
                        <ul>
                            <li>Loty do 1500 km – odszkodowanie w wysokości 250 EUR.</li>
                            <li>Loty między 1500 km a 3500 km – odszkodowanie w wysokości 400 EUR.</li>
                            <li>Loty powyżej 3500 km (w obrębie UE) – odszkodowanie w wysokości 400 EUR.</li>
                            <li>Loty powyżej 3500 km (poza UE) – odszkodowanie w wysokości 600 EUR.</li>
                        </ul>

                        <h4 className="pt-2">Przykłady:</h4>
                        <ul>
                            <li>Lot Warszawa – Berlin (do 1500 km): W przypadku odwołania lub opóźnienia powyżej 3 godzin, pasażer ma prawo do odszkodowania w wysokości 250 EUR.</li>
                            <li>Lot Warszawa – Madryt (pomiędzy 1500 km a 3500 km): Odszkodowanie wynosi 400 EUR, jeśli lot jest opóźniony o ponad 3 godziny.</li>
                            <li>Lot Warszawa – Nowy Jork (ponad 3500 km): W przypadku odwołania lub opóźnienia przekraczającego 3 godziny, pasażer może otrzymać aż 600 EUR odszkodowania.</li>
                        </ul>

                        <h2 className="pt-2">Dodatkowe czynniki wpływające na wysokość odszkodowania</h2>
                        <p>Odszkodowanie pasażera może zostać zmniejszone lub w ogóle nie przysługiwać, jeżeli przewoźnik udowodni, że opóźnienie lub odwołanie lotu wynikało z nadzwyczajnych okoliczności, takich jak:</p>
                        <ul>
                            <li>Warunki atmosferyczne (np. silne burze, mgła)</li>
                            <li>Strajki (np. strajki kontrolerów ruchu lotniczego)</li>
                            <li>Problemy związane z bezpieczeństwem (np. wady techniczne samolotu, które nie stanowią zaniedbania przewoźnika)</li>
                        </ul>

                        <p>W takich przypadkach linia lotnicza nie ponosi odpowiedzialności za wypłatę odszkodowania, ponieważ okoliczności te są uznawane za niezależne od przewoźnika. Jednakże pasażerom wciąż przysługują inne prawa, takie jak prawo do opieki (np. posiłki, napoje, noclegi, jeśli to konieczne) oraz możliwość zmiany rezerwacji lub zwrotu kosztów biletu.</p>

                        <h2 className="pt-2">Zasady wypłaty odszkodowania</h2>
                        <p>Pasażerowie, którzy doświadczyli opóźnienia, odwołania lub odmowy przyjęcia na pokład, mają prawo do odszkodowania w przypadku, gdy warunki rozporządzenia są spełnione. Aby uzyskać odszkodowanie, pasażer powinien:</p>
                        <ol>
                            <li>Złożyć reklamację do przewoźnika – najlepiej jak najszybciej po incydencie.</li>
                            <li>Wskazać odpowiednią sytuację – np. opóźnienie powyżej 3 godzin, odwołanie lotu itp.</li>
                            <li>Zachować dokumenty – takie jak bilety, boarding pass, korespondencję z przewoźnikiem.</li>
                        </ol>

                        <p>Jeśli linia lotnicza nie wypłaci odszkodowania dobrowolnie, pasażerowie mogą zgłosić sprawę do krajowego organu ochrony konsumentów lub skorzystać z pomocy organizacji zajmujących się pomocą w uzyskiwaniu odszkodowań (np. firmy specjalizujące się w dochodzeniu odszkodowań lotniczych).</p>

                        <h2 className="pt-2">Podsumowanie</h2>
                        <p>Rozporządzenie UE 261/2004 zapewnia pasażerom lotniczym ochronę w przypadku opóźnień, odwołań lub odmowy przyjęcia na pokład. Wysokość odszkodowania zależy od długości lotu i wynosi od 250 EUR do 600 EUR. Pasażerowie mają prawo do rekompensaty, jeśli spełnione są określone warunki, chociaż przewoźnik może zmniejszyć lub unikać wypłaty odszkodowania, jeśli wystąpiły nadzwyczajne okoliczności. Pamiętajmy, że rozporządzenie to ma na celu ochronę praw konsumentów i zachowanie równowagi między liniami lotniczymi a pasażerami, umożliwiając dochodzenie roszczeń w przypadku sytuacji nieprzewidzianych.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default function PrivacyPolicy({ auth }) {

    return (
        <>
            {auth.user ? (
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Blog" />
                    <Privacy />
                    <Footer />
                </AuthenticatedLayout>
            ) : (
                <Standard user={auth.user}>
                    <Head title="Blog" />
                    <Privacy />
                    <Footer />
                </Standard>
            )}
        </>
    );
}
