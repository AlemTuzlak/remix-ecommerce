import type { MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "~/library/LanguageSwitcher";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { t, i18n } = useTranslation();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>{t("hi")}</h1>
      <p>{t("welcome")}</p>
      <LanguageSwitcher />
    </div>
  );
}
