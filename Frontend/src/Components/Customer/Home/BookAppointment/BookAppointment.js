import React from "react";
import Doctor from "../../../../Assets/doctor-book-appointment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "./BookAppointment.css";
import contentConfig from "../../../../Config/contentConfig"; 
import { useLanguage } from '../../../../Config/LanguageContext';

function BookAppointment() {
  const navigate = useNavigate();

  const { language } = useLanguage();

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  return (
    <div className="ba-section">
      <div className="ba-image-content">
        <img src={Doctor} alt="Doctor Group" className="ba-image1" />
      </div>

      <div className="ba-text-content">
        <h3 className="ba-title">
          <span>{contentConfig.book_appointment.title_1[language]}</span>
        </h3>
        <p className="ba-description">
        {contentConfig.book_appointment.title_2[language]}
        </p>

        
        <div className="ba-checks ba-check-first">
          {contentConfig.book_appointment.checks.map((check, index) => (
            <div key={index} className="ba-check-last">
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={{ color: "#1E8FFD" }} // Màu xanh dương cho tất cả icon
                className={`check-icon custom-icon-class-${index}`}
              />
              <span> {check[language]}</span>
            </div>
          ))}
        </div>

        <button
          className="text-appointment-btn"
          type="button"
          onClick={handleBookAppointmentClick}
        >
          <FontAwesomeIcon icon={faCalendarCheck} /> {contentConfig.book_appointment.title_3[language]}
        </button>
      </div>
    </div>
  );
}

export default BookAppointment;
