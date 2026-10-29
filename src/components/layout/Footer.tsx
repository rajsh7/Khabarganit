import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#1C1208] text-gray-300 mt-12">
      {/* Ad Banner before footer */}
      <div className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-center">
          <div className="ad-placeholder" style={{ width: 728, height: 90 }}>
            <span className="text-gray-500">विज्ञापन · 728×90 (Footer Banner)</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#1C1208] px-4 py-1.5 rounded-xl shadow-md border border-white/10 group hover:border-[#E84A0C]/60 transition-all duration-200 mb-4 h-[65px]"
              title="ख़बर गणित — Homepage"
            >
              <div className="inline-flex items-center gap-3">
                <Image
                  src="/logo-emblem.png"
                  alt="ख़बर गणित"
                  width={52}
                  height={52}
                  className="h-[48px] w-auto object-contain flex-shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <div className="flex items-baseline gap-1.5 leading-none">
                    <span className="text-white text-xl sm:text-2xl font-sarala font-extrabold tracking-tight">
                      खबर
                    </span>
                    <span className="text-[#FE5C01] text-xl sm:text-2xl font-sarala font-extrabold tracking-tight">
                      गणित
                    </span>
                  </div>
                  <div className="text-[10.5px] sm:text-[11.5px] font-sarala text-[#FE5C01] font-semibold tracking-wide leading-tight mt-1 whitespace-nowrap">
                    हर ख़बर की कहानी, आँकड़ों की ज़ुबानी
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-sm font-sarala text-gray-400 leading-relaxed mb-5">
              ख़बर गणित भारत का प्रमुख डेटा-संचालित हिंदी समाचार पोर्टल है। हम हर ख़बर को आँकड़ों और तथ्यों के साथ निष्पक्षता से प्रस्तुत करते हैं।
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#261B10] hover:bg-[#1877F2]/20 border border-white/10 hover:border-[#1877F2] rounded-lg p-1.5 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                title="Facebook"
              >
                <Image src="/social/facebook.png" alt="Facebook" width={24} height={24} className="w-full h-full object-contain" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#261B10] hover:bg-white/10 border border-white/10 hover:border-white rounded-lg p-1.5 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                title="Twitter / X"
              >
                <Image src="/social/twitter.png" alt="Twitter" width={24} height={24} className="w-full h-full object-contain" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#261B10] hover:bg-[#E1306C]/20 border border-white/10 hover:border-[#E1306C] rounded-lg p-1.5 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                title="Instagram"
              >
                <Image src="/social/instagram.png" alt="Instagram" width={24} height={24} className="w-full h-full object-contain" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#261B10] hover:bg-[#FF0000]/20 border border-white/10 hover:border-[#FF0000] rounded-lg p-1.5 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
                title="YouTube"
              >
                <Image src="/social/youtube.png" alt="YouTube" width={24} height={24} className="w-full h-full object-contain" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-jost font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#E84A0C]">
              Categories / विभाग
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm font-sarala text-gray-400 hover:text-[#E84A0C] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#E84A0C]">›</span> {cat.englishName} ({cat.name})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-jost font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#E84A0C]">
              त्वरित लिंक
            </h3>
            <ul className="space-y-2">
              {[
                { label: "हमारे बारे में", href: "/about" },
                { label: "संपर्क करें", href: "/contact" },
                { label: "विज्ञापन दें", href: "/advertise" },
                { label: "गोपनीयता नीति", href: "/privacy" },
                { label: "उपयोग की शर्तें", href: "/terms" },
                { label: "करियर", href: "/careers" },
                { label: "RSS फ़ीड", href: "/rss.xml" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-sarala text-gray-400 hover:text-[#E84A0C] transition-colors flex items-center gap-2"
                  >
                    <span className="text-[#E84A0C]">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-jost font-bold text-sm uppercase tracking-wider mb-4 pb-2 border-b border-[#E84A0C]">
              न्यूज़लेटर
            </h3>
            <p className="text-sm font-sarala text-gray-400 mb-4">
              रोज़ सुबह की ताज़ा खबरें सीधे आपके इनबॉक्स में पाएं।
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="आपका ईमेल पता"
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm font-sarala text-white placeholder-gray-500 focus:outline-none focus:border-[#E84A0C]"
              />
              <button
                type="submit"
                className="bg-[#E84A0C] hover:bg-[#C13A08] text-white font-jost font-semibold text-sm py-2 rounded transition-colors"
              >
                सब्सक्राइब करें
              </button>
            </form>
            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-2 font-jost">हमारा ऐप डाउनलोड करें:</p>
              <div className="flex gap-2">
                <a href="#" className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded px-3 py-1.5 text-xs font-jost text-white flex items-center gap-1 transition-colors">
                  🍎 App Store
                </a>
                <a href="#" className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded px-3 py-1.5 text-xs font-jost text-white flex items-center gap-1 transition-colors">
                  🤖 Play Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-sarala text-gray-500">
            © 2026 खबरगणित। सर्वाधिकार सुरक्षित।
          </p>
          <p className="text-xs font-sarala text-gray-500">
            <span className="text-[#E84A0C]">❤️</span> के साथ भारत में बनाया गया
          </p>
        </div>
      </div>
    </footer>
  );
}
