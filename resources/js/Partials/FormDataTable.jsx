// resources/js/Partials/FormDataTable.jsx
import React, {useState} from 'react';
import Modal from "@/Components/Modal.jsx";
import {Inertia} from "@inertiajs/inertia";


const FormDataTable = ({ formData }) => {
    // console.log('formData in FormDataTable:', formData); // Add this line for debugging
    //
    // if (!Array.isArray(formData) || formData.length === 0) {
    //     return <div>No data available</div>;
    // }
    const sortedFormData = [...formData].sort((a, b) => b.id - a.id);

    const [statusMap, setStatusMap] = useState({});



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');


    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    };

    const handleStatusChange = (e, id) => {
        const newStatus = e.target.value;
        setSelectedStatus(newStatus); // Update the local state first

        // Send the update request to the backend
        axios.put(route('admin.update-status', { id }), { status: newStatus })
            .then(() => {
                setTimeout(function(){
                    window.location.reload(1);
                }, 1000);
                // Handle success if needed
            })
            .catch((error) => {
                console.error('Error updating status:', error);
                // Handle error if needed
            });
    };


    return (
        <div className="p-6 text-gray-900 overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-300">ID</th>
                    <th className="py-2 px-4 border-b border-gray-300">Status</th>
                    <th className="py-2 px-4 border-b border-gray-300">Podpis</th>
                    <th className="py-2 px-4 border-b border-gray-300">Kod rabatowy</th>
                    {/*<th className="py-2 px-4 border-b border-gray-300">Odlot</th>*/}
                    {/*<th className="py-2 px-4 border-b border-gray-300">Przylot</th>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Czy Twój lot obejmował przesiadkę?</th>
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    {/*<th className="py-2 px-4 border-b border-gray-300">Input2</th>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Dane lotu</th>
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Linia lotnicza</th>
                    <th className="py-2 px-4 border-b border-gray-300">Nr lotu</th>
                    <th className="py-2 px-4 border-b border-gray-300">Dzień odlotu</th>
                    <th className="py-2 px-4 border-b border-gray-300">Teraz przejdźmy do samego zakłócenia. Co
                        dokładnie się wydarzyło?
                    </th>
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Bardzo nam przykro. Ile wynosiło opóźnienie
                        Twojego lotu do miasta Seoul (ICN)?
                    </th>
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Czy dobrowolnie zrzekłeś(-aś) się miejsca na
                        pokładzie w zamian za inne korzyści oferowane przez linię lotniczą?
                    </th>
                    {/*<th className="py-2 px-4 border-b border-gray-300"></th>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Imię pasażera</th>
                    <th className="py-2 px-4 border-b border-gray-300">Nazwisko</th>
                    <th className="py-2 px-4 border-b border-gray-300">Email</th>
                    <th className="py-2 px-4 border-b border-gray-300">Aby ruszyć z Twoją sprawą, potrzebuję kilku
                        informacji.
                    </th>
                    {/*<td className="py-2 px-4 border-b border-gray-300"></td>*/}
                    {/*<td className="py-2 px-4 border-b border-gray-300"></td>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Możesz złożyć wniosek w imieniu wszystkich osób
                        wymienionych w Twojej rezerwacji. Czy ktoś z Tobą podróżował?
                    </th>
                    {/*<td className="py-2 px-4 border-b border-gray-300"></td>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Pozostali pasażerowie</th>
                    <th className="py-2 px-4 border-b border-gray-300">Adres</th>
                    <th className="py-2 px-4 border-b border-gray-300">Numer mieszkania</th>
                    <th className="py-2 px-4 border-b border-gray-300">Miasto</th>
                    <th className="py-2 px-4 border-b border-gray-300">Kod pocztowy</th>
                    <th className="py-2 px-4 border-b border-gray-300">Województwo</th>
                    <th className="py-2 px-4 border-b border-gray-300">Kraj</th>
                    <th className="py-2 px-4 border-b border-gray-300">Nr telefonu</th>
                    <th className="py-2 px-4 border-b border-gray-300">Nr rezerwacji</th>
                    <th className="py-2 px-4 border-b border-gray-300">Zaaplikowano</th>
                    <th className="py-2 px-4 border-b border-gray-300">Zaktualizowano</th>
                </tr>
                </thead>
                <tbody>
                {sortedFormData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{row.id}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.status}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">*/}
                        {/*    <select value={row.status} onChange={(e) => handleStatusChange(e, row.id)}>*/}
                        {/*        <option value="Oczekuje">Oczekuje</option>*/}
                        {/*        <option value="Odrzucone">Odrzucone</option>*/}
                        {/*        <option value="Zatwierdzone">Zatwierdzone</option>*/}
                        {/*    </select>*/}
                        {/*</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">
                            <select
                                value={statusMap[row.id] || row.status} // Use status from state if available
                                onChange={(e) => handleStatusChange(e, row.id)}
                            >
                                <option value="Oczekuje">Oczekuje</option>
                                <option value="Odrzucone">Odrzucone</option>
                                <option value="Zatwierdzone">Zatwierdzone</option>
                            </select>
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300 cursor-pointer">
                            <img src={`/${row.signature}`} alt="Signature" className="w-16 h-auto"
                                 onClick={() => openModal(`/${row.signature}`)}
                            />
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input10}</td>


                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input1}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input1a}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{row.input1b}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input1c}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input2}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{row.input3}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input3a}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{row.input4}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input4a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input4b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input5}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input5a}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input5b}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{row.input5c}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input5d}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input5e}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input5f}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input5g}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input5h}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{row.input5i}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input5j}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{row.input6}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input6a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input6b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input6c}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input6d}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input6e}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{row.input7a}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input7b}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{row.input7c}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input8}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input8a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input8b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input8c}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input8d}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input8e}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input8f}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input9}</td>
                        <td className="py-2 px-4 border-b border-gray-300">
                            {(() => {
                                const date = new Date(row.created_at);
                                const options = {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit"
                                };

                                // Format the date and split it
                                const formattedDate = date.toLocaleString("pl-PL", options);
                                const [day, month, year, time] = formattedDate.split(" ");

                                // Capitalize the first letter of the month
                                const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);

                                return `${day} ${monthCapitalized} ${year}, ${time}`;
                            })()}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">
                            {(() => {
                                const date = new Date(row.updated_at);
                                const options = {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit"
                                };

                                // Format the date and split it
                                const formattedDate = date.toLocaleString("pl-PL", options);
                                const [day, month, year, time] = formattedDate.split(" ");

                                // Capitalize the first letter of the month
                                const monthCapitalized = month.charAt(0).toUpperCase() + month.slice(1);

                                return `${day} ${monthCapitalized} ${year}, ${time}`;
                            })()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl" closeable>
                <div className="p-4">
                    <img src={selectedImage} alt="Signature" className="max-w-full h-auto"/>
                </div>
            </Modal>
        </div>
    );
};

export default FormDataTable;
