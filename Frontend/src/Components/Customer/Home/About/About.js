import React from "react";
import Doctor from "../../../../Assets/doctor-group.png";
import SolutionStep from "../SolutionStep";
import "../About/About.css";
import contentConfig from "../../../../Config/contentConfig"; 
import { useLanguage } from '../../../../Config/LanguageContext';

function About() {

  const { language } = useLanguage();

  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>{contentConfig.about_page.title_1[language]}</span>
        </h3>
        <p className="about-description">
        {contentConfig.about_page.title_2[language]}
        </p>

        <h4 className="about-text-title">{contentConfig.about_page.title_3[language]}</h4>
        
        {contentConfig.about_page.SolutionStep.map((card, index) => (
        <SolutionStep
        key={index}
          title={card.title[language]}
          description={card.description[language]}
        />
      ))}
      </div>
    </div>
  );
}

export default About;
