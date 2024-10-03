import React, { useEffect } from "react";
import "./Legal.css";
import contentConfig from "../../../../Config/contentConfig";
import { useLanguage } from '../../../../Config/LanguageContext';
import Navbar from "../Navbar/Navbar";

function LegalDocs() {
  const { language } = useLanguage();
  const { legalDocs } = contentConfig;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="legal-section-title">
          <Navbar />

      <div className="legal-text-content">
        {legalDocs.content.map((item, index) => (
          <React.Fragment key={index}>
            <p className="legal-title">{item.title[language]}</p>
            <p className="legal-description">{item.description[language]}</p>
          </React.Fragment>
        ))}
      </div>

      <div className="legal-footer">
        <p>{legalDocs.footer.copyright[language]}</p>
      </div>
    </div>
  );
}

export default LegalDocs;