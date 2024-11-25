import React, {useState} from 'react';
import Modal from "@/Components/Modal.jsx";
import {t} from "i18next";

const DashFormDataTable = ({ dashFormData }) => {
    const sortedFormData = [...dashFormData].sort((a, b) => b.id - a.id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedImage, setSelectedImage] = useState('');
    const [pdfUrl, setPdfUrl] = useState(null);


    // const openModal = (imageSrc) => {
    //     setSelectedImage(imageSrc);
    //     setIsModalOpen(true);
    // };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    //     setSelectedImage('');
    // };

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

        return (
        <div className="p-6 text-gray-900 overflow-x-auto  overflow-y-auto max-h-[700px]">
            <h2>{t('dashboard.formTitle')}</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.ID')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Nr zgłoszenia')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Status')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Umowa')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Czy Twój lot obejmował przesiadkę?')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Dane lotu')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Linia lotnicza')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Nr lotu')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Dzień odlotu')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Teraz przejdźmy do samego zakłócenia. Co dokładnie się wydarzyło?')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Bardzo nam przykro. Ile wynosiło opóźnienie Twojego lotu do miasta Seoul (ICN)?')}</th>
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
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Kod rabatowy')}</th>
                    <th className="py-2 px-4 border-b border-gray-300">{t('table.Zaaplikowano')}</th>
                </tr>
                </thead>
                <tbody>
                {sortedFormData.map((dash) => (
                    <tr key={dash.id} className="hover:bg-gray-100">
                        <td className="py-2 px-4 border-b border-gray-300">{dash.id}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{dash.uuid}</td>
                        <td className="py-2 px-4 border-b border-gray-300">{t(`table.${dash.status}`)} </td>
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
                            <button onClick={() => openModal(dash.pdf_path)} className="text-blue-600 hover:underline">
                                {t('dashboard.pdfButton')}
                            </button>
                            {isModalOpen && (
                                <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
                                    <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
                                        <h2 className="text-xl font-semibold mb-2">{t('dashboard.modalTitle')}</h2>
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
                        {dash.input1b !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input1b}</td>
                        )}
                        {/*{dash.input1c !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input1c}</td>*/}
                        {/*)}*/}
                        {dash.input3 !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">    {/* Check if dash.input3 is neither null nor empty */}
                                {dash.input3 && (dash.input3.includes(t('step1.cant_find')) || dash.input3 === '')
                                    ? t('step1.cant_find') // This will handle the "flight not found" or empty case
                                    : dash.input3
                                        ? `${t('step1.Wylot')}: ${dash.input3.split(',')[0].split(':')[1].trim()},
               ${t('step1.Przylot')}: ${dash.input3.split(',')[1].split(':')[1].trim()}`
                                        : t('step1.cant_find')} {/* Show default "flight not found" message if input3 is null/undefined */}</td>
                        )}
                        {/*{dash.input3a !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input3a}</td>*/}
                        {/*)}*/}
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
                        {/*{dash.input5a !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input5a}</td>*/}
                        {/*)}*/}
                        {/*{dash.input5b !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input5b}</td>*/}
                        {/*)}*/}
                        {dash.input5c !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5c}</td>
                        )}
                        {/*{dash.input5d !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input5d}</td>*/}
                        {/*)}*/}
                        {/*{dash.input5e !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input5e}</td>*/}
                        {/*)}*/}
                        {/*{dash.input5f !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input5f}</td>*/}
                        {/*)}*/}
                        {/*{dash.input5g !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input5g}</td>*/}
                        {/*)}*/}
                        {/*{dash.input5h !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input5h}</td>*/}
                        {/*)}*/}
                        {dash.input5i !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input5i}</td>
                        )}
                        {/*{dash.input5j !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input5j}</td>*/}
                        {/*)}*/}
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
                        {/*{dash.input6d !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input6d}</td>*/}
                        {/*)}*/}
                        {/*{dash.input6e !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input6e}</td>*/}
                        {/*)}*/}
                        {dash.input7a !== 0 && (
                            <td className="py-2 px-4 border-b border-gray-300">{dash.input7a}</td>
                        )}
                        {/*{dash.input7b !== 0 && (*/}
                        {/*    <td className="py-2 px-4 border-b border-gray-300">{dash.input7b}</td>*/}
                        {/*)}*/}
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
                        <td className="py-2 px-4 border-b border-gray-300">
                            {(() => {
                                const date = new Date(dash.created_at);
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

export default DashFormDataTable;
