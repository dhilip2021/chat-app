"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Phone, MessageSquareCode, User, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Step 1: Form details check panni OTP anupura logic
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 10) {
      setError("Valid mobile number kudunga machi!");
      return;
    }
    setError("");
    console.log("Sending OTP to:", formData.phone);
    setIsOtpSent(true);
  };

  // Step 2: OTP verify panni account create pandra logic
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === "123456") { // Dummy OTP
      console.log("Account Created Successfully!", formData);
      // alert("Account Created!");
router.push('/gender');
    } else {
      setError("Invalid OTP! Use 123456");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0f172a] overflow-hidden text-white px-6">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-48 h-20 mb-1">
            <Image src="/images/logo.png" alt="Chatoo Logo" fill className="object-contain" priority />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {isOtpSent ? "Verify Mobile" : "Create Account"}
          </h2>
          <p className="text-gray-400 text-sm mt-1 text-center">
            {isOtpSent ? `OTP sent to ${formData.phone}` : "Join Chatoo community today"}
          </p>
        </div>

        {error && (
          <p className="text-red-400 text-xs text-center mb-4 bg-red-400/10 py-2 rounded-lg border border-red-400/20">
            {error}
          </p>
        )}

        <AnimatePresence mode="wait">
          {!isOtpSent ? (
            // --- STEP 1: REGISTRATION DETAILS ---
            <motion.form
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSendOtp}
              className="space-y-4"
            >
              {/* Full Name */}
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full pl-11 pr-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm transition-all" required />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" className="w-full pl-11 pr-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm transition-all" required />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Mobile Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="98765 43210" className="w-full pl-11 pr-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm transition-all" required />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Password</label>
                <div className="relative group">
                  <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm transition-all" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-xl font-bold text-sm shadow-lg mt-2">
                Get Verification Code
              </motion.button>
            </motion.form>
          ) : (
            // --- STEP 2: OTP VERIFICATION ---
            <motion.form
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onSubmit={handleCreateAccount}
              className="space-y-6"
            >
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 text-center">Enter 6-Digit OTP</label>
                <div className="relative">
                  <MessageSquareCode size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="000000"
                    className="w-full pl-12 pr-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-emerald-500/50 outline-none text-xl tracking-[0.5em] font-black text-center transition-all"
                    required
                  />
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20">
                Verify & Create Account
              </motion.button>

              <button type="button" onClick={() => setIsOtpSent(false)} className="w-full text-xs text-gray-500 hover:text-white transition-colors">
                ← Go back and edit details
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 font-semibold hover:underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;