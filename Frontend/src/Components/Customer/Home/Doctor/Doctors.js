import React from "react";
import DoctorCard from "./DoctorCard";
import "../Doctor/Doctors.css";
import contentConfig from "../../../../Config/contentConfig"; 
import { useLanguage } from "../../../../Config/LanguageContext";


function Doctors() {

  const { language } = useLanguage();

  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>{contentConfig.doctor_page.title_1[language]}</span>
        </h3>

        <p className="dt-description">
        {contentConfig.doctor_page.title_2[language]}
        </p>
      </div>

      <div className="dt-cards-content">
      {contentConfig.doctor_page.DoctorCard.map((card, index) => (
        <DoctorCard
        key={index}
          img={card.img}
          name={card.name[language]}
          title={card.title[language]}
          stars={card.stars}
          reviews={card.review[language]}
        />
      ))}
      </div>
    </div>
  );
}

export default Doctors;
