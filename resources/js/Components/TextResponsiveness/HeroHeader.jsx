import React from 'react';
import useMediaQuery from './useMediaQuery';
import {t} from "i18next";

const HeroHeader = () => {
    const isMobile = useMediaQuery('(max-width: 992px)'); // Adjust breakpoint as needed

    return (
        <div className="p-6 heading-custom">
            {isMobile ? t('heroSection.mobileHeading') : t('heroSection.heading')}
        </div>
    );
};

export default HeroHeader;
