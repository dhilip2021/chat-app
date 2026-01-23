"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ForgotPage: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0f172a] overflow-hidden text-white px-6">
      <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-6 border border-blue-500/20">
            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
        </div>

        <h2 className="text-2xl font-bold tracking-tight">Forgot Password?</h2>
        <p className="text-gray-400 text-sm mt-2 px-4 leading-relaxed">
          Don&apos;t worry! Enter your email below and we&apos;ll send you a reset link.
        </p>

        <form className="mt-8 space-y-5 text-left">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Email Address</label>
            <input type="email" placeholder="Enter your email" className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm transition-all" />
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-blue-600 rounded-xl font-bold text-sm shadow-lg">
            Send Reset Link
          </motion.button>
        </form>

        <div className="mt-8">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPage;