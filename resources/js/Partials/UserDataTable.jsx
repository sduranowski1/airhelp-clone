// resources/js/Partials/FormDataTable.jsx
import React from 'react';
import {t} from "i18next";

const UserDataTable = ({ userData }) => {
    if (!Array.isArray(userData) || userData.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="p-6 text-gray-900 overflow-x-auto  overflow-y-auto max-h-[770px]">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-300">ID</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t("table.Imię")}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Email')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Zaaplikowano')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Zaktualizowano')}</th>
                </tr>
                </thead>
                <tbody>
                {userData.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{user.id}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{user.created_at}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{user.updated_at}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDataTable;
