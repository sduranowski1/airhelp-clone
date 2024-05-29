// resources/js/Pages/DiscountCreate.jsx

import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

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
            <div className="card p-5" style={{
                backgroundColor: "#f5f5f5", boxShadow: "2px 2px 20px 0px #0000001F"
            }}>
                <input
                    type="text"
                    value={data.code}
                    onChange={(e) => setData('code', e.target.value)}
                    placeholder="Kod"
                    className="mb-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                />
                <input
                    type="text"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Opis"
                    className="mb-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                />
                <input
                    type="date"
                    value={data.end_date}
                    onChange={(e) => setData('end_date', e.target.value)}
                    placeholder="End Date"
                    className="mb-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                />
                <button type="submit">Utwórz</button>
            </div>
        </form>
);
};

export default DiscountCreateTable;
