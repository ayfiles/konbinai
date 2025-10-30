import React, { createContext, useContext, useState } from "react";

export type LangType = 'EN' | 'DE';
export const LanguageContext = createContext<{
  currentLang: LangType;
  setCurrentLang: (lang: LangType) => void;
}>({ currentLang: 'EN', setCurrentLang: () => {} });

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLang, setCurrentLang] = useState<LangType>('EN');
  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  return useContext(LanguageContext);
}
