import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Dropdown from "@/Components/Dropdown.jsx";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const currentLang = i18n.language; // Get the current language

    // Function to change the language and save it to localStorage
    const changeLanguage = (lang) => {
        localStorage.setItem('selectedLanguage', lang); // Save language to localStorage
        i18n.changeLanguage(lang); // Update language in i18next
    };

    // Load the saved language on component mount
    useEffect(() => {
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && savedLanguage !== currentLang) {
            i18n.changeLanguage(savedLanguage); // Set the saved language as the current one
        }
    }, [currentLang, i18n]);

    return (
        <div>
            {currentLang === 'pl' ? (
                <Dropdown.Link onClick={() => changeLanguage('en')}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/2560px-Flag_of_the_United_Kingdom_%283-5%29.svg.png"
                        alt="English Flag"
                        className="inline-block w-7 h-5 mr-2"
                    />
                    English
                </Dropdown.Link>
            ) : (
                <Dropdown.Link onClick={() => changeLanguage('pl')}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Flag_of_Poland.svg/1200px-Flag_of_Poland.svg.png"
                        alt="Polish Flag"
                        className="inline-block w-7 h-5 mr-2"
                    />
                    Polski
                </Dropdown.Link>
            )}
        </div>
    );
};

export default LanguageSwitcher;
