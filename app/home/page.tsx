"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ✅ Type annotation added to fix TS error
// ✅ Kept outside to prevent "impure function" error during render
const generateId = (): number => Math.floor(Math.random() * 1000000);

const HomePage: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"direct" | "groups">("direct");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  // Mock Data
  const [chatData, setChatData] = useState([
    { id: 1, name: "Suresh Machi", lastMsg: "Logo ready-ah?", time: "10:30 AM", isOnline: true, type: "direct", status: "accepted" },
    { id: 2, name: "Rahul", lastMsg: "Waiting for request...", time: "Yesterday", isOnline: false, type: "direct", status: "pending" },
    { id: 3, name: "React Devs", lastMsg: "New Update!", time: "9:00 AM", isOnline: true, type: "groups", status: "accepted" },
    { id: 4, name: "Anitha", lastMsg: "Hi there!", time: "11:15 AM", isOnline: true, type: "direct", status: "pending" },
    { id: 5, name: "Priya", lastMsg: "Project update?", time: "12:00 PM", isOnline: true, type: "direct", status: "accepted" },
    { id: 6, name: "Vikram", lastMsg: "", time: "", isOnline: true, type: "direct", status: "none" }, // Stranger
    { id: 7, name: "Deepa", lastMsg: "", time: "", isOnline: true, type: "direct", status: "none" }, // Stranger
  ]);

  const currentChat = chatData.find((c) => c.id === activeChatId);

  // Filtered Lists
  const incomingRequests = chatData.filter((user) => user.status === "pending");
  
  const onlineStrangers = chatData.filter(
    (user) => user.status === "none" && user.isOnline
  );

  const friendsAndGroups = chatData.filter(
    (chat) =>
      chat.type === activeTab &&
      (chat.status === "accepted" || chat.status === "sent")
  );

  // Handlers
  const handleAccept = (id: number) => {
    setChatData((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: "accepted", lastMsg: "Request accepted", time: "Just now" } : c
      )
    );
  };

  const handleIgnore = (id: number) => {
    setChatData((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  const handleSendRequest = (id?: number) => {
    if (id) {
      // Sending request to a stranger from the list
      setChatData(prev => prev.map(c => 
        c.id === id ? { ...c, status: 'sent', lastMsg: 'Request sent...', time: 'Just now' } : c
      ));
      return;
    }

    if (!newUserName.trim()) return;

    const newUser = {
      id: generateId(),
      name: newUserName,
      lastMsg: "Request sent...",
      time: "Just now",
      isOnline: false,
      type: "direct" as const,
      status: "sent",
    };
    setChatData([newUser, ...chatData]);
    setNewUserName("");
    setShowAddUserModal(false);
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = {
      id: generateId(), // Changed from Date.now() for consistency
      name: newGroupName,
      lastMsg: "Group created",
      time: "Just now",
      isOnline: true,
      type: "groups" as const,
      status: "accepted",
    };
    setChatData([newGroup, ...chatData]);
    setNewGroupName("");
    setShowGroupModal(false);
    setActiveTab("groups");
  };

  return (
    <div className="fixed inset-0 flex bg-[#0f172a] text-white overflow-hidden w-full h-full font-sans">
      {/* 1. Sidebar */}
      <div className="hidden md:flex w-20 flex-col items-center py-6 border-r border-white/5 bg-[#0b1222] shrink-0">
        <div className="relative w-10 h-10 mb-10">
          <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
        </div>
        <button
          onClick={() => setShowAddUserModal(true)}
          className="p-3 bg-blue-600 rounded-2xl shadow-lg hover:scale-110 transition-transform"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {/* 2. Chat Sidebar */}
      <div className={`${activeChatId ? "hidden md:flex" : "flex"} w-full md:max-w-[380px] flex-col bg-[#0f172a] border-r border-white/5 h-full`}>
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic text-blue-500 tracking-tighter">Connecto</h2>
            <button onClick={() => setShowGroupModal(true)} className="p-2 bg-blue-600/10 text-blue-500 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {/* TOP ROW: INCOMING REQUESTS */}
          <div className="mb-6">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Incoming Requests</p>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {incomingRequests.map((user) => (
                <button key={user.id} onClick={() => setActiveChatId(user.id)} className="flex flex-col items-center shrink-0">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-500 to-orange-500 p-[2px]">
                    <div className="w-full h-full rounded-xl bg-[#0f172a] flex items-center justify-center font-bold">
                      {user.name[0]}
                    </div>
                  </div>
                  <span className="text-[10px] mt-2 text-yellow-500 font-bold">{user.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* TABS */}
          <div className="flex p-1 bg-[#0b1222] rounded-xl border border-white/5 mb-4">
            <button
              onClick={() => setActiveTab("direct")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "direct" ? "bg-blue-600 text-white" : "text-gray-500"}`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab("groups")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "groups" ? "bg-blue-600 text-white" : "text-gray-500"}`}
            >
              Groups
            </button>
          </div>
        </div>

        {/* MAIN LIST (Friends + Discover mixed) */}
        <div className="flex-1 overflow-y-auto px-4 space-y-8 pb-6 no-scrollbar">
          
          {/* Section 1: Actual Friends/Groups */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-2">Your {activeTab === "direct" ? "Messages" : "Groups"}</p>
            {friendsAndGroups.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`flex items-center gap-4 p-4 rounded-[28px] cursor-pointer transition-all ${activeChatId === chat.id ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center font-bold border border-white/5 relative">
                  {chat.name[0]}
                  {chat.isOnline && <div className="absolute w-3 h-3 bg-green-500 border-2 border-[#0f172a] rounded-full bottom-0 right-0"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-sm font-bold truncate ${chat.status === "sent" ? "text-blue-400" : "text-white"}`}>{chat.name}</h3>
                    <span className="text-[10px] text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">{chat.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: DISCOVER PEOPLE (Now in Bottom List) */}
          {/* DISCOVER SECTION - Updated Button */}
{activeTab === "direct" && onlineStrangers.length > 0 && (
  <div className="space-y-3 mt-6">
    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3 ml-2">
      Discover People Online
    </p>
    {onlineStrangers.map((user) => (
      <div 
        key={user.id} 
        className="flex items-center gap-4 p-3 rounded-[24px] bg-blue-600/5 border border-white/5 hover:bg-blue-600/10 transition-colors"
      >
        <div className="w-10 h-10 rounded-xl bg-gray-700 flex items-center justify-center text-sm font-bold border border-white/5 relative shrink-0">
          {user.name[0]}
          <div className="absolute w-2.5 h-2.5 bg-green-500 border-2 border-[#0f172a] rounded-full bottom-0 right-0"></div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
          <p className="text-[10px] text-blue-400 font-medium">Available to chat</p>
        </div>

        {/* ✅ Updated Button with Text */}
        <button
          onClick={() => handleSendRequest(user.id)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold rounded-full transition-all active:scale-95 shadow-lg whitespace-nowrap"
        >
          Send Request
        </button>
      </div>
    ))}
  </div>
)}
        </div>
      </div>

      {/* 3. Main Chat Area */}
      <div className={`${activeChatId ? "flex" : "hidden md:flex"} flex-1 flex-col bg-[#0b1222]/30 h-full relative`}>
        {currentChat ? (
          <div className="flex flex-col h-full w-full">
            <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-[#0f172a]/60 backdrop-blur-xl">
              <button onClick={() => setActiveChatId(null)} className="md:hidden p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" /></svg>
              </button>
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold">{currentChat.name[0]}</div>
              <h4 className="font-bold text-sm">{currentChat.name}</h4>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              {currentChat.status === "pending" ? (
                <div className="bg-[#0b1222] p-8 rounded-[40px] border border-white/5 shadow-2xl max-w-sm">
                  <h3 className="text-lg font-bold mb-2">Respond to Request</h3>
                  <p className="text-gray-400 text-xs mb-8">Accept to chat with {currentChat.name}.</p>
                  <div className="flex gap-4">
                    <button onClick={() => handleAccept(currentChat.id)} className="flex-1 py-3 bg-blue-600 rounded-2xl text-xs font-bold">Accept</button>
                    <button onClick={() => handleIgnore(currentChat.id)} className="flex-1 py-3 bg-red-600/10 text-red-500 border border-red-600/20 rounded-2xl text-xs font-bold">Ignore</button>
                  </div>
                </div>
              ) : currentChat.status === "sent" ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeWidth="2" /></svg>
                  </div>
                  <p className="text-sm text-gray-400">Request pending with {currentChat.name}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Chatting with {currentChat.name}</p>
              )}
            </div>

            {currentChat.status === "accepted" && (
              <div className="p-6">
                <div className="bg-white/5 border border-white/10 p-2 rounded-2xl flex items-center gap-2">
                  <input type="text" placeholder="Type message..." className="flex-1 bg-transparent px-4 py-2 outline-none text-sm" />
                  <button className="p-3 bg-blue-600 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 uppercase tracking-widest font-black opacity-20 text-4xl">Connecto</div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8">
              <h2 className="text-xl font-bold mb-6">Add Friend</h2>
              <input
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="User name..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 mb-6"
              />
              <div className="flex gap-3">
                <button onClick={() => setShowAddUserModal(false)} className="flex-1 py-4 bg-white/5 rounded-2xl text-xs font-bold border border-white/10">Cancel</button>
                <button onClick={() => handleSendRequest()} className="flex-1 py-4 bg-blue-600 rounded-2xl text-xs font-bold">Send</button>
              </div>
            </motion.div>
          </div>
        )}
        {showGroupModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8">
              <h2 className="text-xl font-bold mb-6">New Group</h2>
              <input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Group name..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 mb-6"
              />
              <div className="flex gap-3">
                <button onClick={() => setShowGroupModal(false)} className="flex-1 py-4 bg-white/5 rounded-2xl text-xs font-bold border border-white/10">Cancel</button>
                <button onClick={handleCreateGroup} className="flex-1 py-4 bg-blue-600 rounded-2xl text-xs font-bold">Create</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;