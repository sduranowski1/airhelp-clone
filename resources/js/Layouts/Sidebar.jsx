import React, { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import Authenticated from "@/Layouts/AuthenticatedLayout.jsx";
import NavLink from "@/Components/NavLink.jsx";
import {Link} from "@inertiajs/react";


function AdminDashboard({ pageTitle, children}) {
    const [sidebarToggled, setSidebarToggled] = useState(false);

    useEffect(() => {
        // Check if the page is loaded on a mobile device
        const handleResize = () => {
            setSidebarToggled(window.innerWidth < 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id="wrapper">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            {/* Include stylesheet links */}
            <link href="/css/sb-admin-2.min.css" rel="stylesheet"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>

            {/* Sidebar */}
            <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${sidebarToggled ? 'toggled' : ''}`}>
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center"
                   href="{{ route('admin.dashboard', ['locale' => app()->getLocale()]) }}">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fa-solid fa-user-tie"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Airhelp</div>
                </a>
                {/* Divider */}
                <hr className="sidebar-divider my-0"/>
                {/* Nav Items */}
                <div className="m-3 text-white">
                    <Link className="text-white" href={route('admin.dashboard')}
                          active={route().current('admin.dashboard')}>
                        Formularze
                    </Link>
                </div>

                {/*/!* Nav Items *!/*/}
                {/*<div className="m-3 text-white">*/}
                {/*    <Link className="text-white" href={route('admin.dashboard')}*/}
                {/*          active={route().current('admin.dashboard')}>*/}
                {/*        Dodatkowi Pasażerowie*/}
                {/*    </Link>*/}
                {/*</div>*/}

                <div className="m-3 text-white">
                    <Link className="text-white" href={route('admin.users')}
                          active={route().current('admin.dashboard')}>
                        Użytkownicy
                    </Link>
                </div>

                <div className="m-3 text-white">
                    <Link className="text-white" href={route('admin.discounts')}
                          active={route().current('admin.dashboard')}>
                        Zniżki
                    </Link>
                </div>
                {/* Replace your nav items here */}
            </ul>
            {/* End of Sidebar */}
            {/* Content Wrapper */}
            <div id="content-wrapper" className="d-flex flex-column">
                {/* Main Content */}
                <div id="content">
                    {/* Topbar */}
                    {/* Include your admin navbar component here */}
                    {/* End of Topbar */}
                    {/* Begin Page Content */}
                    <div className="row">
                        {/* Page Heading */}
                        <h1 className="h3 mb-4 text-gray-800">{pageTitle}</h1>
                        <main className="w-100">
                            {children}
                        </main>
                        {/* Render your content here */}
                        {/* Example:
                            <Route exact path="/admin/dashboard">
                                <Dashboard />
                            </Route>
                        */}
                    </div>
                    {/* /.container-fluid */}
                </div>
                {/* End of Main Content */}
                {/* Footer */}
                {/* Include your admin footer component here */}
                {/* End of Footer */}
            </div>
            {/* End of Content Wrapper */}
            {/* Bootstrap core JavaScript */}
            {/* Include your script imports here */}
            <script>
                {/* Include your script here */}
            </script>
            {/* End Bootstrap core JavaScript */}
        </div>
    );
}

// Render the component to a string
const htmlString = ReactDOMServer.renderToString(
    <html lang="en">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Include stylesheet links */}
        <link href="/css/sb-admin-2.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    </head>
    <body id="page-top">
    <div id="app">
        <AdminDashboard />
    </div>
    </body>
    </html>
);

// Output the HTML string
console.log(htmlString);

export default AdminDashboard;
