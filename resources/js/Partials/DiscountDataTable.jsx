// resources/js/Partials/FormDataTable.jsx
import React from 'react';
import { InertiaLink } from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";
import {t} from "i18next";

const DiscountDataTable = ({ discountData }) => {
    if (!Array.isArray(discountData) || discountData.length === 0) {
        return <div>No data available</div>;
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/admin/discounts/${id}`);
            // Optionally, show a success message or handle the success case
            setTimeout(function(){
                window.location.reload(1);
            }, 2000);

            // If you want to refresh the page after deletion, you can use window.location.reload();
        } catch (error) {
            // Handle error, e.g., show an error message
            console.error("There was an error deleting the discount!", error);
        }
    };

    return (
        <div className="p-6 text-gray-900 overflow-x-auto  overflow-y-auto max-h-[770px]">
            <div className="p-3">
            <InertiaLink
                href={route('admin.discounts.create')}
                className="text-white p-2 bg-green-600 rounded hover:bg-green-700 mr-2"
            >
                {t("table.Utwórz")}
            </InertiaLink>
            </div>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-300">ID</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t("table.Kod")}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t("table.Opis")}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t("table.Koniec")}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t("table.Utworzone")}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t("table.Zaktualizowane")}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t("table.Akcje")}</th> {/* Add Actions column */}
                </tr>
                </thead>
                <tbody>
                {discountData.map((discount) => (
                    <tr key={discount.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{discount.id}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.code}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.description}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.end_date}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.created_at}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.updated_at}</td>
                        <td className="py-2 px-4 border-b border-gray-300">
                            <InertiaLink
                                href={route('admin.discounts.edit', discount.id)}
                                className="text-blue-500 hover:text-blue-700 mr-2"
                            >
                                {t("table.Edycja")}
                            </InertiaLink>
                            <td>
                                <button onClick={() => handleDelete(discount.id)}
                                        className="text-red-500 hover:text-red-700 mr-2"
                                >{t("table.Usuń")}</button>
                            </td>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DiscountDataTable;

