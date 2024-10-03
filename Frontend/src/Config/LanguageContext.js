import React, { createContext, useContext, useState } from 'react';

// Tạo ngữ cảnh
const LanguageContext = createContext();

// Cung cấp ngữ cảnh
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Mặc định là tiếng Anh

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'vi' : 'en')); // Chuyển đổi giữa 'en' và 'vi'
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook để sử dụng ngữ cảnh
export const useLanguage = () => useContext(LanguageContext);
