// CookieConsent.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {t} from "i18next";

const Popup = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  flex-direction: column;
  opacity: 95%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;



const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

const CookieConsent = () => {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowPopup(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setShowPopup(false);
    };

    if (!showPopup) {
        return null;
    }

    return (
        <Popup>
            <div>{t("cookieModal.message")}</div>
            <br/>
            <Button onClick={handleAccept}>{t("cookieModal.button")}</Button>
        </Popup>
    );
};

export default CookieConsent;
