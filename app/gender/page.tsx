"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const GenderPage: React.FC = () => {
  const [selected, setSelected] = useState<"male" | "female" | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (selected) {
      console.log("Selected Gender:", selected);
      router.push("/login"); // Selection mudinjathum Login-ku redirect
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0f172a] text-white px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-20%] bg-blue-600/10 w-full h-1/2 blur-[120px] rounded-full"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center mb-12"
      >
        <h1 className="text-3xl font-black tracking-tight mb-2">Tell us about yourself</h1>
        <p className="text-gray-400 text-sm italic">Help us personalize your Chatoo experience</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
        {/* Male Option */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected("male")}
          className={`cursor-pointer flex flex-col items-center p-8 rounded-3xl border-2 transition-all duration-300 ${
            selected === "male" 
            ? "border-blue-500 bg-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]" 
            : "border-white/5 bg-white/5 hover:bg-white/10"
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${selected === "male" ? "bg-blue-500 text-white" : "bg-gray-800 text-gray-400"}`}>
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
          </div>
          <span className={`font-bold ${selected === "male" ? "text-blue-400" : "text-gray-400"}`}>Male</span>
        </motion.div>

        {/* Female Option */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelected("female")}
          className={`cursor-pointer flex flex-col items-center p-8 rounded-3xl border-2 transition-all duration-300 ${
            selected === "female" 
            ? "border-pink-500 bg-pink-500/20 shadow-[0_0_30px_rgba(236,72,153,0.3)]" 
            : "border-white/5 bg-white/5 hover:bg-white/10"
          }`}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${selected === "female" ? "bg-pink-500 text-white" : "bg-gray-800 text-gray-400"}`}>
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
          </div>
          <span className={`font-bold ${selected === "female" ? "text-pink-400" : "text-gray-400"}`}>Female</span>
        </motion.div>
      </div>

      {/* Next Button */}
      <motion.button
        disabled={!selected}
        whileHover={selected ? { scale: 1.05 } : {}}
        whileTap={selected ? { scale: 0.95 } : {}}
        onClick={handleNext}
        className={`mt-16 px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
          selected 
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/40 opacity-100" 
          : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
        }`}
      >
        Continue
      </motion.button>
    </div>
  );
};

export default GenderPage;