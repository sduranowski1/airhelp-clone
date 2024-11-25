import { Head, usePage } from '@inertiajs/react';
import Guest from "@/Layouts/GuestLayout";
import Standard from "@/Layouts/StandardLayout";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {t} from "i18next";

// Common content component
const SuccessContent = () => {
    const { props } = usePage();
    const { success } = props;

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2>{t('success.message')}</h2>
                        {success && <p>{success}</p>}
                        {/* Add additional content for success page */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Success({ auth }) {
    return (
        <>
            {auth.user ? (
                <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('success.title')}</h2>}>
                    <Head title={t('success.title')} />
                    <SuccessContent />
                </AuthenticatedLayout>
            ) : (
                <Standard header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{t('success.title')}</h2>}>
                    <Head title={t('success.title')} />
                    <SuccessContent />
                </Standard>
            )}
        </>
    );
}
