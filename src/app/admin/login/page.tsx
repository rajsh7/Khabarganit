"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("newsroom@khabarganit.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to intended admin destination
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError(data.error || "लॉगिन असफल रहा। कृपया क्रेडेंशियल जांचें।");
      }
    } catch {
      setError("सर्वर से कनेक्ट करने में त्रुटि। कृपया पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Background Newspaper Grid Texture */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Emblem & Branding */}
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-14 h-14 bg-[#1C1208] border-2 border-black flex items-center justify-center text-white font-serif font-black text-2xl shadow-md">
            खग
          </div>
        </div>

        <h1 className="font-playfair font-black text-3xl sm:text-4xl text-black tracking-tight uppercase">
          KhabarGanit
        </h1>
        <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#C13A08] font-bold mt-1">
          National Newsroom · Protected Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white border-2 border-black p-8 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-2 pb-4 mb-6 border-b-2 border-black">
            <ShieldCheck size={20} className="text-[#C13A08]" />
            <span className="font-playfair font-bold text-lg text-black uppercase tracking-wider">
              Newsroom Sign In
            </span>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-300 rounded text-xs font-serif text-red-800 flex items-start gap-2">
              <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                Newsroom ID / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="newsroom@khabarganit.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 text-stone-900 text-sm font-sans focus:outline-none focus:border-black focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-serif font-bold uppercase tracking-wider text-stone-800 mb-1.5">
                Editorial Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-stone-50 border border-stone-300 text-stone-900 text-sm font-sans focus:outline-none focus:border-black focus:bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black hover:bg-[#C13A08] text-white font-serif font-bold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 mt-6"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Unlock Editorial Desk</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-5 border-t border-stone-200 text-center">
            <p className="text-[11px] font-serif text-stone-500 italic">
              Restricted to authorized KhabarGanit editorial desk staff. Unauthorized access attempts are monitored and logged.
            </p>
            <div className="mt-3">
              <Link
                href="/"
                className="text-[11px] font-serif font-bold uppercase tracking-wider text-stone-700 hover:text-[#C13A08] transition-colors"
              >
                ← Return to Public Broadsheet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBFBFA]" />}>
      <LoginForm />
    </Suspense>
  );
}
