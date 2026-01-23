"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const SignUpPage: React.FC = () => {
  // state-ah ippo namma inputs-la read/write panna porom
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0f172a] overflow-hidden text-white px-6">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full"></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-12 h-12 mb-4">
            <Image src="/images/logo.png" alt="Chatoo Logo" fill className="object-contain" priority />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Join Chatoo community today</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Full Name</label>
            <input 
              name="name"
              type="text" 
              value={formData.name} // Reading value (TS Warning Clear)
              onChange={handleChange}
              placeholder="John Doe" 
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm transition-all" 
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Email Address</label>
            <input 
              name="email"
              type="email" 
              value={formData.email} // Reading value (TS Warning Clear)
              onChange={handleChange}
              placeholder="name@company.com" 
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm transition-all" 
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 ml-1">Password</label>
            <input 
              name="password"
              type="password" 
              value={formData.password} // Reading value (TS Warning Clear)
              onChange={handleChange}
              placeholder="••••••••" 
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-sm transition-all" 
              required
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }} 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-xl font-bold text-sm shadow-lg mt-4"
          >
            Create Account
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 font-semibold hover:underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;