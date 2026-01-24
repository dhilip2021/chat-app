"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react"; // ✅ Install this: npm install qrcode.react

const generateId = (): number => Math.floor(Math.random() * 1000000);

// ✅ Reusable UserAvatar Component
const UserAvatar = ({ name, size = "w-12 h-12", isOnline }: { name: string; size?: string; isOnline?: boolean }) => {
  const avatarUrl = `https://i.pravatar.cc/150?u=${name.replace(/\s/g, "")}`;
  return (
    <div className={`${size} rounded-2xl bg-gray-800 flex-shrink-0 relative overflow-hidden border border-white/10 flex items-center justify-center font-bold text-white shadow-inner`}>
      <Image src={avatarUrl} alt={name} fill className="object-cover" sizes="150px" />
      <span className="absolute z-[-1]">{name[0]}</span>
      {isOnline && <div className="absolute w-3 h-3 bg-green-500 border-2 border-[#0f172a] rounded-full bottom-1 right-1 z-10 shadow-sm" />}
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
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedUserForGroup, setSelectedUserForGroup] = useState<number | null>(null);
  
  // ✅ Invite & QR States
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock Data
  const [chatData, setChatData] = useState([
    { id: 1, name: "Suresh Machi", lastMsg: "Logo ready-ah?", time: "10:30 AM", isOnline: true, type: "direct", status: "accepted" },
    { id: 2, name: "Rahul", lastMsg: "Waiting for request...", time: "Yesterday", isOnline: false, type: "direct", status: "pending" },
    { id: 3, name: "React Devs", lastMsg: "New Update!", time: "9:00 AM", isOnline: true, type: "groups", status: "accepted" },
    { id: 4, name: "Anitha", lastMsg: "Hi there!", time: "11:15 AM", isOnline: true, type: "direct", status: "pending" },
    { id: 5, name: "Priya", lastMsg: "Project update?", time: "12:00 PM", isOnline: true, type: "direct", status: "accepted" },
  ]);

  const currentChat = chatData.find((c) => c.id === activeChatId);
  const friendsAndGroups = chatData.filter((chat) => chat.type === activeTab && (chat.status === "accepted" || chat.status === "sent"));

  // ✅ QR & Invite Handlers
  const inviteLink = `https://chatoo.app/join/${currentChat?.name.toLowerCase().replace(/\s/g, "-") || "group"}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      
      {/* 1. Sidebar (Desktop) */}
      <div className="hidden md:flex w-20 flex-col items-center py-6 border-r border-white/5 bg-[#0b1222] shrink-0 justify-between">
        <div className="flex flex-col items-center w-full">
          <div className="relative w-10 h-10 mb-10 text-blue-500 font-black text-2xl tracking-tighter italic">C</div>
          <button onClick={() => setShowAddUserModal(true)} className="p-3 bg-blue-600 rounded-2xl shadow-lg hover:scale-110 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeWidth="2" /></svg>
          </button>
        </div>
        <button onClick={() => setShowSettings(!showSettings)} className="p-[2px] rounded-2xl hover:ring-2 ring-blue-500 transition-all">
          <UserAvatar name="Madan" size="w-12 h-12" />
        </button>
      </div>

      {/* 2. Chat Sidebar */}
      <div className={`${activeChatId ? "hidden md:flex" : "flex"} w-full md:max-w-[380px] flex-col bg-[#0f172a] border-r border-white/5 h-full relative`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic text-blue-500 tracking-tighter">ChatOO</h2>
            <button onClick={() => setShowGroupModal(true)} className="p-2 bg-blue-600/10 text-blue-500 rounded-xl hover:bg-blue-600/20 transition-all">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" /></svg>
            </button>
          </div>
          <div className="flex p-1 bg-[#0b1222] rounded-xl border border-white/5">
            <button onClick={() => setActiveTab("direct")} className={`flex-1 py-2 text-xs font-bold rounded-lg ${activeTab === "direct" ? "bg-blue-600 text-white" : "text-gray-500"}`}>Messages</button>
            <button onClick={() => setActiveTab("groups")} className={`flex-1 py-2 text-xs font-bold rounded-lg ${activeTab === "groups" ? "bg-blue-600 text-white" : "text-gray-500"}`}>Groups</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2 no-scrollbar">
          {friendsAndGroups.map((chat) => (
            <div key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`flex items-center gap-4 p-4 rounded-[24px] cursor-pointer transition-all ${activeChatId === chat.id ? "bg-white/10" : "hover:bg-white/5"}`}>
              <UserAvatar name={chat.name} isOnline={chat.isOnline} />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold truncate">{chat.name}</h3>
                  <span className="text-[10px] text-gray-500">{chat.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-1">{chat.lastMsg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Chat Area */}
      <div className={`${activeChatId ? "flex" : "hidden md:flex"} flex-1 flex-col bg-[#0b1222]/30 h-full relative`}>
        {currentChat ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0f172a]/60 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <button onClick={() => setActiveChatId(null)} className="md:hidden p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="2"/></svg></button>
                <UserAvatar name={currentChat.name} size="w-10 h-10" isOnline={currentChat.isOnline} />
                <h4 className="font-bold text-sm">{currentChat.name}</h4>
              </div>
              {currentChat.type === "groups" && (
                <div className="flex gap-2">
                  <button onClick={() => setShowAddMemberModal(true)} className="p-2 bg-blue-600/10 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeWidth="2"/></svg>
                  </button>
                  <button onClick={() => setShowInviteModal(true)} className="p-2 bg-purple-600/10 text-purple-400 rounded-xl hover:bg-purple-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" strokeWidth="2"/></svg>
                  </button>
                </div>
              )}
            </div>
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm italic">End-to-end encrypted</div>
            <div className="p-6">
              <div className="bg-white/5 border border-white/10 p-2 rounded-2xl flex items-center gap-2">
                <input type="text" placeholder="Type message..." className="flex-1 bg-transparent px-4 py-2 outline-none text-sm" />
                <button className="p-3 bg-blue-600 rounded-xl transition-all active:scale-95"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg></button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 uppercase tracking-widest font-black opacity-10 text-6xl">ChatOO</div>
        )}
      </div>

      <AnimatePresence>
        {/* ✅ INVITE & QR MODAL */}
        {showInviteModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Invite to {currentChat?.name}</h2>
              <p className="text-gray-400 text-xs mb-8">Share this QR or link with friends</p>
              
              {/* QR Code Container */}
              <div className="bg-white p-4 rounded-3xl inline-block mb-8 shadow-2xl shadow-blue-500/20">
                <QRCodeSVG value={inviteLink} size={180} level="H" includeMargin={false} fgColor="#0f172a" />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between mb-8 overflow-hidden">
                <span className="text-[10px] text-blue-400 truncate mr-2 font-mono">{inviteLink}</span>
                <button onClick={handleCopyLink} className={`shrink-0 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${copied ? 'bg-green-500' : 'bg-blue-600'}`}>
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <button onClick={() => setShowInviteModal(false)} className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold transition-all">Close</button>
            </motion.div>
          </div>
        )}

        {/* ✅ ADD MEMBER MODAL */}
        {showAddMemberModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-[#0f172a] border border-white/10 w-full max-w-md rounded-[32px] overflow-hidden">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold font-sans">Add Member</h2>
                <button onClick={() => setShowAddMemberModal(false)} className="text-gray-500 hover:text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg></button>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-4 space-y-2">
                {chatData.filter(u => u.type === "direct" && u.status === "accepted").map(friend => (
                  <div key={friend.id} onClick={() => setSelectedUserForGroup(friend.id)} className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all ${selectedUserForGroup === friend.id ? "bg-blue-600" : "hover:bg-white/5"}`}>
                    <UserAvatar name={friend.name} size="w-10 h-10" />
                    <span className="flex-1 text-sm font-bold">{friend.name}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUserForGroup === friend.id ? "border-white" : "border-white/20"}`}>
                      {selectedUserForGroup === friend.id && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-[#0b1222]"><button onClick={() => setShowAddMemberModal(false)} className="w-full py-4 bg-blue-600 rounded-2xl text-xs font-bold shadow-lg">Confirm Add</button></div>
            </motion.div>
          </div>
        )}

        {/* OTHER MODALS (Group, Add User) */}
        {showGroupModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8">
              <h2 className="text-xl font-bold mb-6">New Group</h2>
              <input value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} placeholder="Group name..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 mb-6" />
              <div className="flex gap-3">
                <button onClick={() => setShowGroupModal(false)} className="flex-1 py-4 bg-white/5 rounded-2xl text-xs font-bold">Cancel</button>
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