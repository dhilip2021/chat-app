"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const UserAvatar = ({ name, size = "w-48 h-48" }: { name: string; size?: string }) => {
  const avatarUrl = `https://i.pravatar.cc/300?u=${name.replace(/\s/g, "")}`;
  return (
    <div className={`${size} rounded-[40px] bg-[#1e293b] flex-shrink-0 relative overflow-hidden border-8 border-[#0b1222] shadow-2xl group`}>
      <Image src={avatarUrl} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2" />
          <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full bg-[#0b1222] text-white font-sans selection:bg-blue-500/30">
      
      {/* 1. HERO BANNER - Full Width */}
      <div className="h-[35vh] w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-800">
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          {/* Animated Glow */}
          <motion.div 
            animate={{ opacity: [0.4, 0.7, 0.4] }} 
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-0 right-0 w-96 h-96 bg-blue-400 blur-[120px] rounded-full -mr-20 -mt-20"
          />
        </div>

        {/* Navigation */}
        <div className="relative z-20 max-w-7xl mx-auto px-8 pt-8 flex justify-between items-center">
          <Link href="/home" className="flex items-center gap-3 px-5 py-2.5 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-black/40 transition-all group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2.5" /></svg>
            <span className="text-sm font-bold">Back to Workspace</span>
          </Link>
          <div className="flex gap-4">
            <button className="px-6 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-sm font-bold hover:bg-white/10">Preview Public</button>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        
        {/* Profile Header Card */}
        <div className="relative -mt-32 z-30 flex flex-col md:flex-row items-center md:items-end gap-8 mb-16">
          <UserAvatar name="Madan Machi" />
          
          <div className="flex-1 text-center md:text-left mb-4">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-5xl font-black tracking-tighter">Madan Machi</h1>
              <span className="w-fit mx-auto md:mx-0 px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black rounded-lg border border-blue-500/30 tracking-widest uppercase">PRO USER</span>
            </div>
            <p className="text-xl text-gray-400 font-medium tracking-tight">Full Stack Developer & UI Enthusiast</p>
          </div>

          <div className="flex gap-3 mb-4">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-[24px] font-bold text-sm shadow-2xl shadow-blue-600/40 transition-all active:scale-95">
              Save All Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* 3. LEFT COL: SETTINGS (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* General Info Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#0f172a]/50 border border-white/5 rounded-[40px] p-10 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                Account Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] ml-1">Full Identity</label>
                  <input type="text" defaultValue="Madan Machi" className="w-full bg-[#1e293b]/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] ml-1">Email Address</label>
                  <input type="email" defaultValue="madan@connecto.com" className="w-full bg-[#1e293b]/50 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] ml-1">About Bio</label>
                  <textarea defaultValue="Building scalable real-time systems with React & Next.js. Coffee lover ☕" className="w-full bg-[#1e293b]/50 border border-white/5 rounded-3xl px-6 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium h-40 resize-none" />
                </div>
              </div>
            </motion.section>

            {/* Social Links Card */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[#0f172a]/50 border border-white/5 rounded-[40px] p-10 backdrop-blur-sm"
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
                Social Connections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['GitHub', 'Twitter', 'LinkedIn', 'Portfolio'].map((social) => (
                  <div key={social} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs font-bold">{social[0]}</div>
                    <input type="text" placeholder={`${social} URL`} className="bg-transparent outline-none text-sm flex-1 font-medium" />
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* 4. RIGHT COL: PREFERENCES (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            
            <section className="bg-[#0f172a]/50 border border-white/5 rounded-[40px] p-10 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-8">System Settings</h3>
              <div className="space-y-4">
                {[
                  { label: "Public Profile", active: true },
                  { label: "Notification Sound", active: true },
                  { label: "Dark Mode", active: true },
                  { label: "Two-Factor Auth", active: false }
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-5 bg-white/5 rounded-[24px] border border-white/5 group hover:bg-white/10 transition-all">
                    <span className="text-sm font-bold text-gray-300">{item.label}</span>
                    <div className={`w-12 h-6 rounded-full p-1 transition-colors ${item.active ? 'bg-blue-600' : 'bg-gray-700'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="p-8 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/10 rounded-[40px] space-y-4">
              <h4 className="font-bold text-red-500">Danger Zone</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Deleting your account is permanent. All your data and messages will be wiped from our servers.</p>
              <button className="w-full py-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                Delete My Account
              </button>
            </div>
            
            <button className="w-full py-5 bg-[#1e293b] hover:bg-red-500 transition-all rounded-[32px] text-sm font-bold shadow-2xl group flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-red-500 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeWidth="2" /></svg>
              Sign Out from Device
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}