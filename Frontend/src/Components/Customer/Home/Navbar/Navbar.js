import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { Link } from "react-router-dom";
import contentConfig from "../../../../Config/contentConfig"; 
import { useLanguage } from '../../../../Config/LanguageContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [nav, setNav] = useState(false);
  const [isButtonDisabled] = useState(false);

  const { language, toggleLanguage } = useLanguage();
  const navigate = useNavigate();

  const openNav = () => {
    setNav(!nav);
  };

  const handleChatBtnClick = () => {
    navigate('/login');
  };

  return (
    <div className="navbar-section">
      <h1 className="navbar-title">
        <Link to="/">
          {contentConfig.logo[language]} <span className="navbar-sign">+</span>
        </Link>
      </h1>

      {/* Desktop */}
      <ul className="navbar-items">
        <li><Link to="/" className="navbar-links">{contentConfig.home[language]}</Link></li>
        <li><a href="#services" className="navbar-links">{contentConfig.services[language]}</a></li>
        <li><a href="#about" className="navbar-links">{contentConfig.about[language]}</a></li>
        <li><a href="#reviews" className="navbar-links">{contentConfig.review[language]}</a></li>
        <li><a href="#doctors" className="navbar-links">{contentConfig.doctor[language]}</a></li>
      </ul>

      <div className="navbar-buttons">
        <button className="navbar-btn" type="button" disabled={isButtonDisabled} onClick={handleChatBtnClick}>
          {contentConfig.login[language]}
        </button>
        <button className="navbar-btn" type="button" onClick={toggleLanguage}>VI | EN</button>
      </div>

      {/* Mobile */}
      <div className={`mobile-navbar ${nav ? "open-nav" : ""}`}>
        <div onClick={openNav} className="mobile-navbar-close">
          <FontAwesomeIcon icon={faXmark} className="hamb-icon" />
        </div>

        <ul className="mobile-navbar-links">
          <li><Link onClick={openNav} to="/">{contentConfig.home[language]}</Link></li>
          <li><a onClick={openNav} href="#services">{contentConfig.services[language]}</a></li>
          <li><a onClick={openNav} href="#about">{contentConfig.about[language]}</a></li>
          <li><a onClick={openNav} href="#reviews">{contentConfig.review[language]}</a></li>
          <li><a onClick={openNav} href="#doctors">{contentConfig.doctor[language]}</a></li>
        </ul>

        <div className="mobile-navbar-buttons">
          <button className="mobile-navbar-btn" type="button" disabled={isButtonDisabled} onClick={handleChatBtnClick}>
            {contentConfig.login[language]}
          </button>
          <button className="mobile-navbar-btn" type="button" onClick={toggleLanguage}>VI | EN</button>
        </div>
      </div>

      {/* Hamburger Icon */}
      <div className="mobile-nav">
        <FontAwesomeIcon icon={faBars} onClick={openNav} className="hamb-icon" />
      </div>
    </div>
  );
}

export default Navbar;