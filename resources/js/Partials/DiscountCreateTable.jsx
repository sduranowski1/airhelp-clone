// resources/js/Pages/DiscountCreate.jsx

import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';
import {t} from "i18next";

const DiscountCreateTable = () => {
    const { data, setData, post } = useForm({
        code: '',
        description: '',
        end_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.discounts.store'), {
            data,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="p-3 flex flex-col space-y-3">
                <input
                    type="text"
                    value={data.code}
                    onChange={(e) => handleInputChange('code', e.target.value)}
                    placeholder="Kod"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="text"
                    value={data.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Opis"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <input
                    type="date"
                    value={data.end_date}
                    onChange={(e) => handleInputChange('end_date', e.target.value)}
                    placeholder="End Date"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <div className="text-center">

                    <button className="btn btn-primary w-25" type="submit">{t("table.Utwórz")}</button>
                </div>
            </div>
        </form>
);
};

export default DiscountCreateTable;
