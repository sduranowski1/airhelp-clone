import React from 'react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {Link} from "@inertiajs/react";

function Footer() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


    return (
        <footer className="footer mt-auto py-3">
            <div className="container text-center">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                </Link>
                <Link href="/privacy-policy" className="ml-auto mr-0 text-gray-600">
                    <div>Polityka prywatności</div>
                </Link>
                <Link href="/about-us" className="ml-3 text-gray-600">
                    <div>O Nas</div>
                </Link>
                <div className="ml-4">Copyright © 2024 AirHelp</div>
            </div>
            <div className="container text-center">
                {/*<span className="text-muted">Your footer content goes here.</span>*/}
            </div>
        </footer>
);
}

export default Footer;
