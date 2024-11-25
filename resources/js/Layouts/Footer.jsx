import React from 'react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {Link} from "@inertiajs/react";
import {t} from "i18next";

function Footer() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');


    return (
        <footer className="footer mt-auto py-3">
            <div className="container text-center">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                </Link>
                <div>
                    <Link href="/privacy-policy" className="ml-auto mr-0 text-gray-600">
                        <a>{t('navigation.knowYourRights')}</a>
                    </Link>
                    <Link href="/about-us" className="ml-3 text-gray-600">
                        <a>{t('navigation.aboutUs')}</a>
                    </Link>
                    <a className="ml-4">Copyright © 2024 BeSmartAir</a>
                </div>


            </div>
            <div className="container text-center">
                {/*<span className="text-muted">Your footer content goes here.</span>*/}
            </div>
        </footer>
);
}

export default Footer;
