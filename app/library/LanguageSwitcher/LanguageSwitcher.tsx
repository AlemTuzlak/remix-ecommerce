import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "~/localization/resource";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  return (
    <>
      {supportedLanguages.map((language) => (
        <Link
          key={language}
          to={`/${language}`}
          onClick={() => i18n.changeLanguage(language)}
        >
          {language}
        </Link>
      ))}
    </>
  );
};

export { LanguageSwitcher };
