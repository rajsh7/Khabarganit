"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

interface GoogleTranslateProps {
  onLanguageChange?: (lang: string) => void;
}

export default function GoogleTranslate({ onLanguageChange }: GoogleTranslateProps) {
  const [selectedLang, setSelectedLang] = useState<string>("en");

  useEffect(() => {
    // Read existing cookie if present
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (match && match[1]) {
      const code = match[1].split("/").pop();
      if (code) {
        setSelectedLang(code);
        if (onLanguageChange) onLanguageChange(code);
      }
    }

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "hi,en,bn,te,ta,mr,gu,kn,ml,pa,ur,es,fr,de,ar,ja,zh-CN,ru",
            autoDisplay: false,
          },
          "google_translate_hidden_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, [onLanguageChange]);

  const changeLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }

    // Set cookie for Google Translate (both root and domain)
    const hostname = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname};`;
    document.cookie = `googtrans=/auto/${langCode}; path=/;`;
    document.cookie = `googtrans=/auto/${langCode}; path=/; domain=${hostname};`;

    // Trigger Google Translate internal combo
    const select = document.querySelector<HTMLSelectElement>(
      "#google_translate_hidden_element select.goog-te-combo, select.goog-te-combo"
    );
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-1.5 select-none text-[10px] sm:text-[11px] font-serif font-bold uppercase tracking-wider text-stone-900 whitespace-nowrap">
      <Globe size={13} className="text-[#C13A08] shrink-0" />
      <span className="hidden sm:inline text-stone-700">TRANSLATE:</span>

      {/* Strictly hidden container for Google Translate internal engine - never visible */}
      <div
        id="google_translate_hidden_element"
        style={{ display: "none", width: 0, height: 0, overflow: "hidden" }}
        className="hidden"
      />

      {/* Exactly ONE clean broadsheet dropdown */}
      <select
        value={selectedLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white text-black border border-black px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-serif font-bold tracking-wider cursor-pointer hover:bg-stone-50 transition-colors uppercase outline-none focus:ring-1 focus:ring-black"
        title="Select Language / भाषा चुनें"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी (Hindi)</option>
        <option value="bn">বাংলা (Bengali)</option>
        <option value="te">తెలుగు (Telugu)</option>
        <option value="ta">தமிழ் (Tamil)</option>
        <option value="mr">मराठी (Marathi)</option>
        <option value="gu">ગુજરાતી (Gujarati)</option>
        <option value="kn">ಕನ್ನಡ (Kannada)</option>
        <option value="ml">മലയാളം (Malayalam)</option>
        <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
        <option value="ur">اردو (Urdu)</option>
        <option value="es">Español (Spanish)</option>
        <option value="fr">Français (French)</option>
        <option value="de">Deutsch (German)</option>
        <option value="ar">العربية (Arabic)</option>
        <option value="ru">Русский (Russian)</option>
        <option value="ja">日本語 (Japanese)</option>
        <option value="zh-CN">中文 (Chinese)</option>
      </select>
    </div>
  );
}
