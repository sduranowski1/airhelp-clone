import React, {useState} from 'react';
import Modal from "@/Components/Modal.jsx";

const DashFormDataTable = ({ dashFormData }) => {
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
                    <th className="py-2 px-4 border-b border-gray-300">Czy Twój lot obejmował przesiadkę?</th>
                    <th className="py-2 px-4 border-b border-gray-300"></th>
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
                        {dash.input1b !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input1b}</td>
                        )}
                        {dash.input1c !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input1c}</td>
                        )}
                        {dash.input3 !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input3}</td>
                        )}
                        {dash.input3a !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input3a}</td>
                        )}
                        {dash.input4 !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input4}</td>
                        )}
                        {dash.input4a !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input4a}</td>
                        )}
                        {dash.input4b !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input4b}</td>
                        )}
                        {dash.input5 !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5}</td>
                        )}
                        {dash.input5a !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5a}</td>
                        )}
                        {dash.input5b !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5b}</td>
                        )}
                        {dash.input5c !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5c}</td>
                        )}
                        {dash.input5d !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5d}</td>
                        )}
                        {dash.input5e !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5e}</td>
                        )}
                        {dash.input5f !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5f}</td>
                        )}
                        {dash.input5g !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5g}</td>
                        )}
                        {dash.input5h !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5h}</td>
                        )}
                        {dash.input5i !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5i}</td>
                        )}
                        {dash.input5j !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5j}</td>
                        )}
                        {dash.input6 !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input6}</td>
                        )}
                        {dash.input6a !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input6a}</td>
                        )}
                        {dash.input6b !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input6b}</td>
                        )}
                        {dash.input6c !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input6c}</td>
                        )}
                        {dash.input6d !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input6d}</td>
                        )}
                        {dash.input6e !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input6e}</td>
                        )}
                        {dash.input7a !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input7a}</td>
                        )}
                        {dash.input7b !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input7b}</td>
                        )}
                        {dash.input7c !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input7c}</td>
                        )}
                        {dash.input8 !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input8}</td>
                        )}
                        {dash.input8a !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input8a}</td>
                        )}
                        {dash.input8b !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input8b}</td>
                        )}
                        {dash.input8c !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input8c}</td>
                        )}
                        {dash.input8d !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input8d}</td>
                        )}
                        {dash.input8e !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input8e}</td>
                        )}
                        {dash.input8f !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input8f}</td>
                        )}
                        {dash.input9 !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input9}</td>
                        )}
                        {dash.input10 !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input10}</td>
                        )}
                        <td className="py-2 px-4 border-b border-gray-300">{dash.created_at}</td>
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
