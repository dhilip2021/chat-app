"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- HELPERS & EXTERNAL COMPONENTS ---

const generateId = (): number => Math.floor(Math.random() * 1000000);

// ✅ Moved outside to prevent "Component created during render" error
const Avatar = ({ name, src, size = "w-12 h-12" }: { name: string, src?: string, size?: string }) => (
  <div className={`${size} rounded-2xl bg-gray-800 flex-shrink-0 relative overflow-hidden border border-white/10 flex items-center justify-center font-bold text-white shadow-inner`}>
    {src ? (
      <Image 
        src={src} 
        alt={name} 
        fill 
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover" 
      />
    ) : (
      <span className="text-lg">{name[0]}</span>
    )}
  </div>
);

// --- MAIN PAGE COMPONENT ---

const HomePage: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"direct" | "groups">("direct");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const [chatData, setChatData] = useState([
    { id: 1, name: "Suresh Machi", lastMsg: "Logo ready-ah?", time: "10:30 AM", isOnline: true, type: "direct", status: "accepted", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Rahul", lastMsg: "Waiting for request...", time: "Yesterday", isOnline: false, type: "direct", status: "pending", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "React Devs", lastMsg: "New Update!", time: "9:00 AM", isOnline: true, type: "groups", status: "accepted", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Anitha", lastMsg: "Hi there!", time: "11:15 AM", isOnline: true, type: "direct", status: "pending", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Priya", lastMsg: "Project update?", time: "12:00 PM", isOnline: true, type: "direct", status: "accepted", avatar: "https://i.pravatar.cc/150?u=5" },
    { id: 6, name: "Vikram", lastMsg: "", time: "", isOnline: true, type: "direct", status: "none", avatar: "https://i.pravatar.cc/150?u=6" },
    { id: 7, name: "Deepa", lastMsg: "", time: "", isOnline: true, type: "direct", status: "none", avatar: "https://i.pravatar.cc/150?u=7" },
  ]);

  const currentChat = chatData.find((c) => c.id === activeChatId);
  const incomingRequests = chatData.filter((user) => user.status === "pending");
  const onlineStrangers = chatData.filter((user) => user.status === "none" && user.isOnline);
  const friendsAndGroups = chatData.filter((chat) => chat.type === activeTab && (chat.status === "accepted" || chat.status === "sent"));

  const handleAccept = (id: number) => {
    setChatData(prev => prev.map(c => c.id === id ? { ...c, status: "accepted", lastMsg: "Request accepted", time: "Just now" } : c));
  };

  const handleIgnore = (id: number) => {
    setChatData(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  const handleSendRequest = (id?: number) => {
    if (id) {
      setChatData(prev => prev.map(c => c.id === id ? { ...c, status: 'sent', lastMsg: 'Request sent...', time: 'Just now' } : c));
      return;
    }
    if (!newUserName.trim()) return;
    const newUser = { id: generateId(), name: newUserName, lastMsg: "Request sent...", time: "Just now", isOnline: false, type: "direct" as const, status: "sent", avatar: `https://i.pravatar.cc/150?u=${generateId()}` };
    setChatData([newUser, ...chatData]);
    setNewUserName("");
    setShowAddUserModal(false);
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = { id: generateId(), name: newGroupName, lastMsg: "Group created", time: "Just now", isOnline: true, type: "groups" as const, status: "accepted", avatar: "" };
    setChatData([newGroup, ...chatData]);
    setNewGroupName("");
    setShowGroupModal(false);
    setActiveTab("groups");
  };

  return (
    <div className="fixed inset-0 flex bg-[#0f172a] text-white overflow-hidden w-full h-full font-sans">
      {/* 1. Sidebar (Logo & Global Actions) */}
      <div className="hidden md:flex w-20 flex-col items-center py-6 border-r border-white/5 bg-[#0b1222] shrink-0">
        <div className="relative w-10 h-10 mb-10">
          <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
        </div>
        <button onClick={() => setShowAddUserModal(true)} className="p-3 bg-blue-600 rounded-2xl shadow-lg hover:scale-110 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeWidth="2" /></svg>
        </button>
      </div>

      {/* 2. Chat Sidebar (Lists) */}
      <div className={`${activeChatId ? "hidden md:flex" : "flex"} w-full md:max-w-[380px] flex-col bg-[#0f172a] border-r border-white/5 h-full`}>
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic text-blue-500 tracking-tighter uppercase">ChatOO</h2>
            <button onClick={() => setShowGroupModal(true)} className="p-2 bg-blue-600/10 text-blue-500 rounded-xl hover:bg-blue-600/20 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" /></svg>
            </button>
          </div>
          
          {/* HORIZONTAL INCOMING REQUESTS */}
          {incomingRequests.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Incoming Requests</p>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {incomingRequests.map((user) => (
                  <button key={user.id} onClick={() => setActiveChatId(user.id)} className="flex flex-col items-center shrink-0 group">
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 p-[2px] group-hover:scale-105 transition-transform">
                      <div className="w-full h-full rounded-xl bg-[#0f172a] relative overflow-hidden">
                        <Image src={user.avatar} alt={user.name} fill className="object-cover" />
                      </div>
                    </div>
                    <span className="text-[10px] mt-2 text-blue-400 font-bold">{user.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB TOGGLES */}
          <div className="flex p-1 bg-[#0b1222] rounded-xl border border-white/5 mb-4">
            {["direct", "groups"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab as "direct" | "groups")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === tab ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-gray-300"}`}>
                {tab === "direct" ? "Messages" : "Groups"}
              </button>
            ))}
          </div>
        </div>

        {/* SCROLLABLE MAIN LIST */}
        <div className="flex-1 overflow-y-auto px-4 space-y-8 pb-6 no-scrollbar">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-2">Recent {activeTab === "direct" ? "Chats" : "Groups"}</p>
            {friendsAndGroups.map((chat) => (
              <div key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`flex items-center gap-4 p-4 rounded-[28px] cursor-pointer transition-all ${activeChatId === chat.id ? "bg-white/10" : "hover:bg-white/5"}`}>
                <div className="relative">
                  <Avatar name={chat.name} src={chat.avatar} />
                  {chat.isOnline && <div className="absolute w-3.5 h-3.5 bg-green-500 border-2 border-[#0f172a] rounded-full -bottom-1 -right-1 z-10 shadow-sm"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-sm font-bold truncate ${chat.status === "sent" ? "text-blue-400" : "text-white"}`}>{chat.name}</h3>
                    <span className="text-[10px] text-gray-500 font-medium">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1 leading-relaxed">{chat.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DISCOVER ONLINE STRANGERS */}
          {activeTab === "direct" && onlineStrangers.length > 0 && (
            <div className="space-y-3 mt-6">
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3 ml-2">Discover New People</p>
              {onlineStrangers.map((user) => (
                <div key={user.id} className="flex items-center gap-4 p-3 rounded-[24px] bg-blue-600/5 border border-white/5 hover:bg-blue-600/10 transition-colors shadow-sm">
                  <Avatar name={user.name} src={user.avatar} size="w-10 h-10" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{user.name}</h4>
                    <p className="text-[10px] text-blue-400 font-bold opacity-80 uppercase tracking-tighter">Available Now</p>
                  </div>
                  <button onClick={() => handleSendRequest(user.id)} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase rounded-full transition-all active:scale-90 shadow-md">
                    Send Request
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 3. Main Chat Viewport */}
      <div className={`${activeChatId ? "flex" : "hidden md:flex"} flex-1 flex-col bg-[#0b1222]/30 h-full relative`}>
        {currentChat ? (
          <div className="flex flex-col h-full w-full">
            {/* CHAT HEADER */}
            <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-[#0f172a]/60 backdrop-blur-xl z-20">
              <button onClick={() => setActiveChatId(null)} className="md:hidden p-2 text-gray-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" /></svg></button>
              <Avatar name={currentChat.name} src={currentChat.avatar} size="w-10 h-10" />
              <div>
                <h4 className="font-bold text-sm leading-none">{currentChat.name}</h4>
                {currentChat.isOnline && <span className="text-[10px] text-green-500 font-bold">Online</span>}
              </div>
            </div>

            {/* CHAT CONTENT */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              {currentChat.status === "pending" ? (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-[#0b1222] p-8 rounded-[40px] border border-white/5 shadow-2xl max-w-sm flex flex-col items-center">
                  <Avatar name={currentChat.name} src={currentChat.avatar} size="w-24 h-24 mb-6 shadow-2xl" />
                  <h3 className="text-xl font-bold mb-2">Social Request</h3>
                  <p className="text-gray-400 text-xs mb-8 leading-relaxed font-medium">Accept to start a private conversation with {currentChat.name}.</p>
                  <div className="flex gap-4 w-full">
                    <button onClick={() => handleAccept(currentChat.id)} className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xs font-black uppercase transition-all shadow-lg active:scale-95">Accept</button>
                    <button onClick={() => handleIgnore(currentChat.id)} className="flex-1 py-3 bg-red-600/10 text-red-500 border border-red-600/20 rounded-2xl text-xs font-black uppercase hover:bg-red-600/20 transition-all">Ignore</button>
                  </div>
                </motion.div>
              ) : currentChat.status === "sent" ? (
                <div className="text-center">
                   <Avatar name={currentChat.name} src={currentChat.avatar} size="w-24 h-24 mx-auto mb-6 opacity-30 grayscale" />
                   <p className="text-sm font-bold text-gray-400 tracking-wide uppercase italic">Request is pending approval...</p>
                </div>
              ) : (
                <div className="opacity-30">
                  <p className="text-gray-500 text-sm font-bold italic">End-to-end encrypted chat with {currentChat.name}</p>
                </div>
              )}
            </div>

            {/* MESSAGE INPUT */}
            {currentChat.status === "accepted" && (
              <div className="p-6 bg-gradient-to-t from-[#0f172a] to-transparent">
                <div className="bg-white/5 border border-white/10 p-2 rounded-[24px] flex items-center gap-2 focus-within:border-blue-500/50 transition-all">
                  <input type="text" placeholder="Start typing..." className="flex-1 bg-transparent px-4 py-3 outline-none text-sm placeholder:text-gray-600" />
                  <button className="p-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl transition-all active:scale-90 shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5" /></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-10 select-none">
            <h1 className="text-7xl font-black italic tracking-tighter">ChatOO</h1>
            <p className="text-sm font-bold tracking-[0.3em] uppercase">Select a chat to begin</p>
          </div>
        )}
      </div>

      {/* MODALS */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8 text-center shadow-2xl">
              <div className="w-20 h-20 bg-blue-600/20 rounded-[30px] flex items-center justify-center mx-auto mb-6 text-blue-500 shadow-inner">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeWidth="2" /></svg>
              </div>
              <h2 className="text-2xl font-black mb-2 tracking-tight">Expand Circle</h2>
              <p className="text-gray-500 text-xs mb-8 font-medium italic">Enter the unique ChatOO username</p>
              <input value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder="Username" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all mb-6 text-center font-bold" />
              <div className="flex gap-3">
                <button onClick={() => setShowAddUserModal(false)} className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-black uppercase border border-white/10 transition-colors">Back</button>
                <button onClick={() => handleSendRequest()} className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xs font-black uppercase shadow-lg transition-transform active:scale-95">Send</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;