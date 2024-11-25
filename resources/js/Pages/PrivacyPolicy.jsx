import React from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head} from "@inertiajs/react";
import Footer from "@/Layouts/Footer.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";
import {t} from "i18next";

const Privacy = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold m-6 text-center">{t("privacy.title")}</h1>
            <div className="container mx-auto">
                <ul className="list-none space-y-4">
                    <li className="shadow rounded p-4 hover:bg-gray-100">
                        <h2>{t("privacy.header")}</h2>
                        <p>{t("privacy.intro")}</p>
                        <p>{t("privacy.discussion")}</p>

                        <h2 className="pt-2">{t("privacy.keyProvisions")}</h2>
                        <p>{t("privacy.provisionsIntro")}</p>
                        <ul>
                            <li>{t("privacy.provisionCancellation")}</li>
                            <li>{t("privacy.provisionDelay")}</li>
                            <li>{t("privacy.provisionDeniedBoarding")}</li>
                        </ul>

                        <p>{t("privacy.factorsIntro")}</p>

                        <h2 className="pt-2">{t("privacy.compensationRates")}</h2>
                        <p>{t("privacy.ratesIntro")}</p>
                        <ul>
                            <li>{t("privacy.examples")}</li>
                        </ul>

                        <h2 className="pt-2">{t("privacy.additionalFactors")}</h2>
                        <p>{t("privacy.factors")}</p>
                        <ul>
                            <li>{t("privacy.factorWeather")}</li>
                            <li>{t("privacy.factorStrikes")}</li>
                            <li>{t("privacy.factorSafety")}</li>
                        </ul>

                        <h2 className="pt-2">{t("privacy.claimProcess")}</h2>
                        <ol>
                            <li>{t("privacy.processStep1")}</li>
                            <li>{t("privacy.processStep2")}</li>
                            <li>{t("privacy.processStep3")}</li>
                        </ol>
                        <p>{t("privacy.refusalNote")}</p>

                        <h2 className="pt-2">{t("privacy.conclusion")}</h2>
                        <p>{t("privacy.summary")}</p>
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
