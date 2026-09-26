'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import './LanguageSwitcher.css';

interface Language {
  code: string;
  name: string;   // English label
  native: string; // Script in that language
  flag: string;
}

/* ─────────────────────────────────────────────────
   All Google Translate supported language codes.
   Popular ones first, then alphabetical.
───────────────────────────────────────────────── */
const POPULAR: Language[] = [
  { code: 'en',    name: 'English',              native: 'English',          flag: '🌐' },
  { code: 'hi',    name: 'Hindi',                native: 'हिंदी',            flag: '🇮🇳' },
  { code: 'ta',    name: 'Tamil',                native: 'தமிழ்',            flag: '🇮🇳' },
  { code: 'te',    name: 'Telugu',               native: 'తెలుగు',           flag: '🇮🇳' },
  { code: 'kn',    name: 'Kannada',              native: 'ಕನ್ನಡ',            flag: '🇮🇳' },
  { code: 'ml',    name: 'Malayalam',            native: 'മലയാളം',           flag: '🇮🇳' },
  { code: 'mr',    name: 'Marathi',              native: 'मराठी',            flag: '🇮🇳' },
  { code: 'bn',    name: 'Bengali',              native: 'বাংলা',            flag: '🇧🇩' },
  { code: 'gu',    name: 'Gujarati',             native: 'ગુજરાતી',          flag: '🇮🇳' },
  { code: 'pa',    name: 'Punjabi',              native: 'ਪੰਜਾਬੀ',           flag: '🇮🇳' },
  { code: 'ar',    name: 'Arabic',               native: 'العربية',          flag: '🇸🇦' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', native: '中文(简体)',        flag: '🇨🇳' },
  { code: 'zh-TW', name: 'Chinese (Traditional)',native: '中文(繁體)',        flag: '🇹🇼' },
  { code: 'ja',    name: 'Japanese',             native: '日本語',            flag: '🇯🇵' },
  { code: 'ko',    name: 'Korean',               native: '한국어',            flag: '🇰🇷' },
  { code: 'fr',    name: 'French',               native: 'Français',         flag: '🇫🇷' },
  { code: 'de',    name: 'German',               native: 'Deutsch',          flag: '🇩🇪' },
  { code: 'es',    name: 'Spanish',              native: 'Español',          flag: '🇪🇸' },
  { code: 'pt',    name: 'Portuguese',           native: 'Português',        flag: '🇵🇹' },
  { code: 'ru',    name: 'Russian',              native: 'Русский',          flag: '🇷🇺' },
  { code: 'ur',    name: 'Urdu',                 native: 'اردو',             flag: '🇵🇰' },
];

const ALL_LANGUAGES: Language[] = [
  { code: 'af',    name: 'Afrikaans',            native: 'Afrikaans',        flag: '🇿🇦' },
  { code: 'sq',    name: 'Albanian',             native: 'Shqip',            flag: '🇦🇱' },
  { code: 'am',    name: 'Amharic',              native: 'አማርኛ',             flag: '🇪🇹' },
  { code: 'hy',    name: 'Armenian',             native: 'Հայերեն',          flag: '🇦🇲' },
  { code: 'az',    name: 'Azerbaijani',          native: 'Azərbaycan',       flag: '🇦🇿' },
  { code: 'eu',    name: 'Basque',               native: 'Euskara',          flag: '🏴' },
  { code: 'be',    name: 'Belarusian',           native: 'Беларуская',       flag: '🇧🇾' },
  { code: 'bs',    name: 'Bosnian',              native: 'Bosanski',         flag: '🇧🇦' },
  { code: 'bg',    name: 'Bulgarian',            native: 'Български',        flag: '🇧🇬' },
  { code: 'ca',    name: 'Catalan',              native: 'Català',           flag: '🏴' },
  { code: 'ceb',   name: 'Cebuano',              native: 'Cebuano',          flag: '🇵🇭' },
  { code: 'ny',    name: 'Chichewa',             native: 'Chichewa',         flag: '🇲🇼' },
  { code: 'co',    name: 'Corsican',             native: 'Corsu',            flag: '🇫🇷' },
  { code: 'hr',    name: 'Croatian',             native: 'Hrvatski',         flag: '🇭🇷' },
  { code: 'cs',    name: 'Czech',                native: 'Čeština',          flag: '🇨🇿' },
  { code: 'da',    name: 'Danish',               native: 'Dansk',            flag: '🇩🇰' },
  { code: 'nl',    name: 'Dutch',                native: 'Nederlands',       flag: '🇳🇱' },
  { code: 'eo',    name: 'Esperanto',            native: 'Esperanto',        flag: '🌐' },
  { code: 'et',    name: 'Estonian',             native: 'Eesti',            flag: '🇪🇪' },
  { code: 'tl',    name: 'Filipino',             native: 'Filipino',         flag: '🇵🇭' },
  { code: 'fi',    name: 'Finnish',              native: 'Suomi',            flag: '🇫🇮' },
  { code: 'fy',    name: 'Frisian',              native: 'Frysk',            flag: '🇳🇱' },
  { code: 'gl',    name: 'Galician',             native: 'Galego',           flag: '🇪🇸' },
  { code: 'ka',    name: 'Georgian',             native: 'ქართული',          flag: '🇬🇪' },
  { code: 'el',    name: 'Greek',                native: 'Ελληνικά',         flag: '🇬🇷' },
  { code: 'ht',    name: 'Haitian Creole',       native: 'Kreyòl Ayisyen',   flag: '🇭🇹' },
  { code: 'ha',    name: 'Hausa',                native: 'Hausa',            flag: '🇳🇬' },
  { code: 'haw',   name: 'Hawaiian',             native: 'ʻŌlelo Hawaiʻi',  flag: '🏝️' },
  { code: 'iw',    name: 'Hebrew',               native: 'עברית',            flag: '🇮🇱' },
  { code: 'hmn',   name: 'Hmong',                native: 'Hmoob',            flag: '🌐' },
  { code: 'hu',    name: 'Hungarian',            native: 'Magyar',           flag: '🇭🇺' },
  { code: 'is',    name: 'Icelandic',            native: 'Íslenska',         flag: '🇮🇸' },
  { code: 'ig',    name: 'Igbo',                 native: 'Igbo',             flag: '🇳🇬' },
  { code: 'id',    name: 'Indonesian',           native: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ga',    name: 'Irish',                native: 'Gaeilge',          flag: '🇮🇪' },
  { code: 'it',    name: 'Italian',              native: 'Italiano',         flag: '🇮🇹' },
  { code: 'jw',    name: 'Javanese',             native: 'Basa Jawa',        flag: '🇮🇩' },
  { code: 'kk',    name: 'Kazakh',               native: 'Қазақша',          flag: '🇰🇿' },
  { code: 'km',    name: 'Khmer',                native: 'ខ្មែរ',             flag: '🇰🇭' },
  { code: 'rw',    name: 'Kinyarwanda',          native: 'Kinyarwanda',      flag: '🇷🇼' },
  { code: 'ku',    name: 'Kurdish (Kurmanji)',    native: 'Kurdî',            flag: '🌐' },
  { code: 'ky',    name: 'Kyrgyz',               native: 'Кыргызча',         flag: '🇰🇬' },
  { code: 'lo',    name: 'Lao',                  native: 'ລາວ',              flag: '🇱🇦' },
  { code: 'la',    name: 'Latin',                native: 'Latina',           flag: '🌐' },
  { code: 'lv',    name: 'Latvian',              native: 'Latviešu',         flag: '🇱🇻' },
  { code: 'lt',    name: 'Lithuanian',           native: 'Lietuvių',         flag: '🇱🇹' },
  { code: 'lb',    name: 'Luxembourgish',        native: 'Lëtzebuergesch',   flag: '🇱🇺' },
  { code: 'mk',    name: 'Macedonian',           native: 'Македонски',       flag: '🇲🇰' },
  { code: 'mg',    name: 'Malagasy',             native: 'Malagasy',         flag: '🇲🇬' },
  { code: 'ms',    name: 'Malay',                native: 'Bahasa Melayu',    flag: '🇲🇾' },
  { code: 'mt',    name: 'Maltese',              native: 'Malti',            flag: '🇲🇹' },
  { code: 'mi',    name: 'Maori',                native: 'Māori',            flag: '🇳🇿' },
  { code: 'mn',    name: 'Mongolian',            native: 'Монгол',           flag: '🇲🇳' },
  { code: 'my',    name: 'Myanmar (Burmese)',    native: 'မြန်မာဘာသာ',       flag: '🇲🇲' },
  { code: 'ne',    name: 'Nepali',               native: 'नेपाली',           flag: '🇳🇵' },
  { code: 'no',    name: 'Norwegian',            native: 'Norsk',            flag: '🇳🇴' },
  { code: 'or',    name: 'Odia (Oriya)',         native: 'ଓଡ଼ିଆ',            flag: '🇮🇳' },
  { code: 'ps',    name: 'Pashto',               native: 'پښتو',             flag: '🇦🇫' },
  { code: 'fa',    name: 'Persian',              native: 'فارسی',            flag: '🇮🇷' },
  { code: 'pl',    name: 'Polish',               native: 'Polski',           flag: '🇵🇱' },
  { code: 'ro',    name: 'Romanian',             native: 'Română',           flag: '🇷🇴' },
  { code: 'sm',    name: 'Samoan',               native: 'Samoan',           flag: '🇼🇸' },
  { code: 'gd',    name: 'Scots Gaelic',         native: 'Gàidhlig',         flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { code: 'sr',    name: 'Serbian',              native: 'Српски',           flag: '🇷🇸' },
  { code: 'st',    name: 'Sesotho',              native: 'Sesotho',          flag: '🇱🇸' },
  { code: 'sn',    name: 'Shona',                native: 'Shona',            flag: '🇿🇼' },
  { code: 'sd',    name: 'Sindhi',               native: 'سنڌي',             flag: '🇵🇰' },
  { code: 'si',    name: 'Sinhala',              native: 'සිංහල',            flag: '🇱🇰' },
  { code: 'sk',    name: 'Slovak',               native: 'Slovenčina',       flag: '🇸🇰' },
  { code: 'sl',    name: 'Slovenian',            native: 'Slovenščina',      flag: '🇸🇮' },
  { code: 'so',    name: 'Somali',               native: 'Soomaali',         flag: '🇸🇴' },
  { code: 'su',    name: 'Sundanese',            native: 'Basa Sunda',       flag: '🇮🇩' },
  { code: 'sw',    name: 'Swahili',              native: 'Kiswahili',        flag: '🇰🇪' },
  { code: 'sv',    name: 'Swedish',              native: 'Svenska',          flag: '🇸🇪' },
  { code: 'tg',    name: 'Tajik',                native: 'Тоҷикӣ',           flag: '🇹🇯' },
  { code: 'tt',    name: 'Tatar',                native: 'Татарча',          flag: '🇷🇺' },
  { code: 'th',    name: 'Thai',                 native: 'ภาษาไทย',          flag: '🇹🇭' },
  { code: 'tr',    name: 'Turkish',              native: 'Türkçe',           flag: '🇹🇷' },
  { code: 'tk',    name: 'Turkmen',              native: 'Türkmen',          flag: '🇹🇲' },
  { code: 'uk',    name: 'Ukrainian',            native: 'Українська',       flag: '🇺🇦' },
  { code: 'ug',    name: 'Uyghur',               native: 'ئۇيغۇرچە',        flag: '🌐' },
  { code: 'uz',    name: 'Uzbek',                native: "O'zbek",           flag: '🇺🇿' },
  { code: 'vi',    name: 'Vietnamese',           native: 'Tiếng Việt',       flag: '🇻🇳' },
  { code: 'cy',    name: 'Welsh',                native: 'Cymraeg',          flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
  { code: 'xh',    name: 'Xhosa',                native: 'isiXhosa',         flag: '🇿🇦' },
  { code: 'yi',    name: 'Yiddish',              native: 'ייִדיש',           flag: '🌐' },
  { code: 'yo',    name: 'Yoruba',               native: 'Yorùbá',           flag: '🇳🇬' },
  { code: 'zu',    name: 'Zulu',                 native: 'isiZulu',          flag: '🇿🇦' },
];

const LS_KEY = 'ske-lang-code';
const LS_LABEL = 'ske-lang-label';

/* ─── Trigger Google Translate ─── */
function applyGoogleTranslate(langCode: string, retries = 0): void {
  const MAX = 20;

  if (langCode === 'en') {
    // Clearing the googtrans cookie + reloading is the ONLY reliable way
    // to fully restore original English content. GT's select.value='' is unreliable.
    const epoch = new Date(0).toUTCString();
    const host = window.location.hostname;
    // Clear on all variant paths/domains GT may have set
    const variants = [
      `googtrans=; expires=${epoch}; path=/`,
      `googtrans=; expires=${epoch}; path=/; domain=${host}`,
      `googtrans=; expires=${epoch}; path=/; domain=.${host}`,
    ];
    variants.forEach((v) => { document.cookie = v; });
    window.location.reload();
    return;
  }

  const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;

  if (!select) {
    if (retries < MAX) setTimeout(() => applyGoogleTranslate(langCode, retries + 1), 400);
    return;
  }

  select.value = langCode;
  select.dispatchEvent(new Event('change'));
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Language>(POPULAR[0]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  /* Restore persisted selection on mount */
  useEffect(() => {
    try {
      const code  = localStorage.getItem(LS_KEY);
      const label = localStorage.getItem(LS_LABEL);
      if (code && label) {
        const found = [...POPULAR, ...ALL_LANGUAGES].find((l) => l.code === code);
        setSelected(found ?? { code, name: label, native: label, flag: '🌐' });
      }
    } catch { /* SSR guard */ }
  }, []);

  /* Focus search when dropdown opens */
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
    else setSearch('');
  }, [open]);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleSelect = useCallback((lang: Language) => {
    setSelected(lang);
    setOpen(false);
    localStorage.setItem(LS_KEY, lang.code);
    localStorage.setItem(LS_LABEL, lang.name);
    applyGoogleTranslate(lang.code);
  }, []);

  /* Filter logic */
  const q = search.toLowerCase();
  const filterFn = (l: Language) =>
    !q ||
    l.name.toLowerCase().includes(q) ||
    l.native.toLowerCase().includes(q) ||
    l.code.toLowerCase().includes(q);

  const filteredPopular = POPULAR.filter(filterFn);
  const filteredAll     = ALL_LANGUAGES.filter(filterFn);
  const hasResults      = filteredPopular.length > 0 || filteredAll.length > 0;

  return (
    /* translate="no" prevents GT from mangling the language names themselves */
    <div className={`lang-sw ${open ? 'lang-sw--open' : ''}`} ref={wrapRef} translate="no">

      {/* ── Trigger pill ── */}
      <button
        id="language-switcher-btn"
        className="lang-sw__trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <span className="lang-sw__flag" aria-hidden="true">{selected.flag}</span>
        <span className="lang-sw__label">{selected.native}</span>
        <svg
          className={`lang-sw__chevron ${open ? 'rotated' : ''}`}
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          aria-hidden="true"
        >
          <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Dropdown panel ── */}
      <div className="lang-sw__panel" role="listbox" aria-label="Choose language">

        {/* Search */}
        <div className="lang-sw__search-wrap">
          <svg className="lang-sw__search-icon" width="14" height="14" viewBox="0 0 16 16"
               fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11.5 11.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" />
          </svg>
          <input
            ref={searchRef}
            id="lang-search"
            className="lang-sw__search"
            type="text"
            placeholder="Search languages…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
            spellCheck={false}
          />
          {search && (
            <button className="lang-sw__search-clear" onClick={() => setSearch('')}
                    aria-label="Clear search">✕</button>
          )}
        </div>

        {/* Scrollable list */}
        <div className="lang-sw__list" role="group">
          {filteredPopular.length > 0 && (
            <>
              <div className="lang-sw__section-head">⭐ Popular</div>
              {filteredPopular.map((lang) => (
                <LangOption key={lang.code} lang={lang} active={selected.code === lang.code}
                            onSelect={handleSelect} />
              ))}
            </>
          )}

          {filteredAll.length > 0 && (
            <>
              <div className="lang-sw__section-head lang-sw__section-head--more">
                All Languages
              </div>
              {filteredAll.map((lang) => (
                <LangOption key={lang.code} lang={lang} active={selected.code === lang.code}
                            onSelect={handleSelect} />
              ))}
            </>
          )}

          {!hasResults && (
            <div className="lang-sw__empty">No languages match &ldquo;{search}&rdquo;</div>
          )}
        </div>

        {/* Footer hint */}
        <div className="lang-sw__footer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  fill="#4285F4"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10" fill="#EA4335"/>
            <path d="M12 12v8c4.418 0 8-3.582 8-8h-8z" fill="#FBBC04"/>
            <path d="M12 4c2.21 0 4.21.895 5.657 2.343L15 9H9l-2.657-2.657C7.79 4.895 9.79 4 12 4z"
                  fill="#34A853"/>
          </svg>
          Powered by Google Translate · {POPULAR.length + ALL_LANGUAGES.length} languages
        </div>
      </div>
    </div>
  );
}

/* ─── Single option row ─── */
function LangOption({
  lang, active, onSelect,
}: {
  lang: Language;
  active: boolean;
  onSelect: (l: Language) => void;
}) {
  return (
    <button
      role="option"
      aria-selected={active}
      id={`lang-opt-${lang.code}`}
      className={`lang-sw__option ${active ? 'active' : ''}`}
      onClick={() => onSelect(lang)}
    >
      <span className="lang-sw__opt-flag" aria-hidden="true">{lang.flag}</span>
      <span className="lang-sw__opt-text">
        <span className="lang-sw__opt-native">{lang.native}</span>
        <span className="lang-sw__opt-en">{lang.name}</span>
      </span>
      {active && (
        <svg className="lang-sw__check" width="14" height="14" viewBox="0 0 14 14" fill="none"
             aria-hidden="true">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
