"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Router import panniyaachu

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("admin@chatoo.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState(""); // Error handling-ku
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Dummy Credentials
    const dummyEmail = "admin@chatoo.com";
    const dummyPassword = "password123";

    if (email === dummyEmail && password === dummyPassword) {
      console.log("Success! Redirecting...");
      router.push("/home"); // Redirect to home page
    } else {
      setError("Invalid email or password machi!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0f172a] overflow-hidden text-white px-6">
      {/* Background Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-50 h-50">
            <Image
              src="/images/logo.png"
              alt="Chatoo Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-1">
            Sign in to continue to Chatoo
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-red-400 text-xs text-center mb-4 bg-red-400/10 py-2 rounded-lg border border-red-400/20"
          >
            {error}
          </motion.p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@chatoo.com" // Hint for dummy
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              required
            />
          </div>

          <div>
            <div className="flex justify-between mb-2 ml-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Password
              </label>
              <a href="/forgot" className="text-xs text-blue-400 hover:underline">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password123" // Hint for dummy
              className="w-full px-5 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 mt-4"
          >
            Sign In
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-[1px] bg-white/10"></div>
          <span className="px-3 text-[10px] uppercase text-gray-500 font-bold">
            Or continue with
          </span>
          <div className="flex-1 h-[1px] bg-white/10"></div>
        </div>

        <button className="w-full flex items-center justify-center gap-3 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-sm font-medium">
          <div className="relative w-5 h-5">
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              fill
            />
          </div>
          Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-400 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;