import React from 'react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import {Link} from "@inertiajs/react";

function Footer() {
    return (
        <footer className="footer mt-auto py-3">
            <div className="container text-center">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                </Link>
            </div>
            <div className="container text-center">
                {/*<span className="text-muted">Your footer content goes here.</span>*/}
            </div>
        </footer>
);
}

export default Footer;
