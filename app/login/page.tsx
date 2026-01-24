"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight, MessageSquareCode } from "lucide-react";

const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // OTP send aayiducha nu check panna
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError("Valid mobile number enter pannunga machi!");
      return;
    }
    setError("");
    console.log("Sending OTP to:", phone);
    setIsOtpSent(true); // OTP field-ah show pannuvom
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") { // Dummy OTP
      router.push("/home");
    } else {
      setError("Invalid OTP! Try '123456'");
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
            <Image src="/images/logo.png" alt="Chatoo Logo" fill className="object-contain" priority />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Login</h2>
          <p className="text-gray-400 text-sm mt-1">
            {isOtpSent ? "Enter the code sent to your mobile" : "Quick login via Mobile Number"}
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center mb-4 bg-red-400/10 py-2 rounded-lg border border-red-400/20">
            {error}
          </p>
        )}

        {/* 🔄 Form Switcher Logic */}
        <AnimatePresence mode="wait">
          {!isOtpSent ? (
            // --- STEP 1: MOBILE NUMBER INPUT ---
            <motion.form
              key="phoneForm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSendOtp}
              className="space-y-5"
            >
              <div className="relative group">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="98765 43210"
                    className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm transition-all"
                    required
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                Send OTP <ArrowRight size={16} />
              </motion.button>
            </motion.form>
          ) : (
            // --- STEP 2: OTP INPUT ---
            <motion.form
              key="otpForm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleVerifyOtp}
              className="space-y-5"
            >
              <div className="relative group">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1">
                  One-Time Password
                </label>
                <div className="relative">
                  <MessageSquareCode size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit code"
                    className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm tracking-[0.5em] font-bold transition-all"
                    required
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 rounded-xl font-bold text-sm"
              >
                Verify & Login
              </motion.button>
              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="w-full text-xs text-gray-500 hover:text-white transition-colors"
              >
                Change Mobile Number?
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-sm text-gray-400">
          New to Chatoo?{" "}
          <a href="/signup" className="text-blue-400 font-semibold hover:underline">Create Account</a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;