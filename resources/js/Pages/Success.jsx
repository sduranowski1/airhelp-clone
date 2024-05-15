import {Head, Link} from '@inertiajs/react';
import Guest from "@/Layouts/GuestLayout.jsx";
import Standard from "@/Layouts/StandardLayout.jsx";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {useState} from "react";

// Common content component
// Common content component
const SuccessContent = () => {

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        <h2>Form Submitted Successfully!</h2>
                        {/* Add additional content for success page */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Success({auth}) {
    return (
        <>
            {auth.user ? (
                <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Success</h2>}>
                    <Head title="Success" />
                    <SuccessContent />
                </AuthenticatedLayout>
            ) : (
                <Standard header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Success</h2>}>
                    <Head title="Success" />
                    <SuccessContent />
                </Standard>
            )}
        </>
    );
}
