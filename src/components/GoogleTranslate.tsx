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
      if (code && code !== "en") {
        setSelectedLang(code);
        if (onLanguageChange) onLanguageChange(code);
      } else {
        setSelectedLang("en");
        if (onLanguageChange) onLanguageChange("en");
      }
    }

    // Ensure googleTranslateElementInit is attached
    if (typeof window !== "undefined") {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
          try {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages:
                  "hi,en,bn,te,ta,mr,gu,kn,ml,pa,ur,es,fr,de,ar,ru,ja,zh-CN",
                autoDisplay: false,
              },
              "google_translate_hidden_element"
            );
          } catch (e) {
            console.error("Google Translate element init error:", e);
          }
        }
      };

      // Check if already loaded
      if (window.google && window.google.translate) {
        window.googleTranslateElementInit();
      }
    }
  }, [onLanguageChange]);

  const changeLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }

    if (typeof window === "undefined") return;

    const domain = window.location.hostname;
    const rootDomain = domain.replace(/^www\./, "");

    if (langCode === "en") {
      // Clear cookies to restore original English text
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
      document.cookie = "googtrans=/en/en; path=/;";
      document.cookie = `googtrans=/en/en; path=/; domain=${domain};`;
      document.cookie = `googtrans=/en/en; path=/; domain=.${rootDomain};`;
    } else {
      // Set translation cookie (/en/targetLang)
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=${domain};`;
      document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${rootDomain};`;
    }

    // Try triggering the Google Translate combo directly if present
    const select = document.querySelector<HTMLSelectElement>(
      "#google_translate_hidden_element select.goog-te-combo, select.goog-te-combo"
    );
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Smooth reload to guarantee 100% translation of all broadsheet headlines and articles
    setTimeout(() => {
      window.location.reload();
    }, 120);
  };

  return (
    <div className="notranslate flex items-center gap-1.5 select-none text-[10px] sm:text-[11px] font-serif font-bold uppercase tracking-wider text-stone-900 whitespace-nowrap">
      <Globe size={13} className="text-[#C13A08] shrink-0" />
      <span className="hidden sm:inline text-stone-700">TRANSLATE:</span>

      {/* Hidden container where Google mounts its combo off-screen without display:none breaking */}
      <div
        id="google_translate_hidden_element"
        style={{
          position: "absolute",
          top: "-9999px",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
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
