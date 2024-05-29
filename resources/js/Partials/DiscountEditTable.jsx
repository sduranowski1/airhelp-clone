// resources/js/Pages/DiscountEdit.jsx

import React, { useState } from 'react';
import { useForm } from '@inertiajs/inertia-react';

const DiscountEditTable = ({ discount }) => {
    const { data, setData, put } = useForm({
        code: discount.code,
        description: discount.description,
        end_date: discount.end_date,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('admin.discounts.update', discount.id), {
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
                        className="mb-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                    <input
                        type="text"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        className="mb-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

                    />
                    <input
                        type="date"
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        className="mb-3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>

                    <button type="submit">Save</button>
                </div>
        </form>
);
};

export default DiscountEditTable;
