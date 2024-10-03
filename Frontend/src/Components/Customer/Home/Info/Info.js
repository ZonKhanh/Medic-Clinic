import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth } from "@fortawesome/free-solid-svg-icons";
import "./Info.css";
import contentConfig from "../../../../Config/contentConfig"; 
import { useLanguage } from '../../../../Config/LanguageContext';

function Info() {

  const { language } = useLanguage(); // Lấy ngôn ngữ hiện tại từ context
  const iconMap = {
    faTruckMedical: faTruckMedical,
    faHeartPulse: faHeartPulse,
    faTooth: faTooth
  };

  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>{contentConfig.service_page.title_1[language]}</span>
        </h3>
        <p className="info-description">
        {contentConfig.service_page.title_2[language]}
        </p>
      </div>

      <div className="info-cards-content">
        {contentConfig.service_page.InformationCard.map((card, index) => (
          <InformationCard
            key={index}
            title={card.title[language]} // Access title based on language
            description={card.description[language]} // Access description based on language
            icon={iconMap[card.icon]} // Get icon from iconMap
          />
        ))}
      </div>
    </div>
  );
}

export default Info;
