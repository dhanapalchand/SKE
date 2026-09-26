'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Locale = 'en' | 'ta' | 'hi';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  messages: Record<string, unknown>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const messageCache: Partial<Record<Locale, Record<string, unknown>>> = {};

async function loadMessages(locale: Locale): Promise<Record<string, unknown>> {
  if (messageCache[locale]) return messageCache[locale]!;
  const msgs = (await import(`@/messages/${locale}.json`)).default;
  messageCache[locale] = msgs;
  return msgs;
}

function getNestedValue(obj: Record<string, unknown>, key: string): string {
  const parts = key.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof current === 'string' ? current : key;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [messages, setMessages] = useState<Record<string, unknown>>({});

  useEffect(() => {
    const saved = (document.cookie
      .split('; ')
      .find((row) => row.startsWith('ske-locale='))
      ?.split('=')[1]) as Locale | undefined;
    const initial: Locale = (saved && ['en', 'ta', 'hi'].includes(saved)) ? saved : 'en';
    setLocaleState(initial);
    loadMessages(initial).then(setMessages);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `ske-locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    loadMessages(newLocale).then(setMessages);
  };

  const t = (key: string): string => {
    if (!messages || Object.keys(messages).length === 0) return key;
    return getNestedValue(messages, key);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
