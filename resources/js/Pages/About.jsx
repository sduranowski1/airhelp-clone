import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Footer from "@/Layouts/Footer.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";
import {t} from "i18next";


const AboutUs = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold m-6 text-center">{t("aboutUs.title")}</h1>
            <div className="container mx-auto">
                <ul className="list-none space-y-4">
                    <li className="shadow rounded p-4 hover:bg-gray-100">
                        <header>
                            <h1>{t("aboutUs.companyName")}</h1>
                            <p>{t("aboutUs.intro")}</p>
                        </header>

                        <section>
                            <h2>{t("aboutUs.sections.whoWeAre.heading")}</h2>
                            <img
                                src={t("aboutUs.sections.whoWeAre.image")}
                                alt={t("aboutUs.sections.whoWeAre.heading")}
                                className="w-full h-96 object-cover mb-4 rounded"
                            />
                            <p>{t("aboutUs.sections.whoWeAre.description")}</p>

                            <h3>{t("aboutUs.sections.expertise.heading")}</h3>
                            <p>{t("aboutUs.sections.expertise.description")}</p>

                            <h3>{t("aboutUs.sections.service.heading")}</h3>
                            <img
                                src={t("aboutUs.sections.service.image")}
                                alt={t("aboutUs.sections.service.heading")}
                                className="w-full h-96 object-cover mb-4 rounded"
                            />
                            <p>{t("aboutUs.sections.service.description")}</p>

                            <h3>{t("aboutUs.sections.whyUs.heading")}</h3>
                            <p>{t("aboutUs.sections.whyUs.description")}</p>

                            <h3>{t("aboutUs.sections.joinUs.heading")}</h3>
                            <img
                                src={t("aboutUs.sections.joinUs.image")}
                                alt={t("aboutUs.sections.joinUs.heading")}
                                className="w-full h-96 object-cover mb-4 rounded"
                            />
                            <p>{t("aboutUs.sections.joinUs.description")}</p>
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
