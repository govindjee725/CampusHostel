import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      className="px-3 py-2 border rounded-full text-sm hover:bg-gray-100"
      defaultValue={i18n.language}
    >
      <option value="en">EN</option>
      <option value="hi">हिंदी</option>
    </select>
  );
};

export default LanguageSelector;
