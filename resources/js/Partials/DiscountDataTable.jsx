// resources/js/Partials/FormDataTable.jsx
import React from 'react';

const DiscountDataTable = ({ discountData }) => {
    if (!Array.isArray(discountData) || discountData.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="p-6 text-gray-900 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-300">ID</th>
                    <th className="py-2 px-4 border-b border-gray-300">Kod</th>
                    <th className="py-2 px-4 border-b border-gray-300">Opis</th>
                    <th className="py-2 px-4 border-b border-gray-300">Start</th>
                    <th className="py-2 px-4 border-b border-gray-300">Koniec</th>
                    <th className="py-2 px-4 border-b border-gray-300">Utworzone</th>
                    <th className="py-2 px-4 border-b border-gray-300">Zaktualizowane</th>
                </tr>
                </thead>
                <tbody>
                {discountData.map((discount) => (
                    <tr key={discount.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{discount.id}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.code}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.description}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.start_date}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.end_date}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.created_at}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{discount.updated_at}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DiscountDataTable;
