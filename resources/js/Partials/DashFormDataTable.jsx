// resources/js/Partials/FormDataTable.jsx
import React, {useState} from 'react';
import Modal from "@/Components/Modal.jsx";

const DashFormDataTable = ({ dashFormData }) => {
    // console.log('formData in FormDataTable:', formData); // Add this line for debugging
    //
    // if (!Array.isArray(formData) || formData.length === 0) {
    //     return <div>No data available</div>;
    // }
    const sortedFormData = [...dashFormData].sort((a, b) => b.id - a.id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const openModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    };


    return (
        <div className="p-6 text-gray-900 overflow-x-auto">
            <h2>Formularze</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-300">ID</th>
                    <th className="py-2 px-4 border-b border-gray-300">Status</th>
                    <th className="py-2 px-4 border-b border-gray-300">Podpis</th>
                    {/*<th className="py-2 px-4 border-b border-gray-300">Odlot</th>*/}
                    {/*<th className="py-2 px-4 border-b border-gray-300">Przylot</th>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Czy Twój lot obejmował przesiadkę?</th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    {/*<th className="py-2 px-4 border-b border-gray-300">Input2</th>*/}
                    <th className="py-2 px-4 border-b border-gray-300">Dane lotu</th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    <th className="py-2 px-4 border-b border-gray-300">Linia lotnicza</th>
                    <th className="py-2 px-4 border-b border-gray-300">Nr lotu</th>
                    <th className="py-2 px-4 border-b border-gray-300">Dzień odlotu</th>
                    <th className="py-2 px-4 border-b border-gray-300">Teraz przejdźmy do samego zakłócenia. Co
                        dokładnie się wydarzyło?
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    <th className="py-2 px-4 border-b border-gray-300">Bardzo nam przykro. Ile wynosiło opóźnienie
                        Twojego lotu do miasta Seoul (ICN)?
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    <th className="py-2 px-4 border-b border-gray-300">Czy dobrowolnie zrzekłeś(-aś) się miejsca na
                        pokładzie w zamian za inne korzyści oferowane przez linię lotniczą?
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
                    <th className="py-2 px-4 border-b border-gray-300">Imię pasażera</th>
                    <th className="py-2 px-4 border-b border-gray-300">Nazwisko</th>
                    <th className="py-2 px-4 border-b border-gray-300">Email</th>
                    <th className="py-2 px-4 border-b border-gray-300">Aby ruszyć z Twoją sprawą, potrzebuję kilku
                        informacji.
                    </th>
                    <td className="py-2 px-4 border-b border-gray-300"></td>
                    <td className="py-2 px-4 border-b border-gray-300"></td>
                    <th className="py-2 px-4 border-b border-gray-300">Możesz złożyć wniosek w imieniu wszystkich osób
                        wymienionych w Twojej rezerwacji. Czy ktoś z Tobą podróżował?
                    </th>
                    <td className="py-2 px-4 border-b border-gray-300"></td>
                    <th className="py-2 px-4 border-b border-gray-300">Pozostali pasażerowie</th>
                    <th className="py-2 px-4 border-b border-gray-300">Adres</th>
                    <th className="py-2 px-4 border-b border-gray-300">Numer mieszkania</th>
                    <th className="py-2 px-4 border-b border-gray-300">Miasto</th>
                    <th className="py-2 px-4 border-b border-gray-300">Kod pocztowy</th>
                    <th className="py-2 px-4 border-b border-gray-300">Województwo</th>
                    <th className="py-2 px-4 border-b border-gray-300">Kraj</th>
                    <th className="py-2 px-4 border-b border-gray-300">Nr telefonu</th>
                    <th className="py-2 px-4 border-b border-gray-300">Nr rezerwacji</th>
                    <th className="py-2 px-4 border-b border-gray-300">Kod rabatowy</th>
                    <th className="py-2 px-4 border-b border-gray-300">Zaaplikowano</th>
                    {/*<th className="py-2 px-4 border-b border-gray-300">Updated At</th>*/}
                </tr>
                </thead>
                <tbody>
                {sortedFormData.map((dash) => (
                    <tr key={dash.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{dash.id}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.status}</td>
                        <td className="py-2 px-4 border-b border-gray-300 cursor-pointer">
                            <img src={`/${dash.signature}`} alt="Signature" className="w-16 h-auto"
                                 onClick={() => openModal(`/${dash.signature}`)}
                            />
                        </td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{dash.input1}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{dash.input1a}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input1b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input1c}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{dash.input2}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input3}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input3a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input4}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input4a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input4b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5c}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5d}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5e}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5f}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5g}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5h}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5i}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input5j}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input6}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input6a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input6b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input6c}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input6d}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input6e}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input7a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input7b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input7c}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8a}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8b}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8c}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8d}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8e}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input8f}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input9}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.input10}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.created_at}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{dash.updated_at}</td>*/}
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

export default DashFormDataTable;
