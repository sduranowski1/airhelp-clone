import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AdminDashboard from "@/Layouts/Sidebar.jsx";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import AdminNav from "@/Layouts/AdminNav.jsx";
import FormDataTable from "@/Partials/FormDataTable.jsx";
import UserDataTable from "@/Partials/UserDataTable.jsx";
import DiscountDataTable from "@/Partials/DiscountDataTable.jsx";
import DiscountEditTable from "@/Partials/DiscountEditTable.jsx";
import DiscountCreateTable from "@/Partials/DiscountCreateTable.jsx";

export default function DiscountCreate({ auth, discount }) {
    return (
        <AdminDashboard
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Panel</h2>}
        >
            <Head title="Dashboard" />
            <AdminNav
                user={auth.user}
                // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Panel</h2>}
            >

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            {/*<div className="p-6 text-gray-900">You're logged in din din!</div>*/}
                            <DiscountCreateTable discount={discount} />
                        </div>
                    </div>
                </div>
            </AdminNav>


            {/*/!* Include the AdminDashboard component *!/*/}
            {/*{auth.user.role_id === 1 && <AdminDashboard />}*/}
        </AdminDashboard>
    );
}
