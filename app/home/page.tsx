"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const generateId = (): number => Math.floor(Math.random() * 1000000);

// ✅ Reusable UserAvatar Component
const UserAvatar = ({ name, size = "w-12 h-12", isOnline }: { name: string, size?: string, isOnline?: boolean }) => {
  const avatarUrl = `https://i.pravatar.cc/150?u=${name.replace(/\s/g, '')}`;
  return (
    <div className={`${size} rounded-2xl bg-gray-800 flex-shrink-0 relative overflow-hidden border border-white/10 flex items-center justify-center font-bold text-white shadow-inner`}>
      <Image src={avatarUrl} alt={name} fill className="object-cover" sizes="150px" />
      <span className="absolute z-[-1]">{name[0]}</span>
      {isOnline && (
        <div className="absolute w-3 h-3 bg-green-500 border-2 border-[#0f172a] rounded-full bottom-1 right-1 z-10 shadow-sm" />
      )}
    </div>
  );
};

const HomePage: React.FC = () => {
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"direct" | "groups">("direct");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [showSettings, setShowSettings] = useState(false);
const [showProfileDetails, setShowProfileDetails] = useState(false);

  // Mock Data
  const [chatData, setChatData] = useState([
    { id: 1, name: "Suresh Machi", lastMsg: "Logo ready-ah?", time: "10:30 AM", isOnline: true, type: "direct", status: "accepted" },
    { id: 2, name: "Rahul", lastMsg: "Waiting for request...", time: "Yesterday", isOnline: false, type: "direct", status: "pending" },
    { id: 3, name: "React Devs", lastMsg: "New Update!", time: "9:00 AM", isOnline: true, type: "groups", status: "accepted" },
    { id: 4, name: "Anitha", lastMsg: "Hi there!", time: "11:15 AM", isOnline: true, type: "direct", status: "pending" },
    { id: 5, name: "Priya", lastMsg: "Project update?", time: "12:00 PM", isOnline: true, type: "direct", status: "accepted" },
    { id: 6, name: "Vikram", lastMsg: "", time: "", isOnline: true, type: "direct", status: "none" },
    { id: 7, name: "Deepa", lastMsg: "", time: "", isOnline: true, type: "direct", status: "none" },
  ]);

  const currentChat = chatData.find((c) => c.id === activeChatId);
  const incomingRequests = chatData.filter((user) => user.status === "pending");
  const onlineStrangers = chatData.filter((user) => user.status === "none" && user.isOnline);
  const friendsAndGroups = chatData.filter((chat) => chat.type === activeTab && (chat.status === "accepted" || chat.status === "sent"));

  const handleLogout = () => { window.location.href = "/login"; };
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
    const newUser = { id: generateId(), name: newUserName, lastMsg: "Request sent...", time: "Just now", isOnline: false, type: "direct" as const, status: "sent" };
    setChatData([newUser, ...chatData]);
    setNewUserName("");
    setShowAddUserModal(false);
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = { id: generateId(), name: newGroupName, lastMsg: "Group created", time: "Just now", isOnline: true, type: "groups" as const, status: "accepted" };
    setChatData([newGroup, ...chatData]);
    setNewGroupName("");
    setShowGroupModal(false);
    setActiveTab("groups");
  };

  return (
    <div className="fixed inset-0 flex bg-[#0f172a] text-white overflow-hidden w-full h-full font-sans">
      {/* 1. Sidebar */}
      <div className="hidden md:flex w-20 flex-col items-center py-6 border-r border-white/5 bg-[#0b1222] shrink-0 justify-between">
        <div className="flex flex-col items-center w-full">
          <div className="relative w-10 h-10 mb-10">
            <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <button onClick={() => setShowAddUserModal(true)} className="p-3 bg-blue-600 rounded-2xl shadow-lg hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeWidth="2" /></svg>
          </button>
        </div>

        {/* ✅ PROFILE & SETTINGS SECTION */}
        <div className="relative">
          <button onClick={() => setShowSettings(!showSettings)} className={`p-[2px] rounded-2xl transition-all ${showSettings ? 'ring-2 ring-blue-500' : 'hover:bg-white/5'}`}>
            <UserAvatar name="My Profile" size="w-12 h-12" />
          </button>
          <AnimatePresence>
            {showSettings && (
              <motion.div initial={{ opacity: 0, x: 20, scale: 0.95 }} animate={{ opacity: 1, x: 70, scale: 1 }} exit={{ opacity: 0, x: 20, scale: 0.95 }} className="absolute bottom-0 left-0 z-50 w-48 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl p-2 origin-left">
                <Link href={"/profile"}>
  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-white/5 rounded-xl transition-colors"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2" /></svg>Profile</button>
</Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-white/5 rounded-xl transition-colors"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" strokeWidth="2" /></svg>Settings</button>
                <div className="h-[1px] bg-white/5 my-2 mx-2"></div>
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeWidth="2" /></svg>Logout</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Chat Sidebar */}
      <div className={`${activeChatId ? "hidden md:flex" : "flex"} w-full md:max-w-[380px] flex-col bg-[#0f172a] border-r border-white/5 h-full`}>
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic text-blue-500 tracking-tighter">ChatOO</h2>
            <button onClick={() => setShowGroupModal(true)} className="p-2 bg-blue-600/10 text-blue-500 rounded-xl hover:bg-blue-600/20"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" /></svg></button>
          </div>
          <div className="mb-6">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Incoming Requests</p>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {incomingRequests.map((user) => (
                <button key={user.id} onClick={() => setActiveChatId(user.id)} className="flex flex-col items-center shrink-0">
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-500 to-orange-500 p-[2px]">
                    <UserAvatar name={user.name} size="w-full h-full" />
                  </div>
                  <span className="text-[10px] mt-2 text-yellow-500 font-bold">{user.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex p-1 bg-[#0b1222] rounded-xl border border-white/5 mb-4">
            <button onClick={() => setActiveTab("direct")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "direct" ? "bg-blue-600 text-white" : "text-gray-500"}`}>Messages</button>
            <button onClick={() => setActiveTab("groups")} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${activeTab === "groups" ? "bg-blue-600 text-white" : "text-gray-500"}`}>Groups</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-8 pb-6 no-scrollbar">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-2">Your {activeTab === "direct" ? "Messages" : "Groups"}</p>
            {friendsAndGroups.map((chat) => (
              <div key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`flex items-center gap-4 p-4 rounded-[28px] cursor-pointer transition-all ${activeChatId === chat.id ? "bg-white/10" : "hover:bg-white/5"}`}>
                <UserAvatar name={chat.name} isOnline={chat.isOnline} />
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
          {activeTab === "direct" && onlineStrangers.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3 ml-2">Discover People Online</p>
              {onlineStrangers.map((user) => (
                <div key={user.id} className="flex items-center gap-4 p-3 rounded-[24px] bg-blue-600/5 border border-white/5 hover:bg-blue-600/10 transition-colors">
                  <UserAvatar name={user.name} size="w-10 h-10" isOnline={true} />
                  <div className="flex-1"><h4 className="text-xs font-bold text-white">{user.name}</h4><p className="text-[10px] text-blue-400 font-medium">Available to chat</p></div>
                  <button onClick={() => handleSendRequest(user.id)} className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl active:scale-90 shadow-lg"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5" /></svg></button>
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
              <button onClick={() => setActiveChatId(null)} className="md:hidden p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2" /></svg></button>
              <UserAvatar name={currentChat.name} size="w-10 h-10" />
              <h4 className="font-bold text-sm">{currentChat.name}</h4>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              {currentChat.status === "pending" ? (
                <div className="bg-[#0b1222] p-8 rounded-[40px] border border-white/5 shadow-2xl max-w-sm flex flex-col items-center">
                  <UserAvatar name={currentChat.name} size="w-20 h-20" />
                  <h3 className="text-lg font-bold mt-4 mb-2">Respond to Request</h3>
                  <p className="text-gray-400 text-xs mb-8">Accept to chat with {currentChat.name}.</p>
                  <div className="flex gap-4 w-full">
                    <button onClick={() => handleAccept(currentChat.id)} className="flex-1 py-3 bg-blue-600 rounded-2xl text-xs font-bold">Accept</button>
                    <button onClick={() => handleIgnore(currentChat.id)} className="flex-1 py-3 bg-red-600/10 text-red-500 border border-red-600/20 rounded-2xl text-xs font-bold">Ignore</button>
                  </div>
                </div>
              ) : currentChat.status === "sent" ? (
                <div className="text-center">
                   <UserAvatar name={currentChat.name} size="w-16 h-16 mx-auto mb-4" />
                   <p className="text-sm text-gray-400 italic">Request pending with {currentChat.name}</p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Chatting with {currentChat.name}</p>
              )}
            </div>
            {currentChat.status === "accepted" && (
              <div className="p-6">
                <div className="bg-white/5 border border-white/10 p-2 rounded-2xl flex items-center gap-2">
                  <input type="text" placeholder="Type message..." className="flex-1 bg-transparent px-4 py-2 outline-none text-sm" />
                  <button className="p-3 bg-blue-600 rounded-xl transition-all active:scale-95"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg></button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 uppercase tracking-widest font-black opacity-20 text-4xl">ChatOO</div>
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8">
              <h2 className="text-xl font-bold mb-6">Add Friend</h2>
              <input value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder="User name..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 mb-6" />
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
              <input value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} placeholder="Group name..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 mb-6" />
              <div className="flex gap-3">
                <button onClick={() => setShowGroupModal(false)} className="flex-1 py-4 bg-white/5 rounded-2xl text-xs font-bold border border-white/10">Cancel</button>
                <button onClick={handleCreateGroup} className="flex-1 py-4 bg-blue-600 rounded-2xl text-xs font-bold">Create</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
<AnimatePresence>
  {showProfileDetails && (
    <motion.div 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#0b1222] border-l border-white/10 z-[60] shadow-2xl p-8 overflow-y-auto"
    >
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <button onClick={() => setShowProfileDetails(false)} className="p-2 hover:bg-white/5 rounded-full">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg>
        </button>
      </div>

      <div className="flex flex-col items-center mb-10">
        <div className="relative group cursor-pointer">
          <UserAvatar name="My Profile" size="w-32 h-32" />
          <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2" /><path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" /></svg>
          </div>
        </div>
        <h3 className="mt-4 text-lg font-bold">Madan Machi</h3>
        <p className="text-gray-500 text-sm">Full Stack Developer</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Display Name</label>
          <input type="text" defaultValue="Madan Machi" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-2">About Me</label>
          <textarea defaultValue="Coding is life 🚀" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-colors h-24" />
        </div>
        
        <div className="pt-4 space-y-3">
          <button className="w-full py-4 bg-blue-600 rounded-2xl text-xs font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all">Save Changes</button>
          <button onClick={handleLogout} className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all">Sign Out Everywhere</button>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default HomePage;