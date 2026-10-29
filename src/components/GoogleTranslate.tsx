"use client";

import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

export default function GoogleTranslate() {
  const [selectedLang, setSelectedLang] = useState<string>("en");

  useEffect(() => {
    // Check if script is already present
    const existingScript = document.getElementById("google-translate-script");

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "hi,en,bn,te,ta,mr,gu,kn,ml,pa,ur,es,fr,de,ar,ja,zh-CN,ru",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    if (!existingScript) {
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

    // Read existing googtrans cookie if present
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (match && match[1]) {
      const code = match[1].split("/").pop();
      if (code) setSelectedLang(code);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setSelectedLang(langCode);

    // Set cookie for Google Translate
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain};`;

    // Also try to select the hidden/inline google combo if available
    const select = document.querySelector<HTMLSelectElement>(
      "#google_translate_element select.goog-te-combo"
    );
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    } else {
      // Reload page to apply cookie translation
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-1.5 select-none text-[10px] sm:text-[11px] font-serif font-bold uppercase tracking-wider text-stone-900 whitespace-nowrap">
      <Globe size={13} className="text-[#C13A08] shrink-0" />
      <span className="hidden sm:inline text-stone-600">TRANSLATE:</span>

      {/* Google Translate Inline Container */}
      <div id="google_translate_element" className="inline-block" />

      {/* Broad Language Fallback Selector */}
      <select
        value={selectedLang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-white text-black border border-black px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-serif font-bold tracking-wider cursor-pointer hover:bg-stone-50 transition-colors uppercase outline-none focus:ring-1 focus:ring-black"
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
