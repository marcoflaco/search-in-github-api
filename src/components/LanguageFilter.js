import { useEffect, useState } from 'react';

export function LanguageFilter({
  repositories,
  selectedLanguage,
  languageChange,
}) {
  const [languages, setLanguages] = useState({});

  useEffect(() => {
    setLanguages(
      repositories.reduce((langObject, { language }) => {
        if (!language) {
          return langObject;
        }

        langObject[language] =
          (langObject[language] && langObject[language] + 1) || 1;

        return langObject;
      }, {})
    );
  }, [repositories]);

  const handleLanguageChange = (lang) => {
    languageChange(lang === selectedLanguage ? null : lang);
  };

  return (
    <>
      <h3>Language Distribution</h3>
      <div className="list-group">
        {Object.keys(languages).map((language) => (
          <button
            key={language}
            type="button"
            className={`list-group-item list-group-item-action ${
              language === selectedLanguage ? 'active' : ''
            }`}
            onClick={() => handleLanguageChange(language)}
          >
            {language}: {languages[language]}
          </button>
        ))}
      </div>
    </>
  );
}
