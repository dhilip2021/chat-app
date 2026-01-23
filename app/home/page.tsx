"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const HomePage: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"direct" | "groups">("direct");
  const [showGroupModal, setShowGroupModal] = useState(false);

  // Mock Data with 'status' for Request Logic
  const [chatData, setChatData] = useState([
    { id: 1, name: "Suresh Machi", lastMsg: "Logo ready-ah?", time: "10:30 AM", isOnline: true, type: "direct", status: "accepted" },
    { id: 2, name: "Rahul", lastMsg: "Lunch polama?", time: "Yesterday", isOnline: false, type: "direct", status: "pending" },
    { id: 3, name: "React Devs", lastMsg: "New Update!", time: "9:00 AM", isOnline: true, type: "groups", status: "accepted" },
    { id: 4, name: "Anitha", lastMsg: "Hi there!", time: "11:15 AM", isOnline: true, type: "direct", status: "pending" },
  ]);

  const currentChat = chatData.find(c => c.id === activeChatId);
  const onlineUsers = chatData.filter(user => user.isOnline && user.type === "direct");
  const filteredList = chatData.filter((chat) => chat.type === activeTab);

  const handleAccept = (id: number) => {
    setChatData(prev => prev.map(c => c.id === id ? { ...c, status: 'accepted' } : c));
  };

  return (
    <div className="fixed inset-0 flex bg-[#0f172a] text-white overflow-hidden w-full h-full">
      
      {/* 1. Sidebar (Hidden on Mobile) */}
      <div className="hidden md:flex w-20 flex-col items-center py-6 border-r border-white/5 bg-[#0b1222] shrink-0">
        <div className="relative w-10 h-10 mb-10">
          <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
        </div>
        <button className="p-3 bg-blue-600 rounded-2xl shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeWidth="2" /></svg>
        </button>
      </div>

      {/* 2. Chat Sidebar (Full width on Mobile if no chat selected) */}
      <div className={`${activeChatId ? 'hidden md:flex' : 'flex'} w-full md:max-w-[380px] flex-col bg-[#0f172a] border-r border-white/5 h-full`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic text-blue-500">Connecto</h2>
            <button onClick={() => setShowGroupModal(true)} className="p-2 bg-blue-600/10 text-blue-500 rounded-xl hover:bg-blue-600/20 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" /></svg>
            </button>
          </div>

          {/* ONLINE ROW */}
          <div className="mb-6 overflow-hidden">
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {onlineUsers.map((user) => (
                <button key={user.id} onClick={() => setActiveChatId(user.id)} className="flex flex-col items-center shrink-0">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-emerald-400 p-[2px]">
                    <div className="w-full h-full rounded-xl bg-[#0f172a] flex items-center justify-center font-bold">{user.name[0]}</div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0f172a] rounded-full"></div>
                  </div>
                  <span className="text-[10px] mt-2 text-gray-500">{user.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* TABS */}
          <div className="flex p-1 bg-[#0b1222] rounded-xl border border-white/5">
            <button onClick={() => setActiveTab("direct")} className={`flex-1 py-2 text-xs font-bold rounded-lg ${activeTab === "direct" ? "bg-blue-600 shadow-lg" : "text-gray-500"}`}>Messages</button>
            <button onClick={() => setActiveTab("groups")} className={`flex-1 py-2 text-xs font-bold rounded-lg ${activeTab === "groups" ? "bg-blue-600 shadow-lg" : "text-gray-500"}`}>Groups</button>
          </div>
        </div>

        {/* VERTICAL LIST */}
        <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-6">
          {filteredList.map((chat) => (
            <div key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all ${activeChatId === chat.id ? 'bg-white/5' : 'hover:bg-white/5'}`}>
              <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center font-bold border border-white/5">{chat.name[0]}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold truncate">{chat.name}</h3>
                  {chat.status === 'pending' && <span className="text-[9px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-full">Pending</span>}
                </div>
                <p className="text-xs text-gray-500 truncate mt-1">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Chat Area (Full width on Mobile if chat selected) */}
      <div className={`${activeChatId ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-[#0b1222]/30 h-full relative`}>
        {currentChat ? (
          <div className="flex flex-col h-full w-full">
            {/* Header with Back Button for Mobile */}
            <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-[#0f172a]/60 backdrop-blur-xl">
              <button onClick={() => setActiveChatId(null)} className="md:hidden p-2 hover:bg-white/5 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" /></svg>
              </button>
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold">{currentChat.name[0]}</div>
              <h4 className="font-bold text-sm">{currentChat.name}</h4>
            </div>

            {/* MESSAGE AREA / REQUEST AREA */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              {currentChat.status === 'pending' ? (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white/5 p-8 rounded-[40px] border border-white/10 text-center max-w-xs">
                  <div className="w-16 h-16 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth="2" /></svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Chat Request</h3>
                  <p className="text-gray-400 text-xs mb-6">Accept this request to start chatting with {currentChat.name}.</p>
                  <div className="flex gap-3">
                    <button onClick={() => handleAccept(currentChat.id)} className="flex-1 py-3 bg-blue-600 rounded-2xl text-xs font-bold shadow-lg shadow-blue-500/20">Accept</button>
                    <button className="flex-1 py-3 bg-white/5 rounded-2xl text-xs font-bold border border-white/10">Ignore</button>
                  </div>
                </motion.div>
              ) : (
                <p className="text-gray-500 text-sm italic">No messages yet. Say hi to {currentChat.name}!</p>
              )}
            </div>

            {/* Input only shows if accepted */}
            {currentChat.status === 'accepted' && (
              <div className="p-4">
                <div className="bg-white/5 border border-white/10 p-2 rounded-2xl flex items-center gap-2">
                  <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent px-4 py-2 outline-none text-sm" />
                  <button className="p-3 bg-blue-600 rounded-xl"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg></button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">Select a chat to start</div>
        )}
      </div>

      {/* 4. New Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8">
            <h2 className="text-xl font-bold mb-6">Create New Group</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Group Name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-blue-500" />
              <div className="py-4 border-t border-white/5">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-3">Add Members</p>
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-gray-800 border border-dashed border-white/20 flex items-center justify-center text-xl">+</div>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowGroupModal(false)} className="flex-1 py-3 bg-white/5 rounded-2xl text-xs font-bold border border-white/10">Cancel</button>
                <button className="flex-1 py-3 bg-blue-600 rounded-2xl text-xs font-bold">Create</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default HomePage;