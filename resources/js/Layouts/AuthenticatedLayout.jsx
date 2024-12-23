import React, {useEffect, useState} from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import {useAuth} from "@/Contexts/AuthContext.jsx";
import LanguageSwitcher from "@/Layouts/LanguageSwitcher.jsx";
import {t} from "i18next";

export default function Authenticated({ user, header, children }) {
    const { auth } = useAuth();
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 100; // Adjust the threshold as needed
            setIsSticky(scrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className={`bg-white border-b border-gray-100 ${isSticky ? 'sticky' : ''}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800"/>
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 md:flex">
                                <NavLink href={route('home')} active={route().current('home')}>
                                    {t('navigation.home')}
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 md:flex">
                                <NavLink href={route('multistep.index')} active={route().current('multistep')}>
                                    {t('navigation.checkCompensation')}
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 md:flex">
                                <NavLink href={route('privacy-policy')} active={route().current('privacy-policy')}>
                                    {t('navigation.knowYourRights')}
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 md:flex">
                                <NavLink href={route('about-us')} active={route().current('about-us')}>
                                    {t('navigation.aboutUs')}
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 md:flex">
                                <NavLink href={route('blog')} active={route().current('blog')}>
                                    {t('navigation.blog')}
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 md:flex">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    {t('navigation.dashboard')}
                                </NavLink>
                            </div>


                            {user.role_id === 1 && ( // Render only if user is admin
                                <div className="hidden space-x-8 sm:-my-px sm:ms-10 md:flex">
                                    <NavLink href={route('admin.dashboard')}
                                             active={route().current('admin.dashboard')}>
                                        {t('navigation.admin')}
                                    </NavLink>
                                </div>
                            )}
                        </div>

                        <div className="hidden md:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>{t('navigation.profile')}</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            {t('navigation.logOut')}
                                        </Dropdown.Link>
                                        <LanguageSwitcher/>

                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center md:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>

                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                            {t('navigation.home')}
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('multistep.index')} active={route().current('multistep')}>
                            {t('navigation.checkCompensation')}
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1">

                        <ResponsiveNavLink  href={route('privacy-policy')} active={route().current('privacy-policy')}>
                            {t('navigation.knowYourRights')}
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1">

                        <ResponsiveNavLink  href={route('about-us')} active={route().current('about-us')}>
                            {t('navigation.aboutUs')}
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('blog')} active={route().current('blog')}>
                            {t('navigation.blog')}
                        </ResponsiveNavLink>
                    </div>


                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            {t('navigation.dashboard')}
                        </ResponsiveNavLink>
                    </div>
                    {user.role_id === 1 && ( // Render only if user is admin
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('admin.dashboard')}
                                               active={route().current('admin.dashboard')}>
                                {t('navigation.admin')}
                            </ResponsiveNavLink>
                        </div>
                    )}

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800">{user.name}</div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>{t('navigation.profile')}</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                {t('navigation.logOut')}
                            </ResponsiveNavLink>
                            <LanguageSwitcher/>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
