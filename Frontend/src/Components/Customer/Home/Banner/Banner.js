import React, { useEffect, useState } from "react";
import Doctor from "../../../../Assets/doctor-picture.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate  } from "react-router-dom";
import "../Banner/Banner.css";
import contentConfig from "../../../../Config/contentConfig"; 
import { useLanguage } from "../../../../Config/LanguageContext";
// import images from "../../../../Config/images.json"; 

function Banner() {
  const navigate = useNavigate();
  const [goUp, setGoUp] = useState(false);

  const { language } = useLanguage(); // Lấy ngôn ngữ hiện tại từ context


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookAppointmentClick = () => {
    navigate("/appointment");
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="section-container">
      <div className="hero-section">
        <div className="text-section">
          <p className="text-headline">{contentConfig.home_page.title_1[language]}</p>
          <h2 className="text-title">
          {contentConfig.home_page.title_2[language]}
          </h2>
          <p className="text-descritpion">
          {contentConfig.home_page.title_3[language]}
          </p>
          <button
            className="text-appointment-btn"
            type="button"
            onClick={handleBookAppointmentClick}
          >
            <FontAwesomeIcon icon={faCalendarCheck} /> {contentConfig.home_page.bookAppointmentBtn[language]}
          </button>
          {/* Map through the detail array */}
          <div className="text-stats">
            {contentConfig.home_page.detail.map((item, index) => (
              <div key={index} className="text-stats-container">
                <p>{item.overview[language]}</p>
                <p>{item.description[language]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-image-section">
          <img className="hero-image1" src={Doctor} alt="Doctor" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Banner;
