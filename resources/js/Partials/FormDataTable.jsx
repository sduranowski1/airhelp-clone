// resources/js/Partials/FormDataTable.jsx
import React, {useState} from 'react';
import Modal from "@/Components/Modal.jsx";
import {Inertia} from "@inertiajs/inertia";
import {t} from "i18next";


const FormDataTable = ({ formData }) => {
    const sortedFormData = [...formData].sort((a, b) => b.id - a.id);
    const [statusMap, setStatusMap] = useState({});
    const [pdfUrl, setPdfUrl] = useState(null);
    const [selectedPdfPath, setSelectedPdfPath] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedImage, setSelectedImage] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');


    const openModal = async (path) => {
        try {
            const response = await fetch(path);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            setPdfUrl(blobUrl);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error loading PDF:", error);
        }
    };

    const handleCloseModal1 = () => {
        setIsModalOpen(false);
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl); // Cleanup object URL to free memory
            setPdfUrl(null);
        }

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

    console.log(sortedFormData); // Log the path to check



    return (
        <div className="p-6 text-gray-900 overflow-x-auto overflow-y-auto max-h-[770px]">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.ID')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Nr zgłoszenia')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Status')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Umowa')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Kod rabatowy')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Czy Twój lot obejmował przesiadkę?')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Dane lotu')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Linia lotnicza')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Nr lotu')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Dzień odlotu')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Teraz przejdźmy do samego zakłócenia. Co dokładnie się wydarzyło?')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Bardzo nam przykro. Ile wynosiło opóźnienie Twojego lotu?')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Czy dobrowolnie zrzekłeś(-aś) się miejsca na pokładzie w zamian za inne korzyści oferowane przez linię lotniczą?')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Imię pasażera')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Nazwisko')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Email')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Aby ruszyć z Twoją sprawą, potrzebuję kilku informacji.')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Możesz złożyć wniosek w imieniu wszystkich osób wymienionych w Twojej rezerwacji. Czy ktoś z Tobą podróżował?')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Pozostali pasażerowie')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Adres')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Numer mieszkania')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Miasto')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Kod pocztowy')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Województwo')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Kraj')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Nr telefonu')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Nr rezerwacji')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Zaaplikowano')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Zaktualizowano')}</th>
                </tr>
                </thead>
                <tbody>
                {sortedFormData.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{row.id}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.uuid}</td>

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
                                <option value="Oczekuje">{t("table.Oczekuje")}</option>
                                <option value="Odrzucone">{t("table.Odrzucone")}</option>
                                <option value="Zatwierdzone">{t("table.Zatwierdzone")}</option>
                            </select>
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300 cursor-pointer">
                            {/* Check if the PDF path exists before rendering the iframe */}
                            {/*{row.pdf_path && (*/}
                            {/*    <iframe*/}
                            {/*        src={`/${row.pdf_path}`} // Replace with the path to your PDF*/}
                            {/*        width="100%"*/}
                            {/*        height="400px"*/}
                            {/*        className="border-none"*/}
                            {/*        title="Umowa"*/}
                            {/*        onClick={openModal} // Open modal on click*/}
                            {/*    ></iframe>*/}
                            {/*)}*/}
                            {/* Clickable link to open modal */}
                            <button onClick={() => openModal(row.pdf_path)} className="text-blue-600 hover:underline">
                                {t("dashboard.pdfButton")}
                            </button>
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                                    <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
                                        <h2 className="text-xl font-semibold mb-2">{t('table.Umowa')}</h2>
                                        {/* PDF iframe in modal */}
                                        <iframe
                                            src={pdfUrl} // Same path for modal
                                            width="100%"
                                            height="400px"
                                            className="border-none"
                                            title="Umowa"
                                        ></iframe>
                                        <button
                                            onClick={handleCloseModal1}
                                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            {t('dashboard.closeButton')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-300">{row.input10}</td>


                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input1}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input1a}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">{row.input1b}</td>
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input1c}</td>*/}
                        {/*<td className="py-2 px-4 border-b border-gray-300">{row.input2}</td>*/}
                        <td className="py-2 px-4 border-b border-gray-300">
                            {/* Check if input3 exists and is not empty */}
                            {row.input3
                                ? (() => {
                                    const parts = row.input3.split(',');
                                    const wylot = parts[0]?.split(':')[1]?.trim() || t('step1.cant_find'); // Safe access with optional chaining
                                    const przylot = parts[1]?.split(':')[1]?.trim() || t('step1.cant_find'); // Safe access with optional chaining
                                    return `${t('step1.Wylot')}: ${wylot}, ${t('step1.Przylot')}: ${przylot}`;
                                })()
                                : t('step1.cant_find')}
                        </td>
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

                                // Format the date to get the month in its full form (e.g., "Listopada")
                                const formattedDate = date.toLocaleString("pl-PL", options);
                                const [day, month, year, time] = formattedDate.split(" ");

                                // Translate the month using the translation keys (e.g., "listopada" -> "November")
                                const translatedMonth = t(`table.${month}`);

                                // Capitalize the first letter of the translated month if not already
                                const monthCapitalized = translatedMonth.charAt(0).toUpperCase() + translatedMonth.slice(1);

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

                                const translatedMonth = t(`table.${month}`);
                                // Capitalize the first letter of the month
                                const monthCapitalized = translatedMonth.charAt(0).toUpperCase() + translatedMonth.slice(1);

                                return `${day} ${monthCapitalized} ${year}, ${time}`;
                            })()}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/*<Modal show={isModalOpen} onClose={closeModal} maxWidth="2xl" closeable>*/}
            {/*    <div className="p-4">*/}
            {/*        <img src={selectedImage} alt="Signature" className="max-w-full h-auto"/>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </div>
    );
};

export default FormDataTable;
