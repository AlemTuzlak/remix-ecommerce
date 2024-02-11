import english from "../../resources/locales/en/common.json";
import bosnian from "../../resources/locales/bs/common.json";

const languages = ["en", "bs"] as const;
export const supportedLanguages = [...languages];
export type Language = (typeof languages)[number];

export type Resource = {
  common: typeof english;
};

export const resources: Record<Language, Resource> = {
  en: {
    common: english,
  },
  bs: {
    common: bosnian,
  },
};
