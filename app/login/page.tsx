"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  Lock,
  ArrowRight,
  MessageSquareCode,
  Smartphone,
  ChevronDown,
} from "lucide-react";

const LoginPage: React.FC = () => {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [isOtpSent, setIsOtpSent] = useState(false);
  // Default country code +91 set panniruken
  const [countryCode, setCountryCode] = useState("+91");
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    otp: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (loginMethod === "phone") {
      if (!isOtpSent) {
        if (formData.phone.length < 10)
          return setError("Valid number enter pannunga machi!");
        // Real logic-la countryCode + formData.phone rendaiyum join panni anupanum
        console.log("Sending OTP to:", countryCode + formData.phone);
        setIsOtpSent(true);
      } else {
        if (formData.otp === "123456") router.push("/home");
        else setError("Invalid OTP! Try 123456");
      }
    } else {
      if (
        formData.email === "admin@chatoo.com" &&
        formData.password === "password123"
      ) {
        router.push("/home");
      } else setError("Invalid email or password!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0f172a] overflow-hidden text-white px-6">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-48 h-20 mb-1">
            <Image
              src="/images/logo.png"
              alt="Chatoo Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Login</h2>
<p className="text-gray-400 text-sm mt-1 text-center">Quick login via Mobile Number or Email</p>
        </div>

        {/* Method Switcher */}
        {!isOtpSent && (
          <div className="flex bg-white/5 p-1 rounded-xl mb-6 border border-white/5">
            <button
              onClick={() => {
                setLoginMethod("phone");
                setError("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${loginMethod === "phone" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
            >
              <Smartphone size={14} /> MOBILE
            </button>
            <button
              onClick={() => {
                setLoginMethod("email");
                setError("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${loginMethod === "email" ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}
            >
              <Mail size={14} /> EMAIL
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.form
            key={loginMethod + (isOtpSent ? "-otp" : "")}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {loginMethod === "phone" ? (
              !isOtpSent ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      {/* 🇮🇳 Country Code Dropdown */}
                      <div className="relative">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer pr-8 text-white"
                        >
                          {/* Background color-ah dark-ah mathi text-white kuduthuruken */}
                          <option
                            value="+91"
                            className="bg-[#1e293b] text-white"
                          >
                            🇮🇳 +91
                          </option>
                          <option
                            value="+1"
                            className="bg-[#1e293b] text-white"
                          >
                            🇺🇸 +1
                          </option>
                          <option
                            value="+44"
                            className="bg-[#1e293b] text-white"
                          >
                            🇬🇧 +44
                          </option>
                          <option
                            value="+971"
                            className="bg-[#1e293b] text-white"
                          >
                            🇦🇪 +971
                          </option>
                        </select>
                        <ChevronDown
                          size={12}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                      </div>

                      {/* Phone Input */}
                      <div className="relative flex-1">
                        <Phone
                          size={18}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                        />
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          placeholder="98765 43210"
                          className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/10 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/50"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button className="w-full py-3 bg-blue-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                    Send OTP <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                /* OTP Section (No changes here) */
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1 text-center">
                      Enter OTP
                    </label>
                    <div className="relative">
                      <MessageSquareCode
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        name="otp"
                        type="text"
                        maxLength={6}
                        value={formData.otp}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            otp: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        placeholder="000000"
                        className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/10 rounded-xl outline-none text-sm tracking-[0.5em] font-black text-center focus:ring-2 focus:ring-emerald-500/50"
                        required
                      />
                    </div>
                  </div>
                  <button className="w-full py-3 bg-emerald-600 rounded-xl font-bold text-sm">
                    Verify & Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOtpSent(false)}
                    className="w-full text-xs text-gray-500 hover:text-white"
                  >
                    Change Number?
                  </button>
                </div>
              )
            ) : (
              /* Email Section (No changes here) */
              <div className="space-y-4">
                {/* Email and Password inputs remain the same as your previous code */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="admin@chatoo.com"
                      className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/10 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/50"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    />
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="••••••••"
                      className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/10 rounded-xl outline-none text-sm focus:ring-2 focus:ring-blue-500/50"
                      required
                    />
                  </div>
                </div>
                <button className="w-full py-3 bg-blue-600 rounded-xl font-bold text-sm">
                  Sign In
                </button>
              </div>
            )}
          </motion.form>
        </AnimatePresence>

        <p className="mt-8 text-center text-sm text-gray-400">
          New to Chatoo?{" "}
          <a
            href="/signup"
            className="text-blue-400 font-semibold hover:underline"
          >
            Create Account
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
