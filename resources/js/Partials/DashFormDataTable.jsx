// resources/js/Partials/FormDataTable.jsx
import React from 'react';

const DashFormDataTable = ({ dashFormData }) => {
    // console.log('formData in FormDataTable:', formData); // Add this line for debugging
    //
    // if (!Array.isArray(formData) || formData.length === 0) {
    //     return <div>No data available</div>;
    // }


    return (
        <div className="p-6 text-gray-900 overflow-x-auto">
            <h2>Formularze</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-300">ID</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input1</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input1a</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input1b</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input1c</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input2</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input3</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input3a</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input4</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input4a</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input4b</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input6</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input6a</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input6b</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input8</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input8a</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input8b</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input8c</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input8d</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input8e</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input8f</th>
                    <th className="py-2 px-4 border-b border-gray-300">Input9</th>
                    <th className="py-2 px-4 border-b border-gray-300">Created At</th>
                    <th className="py-2 px-4 border-b border-gray-300">Updated At</th>
                    <th className="py-2 px-4 border-b border-gray-300">Status</th>
                </tr>
                </thead>
                <tbody>
                {dashFormData.map((dash) => (
                    <tr key={dash.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{dash.id}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input1}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input1a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input1b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input1c}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input2}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input3}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input3a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input4}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input4a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input4b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input6}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input6a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input6b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8c}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8d}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8e}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8f}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input9}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.created_at}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.updated_at}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashFormDataTable;
