"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react"; // ✅ Install this: npm install qrcode.react

const generateId = (): number => Math.floor(Math.random() * 1000000);

// ✅ Reusable UserAvatar Component
const UserAvatar = ({
  name,
  size = "w-12 h-12",
  isOnline,
}: {
  name: string;
  size?: string;
  isOnline?: boolean;
}) => {
  const avatarUrl = `https://i.pravatar.cc/150?u=${name.replace(/\s/g, "")}`;
  return (
    <div
      className={`${size} rounded-2xl bg-gray-800 flex-shrink-0 relative overflow-hidden border border-white/10 flex items-center justify-center font-bold text-white shadow-inner`}
    >
      <Image
        src={avatarUrl}
        alt={name}
        fill
        className="object-cover"
        sizes="150px"
      />
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
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [selectedUserForGroup, setSelectedUserForGroup] = useState<
    number | null
  >(null);

  // ✅ Invite & QR States
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock Data
  const [chatData, setChatData] = useState([
    {
      id: 1,
      name: "Suresh Machi",
      lastMsg: "Logo ready-ah?",
      time: "10:30 AM",
      isOnline: true,
      type: "direct",
      status: "accepted",
    },
    {
      id: 2,
      name: "Rahul",
      lastMsg: "Waiting for request...",
      time: "Yesterday",
      isOnline: false,
      type: "direct",
      status: "pending",
    },
    {
      id: 3,
      name: "React Devs",
      lastMsg: "New Update!",
      time: "9:00 AM",
      isOnline: true,
      type: "groups",
      status: "accepted",
    },
    {
      id: 4,
      name: "Anitha",
      lastMsg: "Hi there!",
      time: "11:15 AM",
      isOnline: true,
      type: "direct",
      status: "pending",
    },
    {
      id: 5,
      name: "Priya",
      lastMsg: "Project update?",
      time: "12:00 PM",
      isOnline: true,
      type: "direct",
      status: "accepted",
    },
    {
      id: 6,
      name: "Vikram",
      lastMsg: "",
      time: "",
      isOnline: true,
      type: "direct",
      status: "none",
    },
    {
      id: 7,
      name: "Deepa",
      lastMsg: "",
      time: "",
      isOnline: true,
      type: "direct",
      status: "none",
    },
  ]);

  const currentChat = chatData.find((c) => c.id === activeChatId);
  const incomingRequests = chatData.filter((user) => user.status === "pending");
  const onlineStrangers = chatData.filter(
    (user) => user.status === "none" && user.isOnline,
  );
  const friendsAndGroups = chatData.filter(
    (chat) =>
      chat.type === activeTab &&
      (chat.status === "accepted" || chat.status === "sent"),
  );

  const inviteLink = `https://chatoo.app/join/${currentChat?.name.toLowerCase().replace(/\s/g, "-") || "group"}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = {
      id: generateId(),
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

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const handleAccept = (id: number) => {
    setChatData((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "accepted",
              lastMsg: "Request accepted",
              time: "Just now",
            }
          : c,
      ),
    );
  };

  const handleIgnore = (id: number) => {
    setChatData((prev) => prev.filter((c) => c.id !== id));
    if (activeChatId === id) setActiveChatId(null);
  };

  const handleSendRequest = (id?: number) => {
    if (id) {
      setChatData((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: "sent",
                lastMsg: "Request sent...",
                time: "Just now",
              }
            : c,
        ),
      );
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

  return (
    <div className="fixed inset-0 flex bg-[#0f172a] text-white overflow-hidden w-full h-full font-sans">
      {/* 1. Sidebar (Desktop Only) */}
      <div className="hidden md:flex w-20 flex-col items-center py-6 border-r border-white/5 bg-[#0b1222] shrink-0 justify-between">
        <div className="flex flex-col items-center w-full">
          <div className="relative w-10 h-10 mb-10">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="p-3 bg-blue-600 rounded-2xl shadow-lg hover:scale-110 transition-transform"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                strokeWidth="2"
              />
            </svg>
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-[2px] rounded-2xl transition-all ${showSettings ? "ring-2 ring-blue-500" : "hover:bg-white/5"}`}
          >
            <UserAvatar name="My Profile" size="w-12 h-12" />
          </button>
        </div>
      </div>

      {/* 2. Chat Sidebar */}
      <div
        className={`${activeChatId ? "hidden md:flex" : "flex"} w-full md:max-w-[380px] flex-col bg-[#0f172a] border-r border-white/5 h-full relative`}
      >
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black italic text-blue-500 tracking-tighter">
              ChatOO
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowGroupModal(true)}
                className="p-2 bg-blue-600/10 text-blue-500 rounded-xl hover:bg-blue-600/20"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4v16m8-8H4" strokeWidth="2" />
                </svg>
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="md:hidden w-10 h-10 rounded-xl overflow-hidden border border-white/10 active:scale-95"
              >
                <UserAvatar name="My Profile" size="w-full h-full" />
              </button>
            </div>
          </div>

          {incomingRequests.length > 0 && (
            <div className="mb-6">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                Incoming Requests
              </p>
              <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                {incomingRequests.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setActiveChatId(user.id)}
                    className="flex flex-col items-center shrink-0"
                  >
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-500 to-orange-500 p-[2px]">
                      <UserAvatar name={user.name} size="w-full h-full" />
                    </div>
                    <span className="text-[10px] mt-2 text-yellow-500 font-bold">
                      {user.name.split(" ")[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

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

        <div className="flex-1 overflow-y-auto px-4 space-y-8 pb-6 no-scrollbar">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 ml-2">
              Your {activeTab === "direct" ? "Messages" : "Groups"}
            </p>
            {friendsAndGroups.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`flex items-center gap-4 p-4 rounded-[28px] cursor-pointer transition-all ${activeChatId === chat.id ? "bg-white/10" : "hover:bg-white/5"}`}
              >
                <UserAvatar name={chat.name} isOnline={chat.isOnline} />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3
                      className={`text-sm font-bold truncate ${chat.status === "sent" ? "text-blue-400" : "text-white"}`}
                    >
                      {chat.name}
                    </h3>
                    <span className="text-[10px] text-gray-500">
                      {chat.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {chat.lastMsg}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {activeTab === "direct" && onlineStrangers.length > 0 && (
            <div className="space-y-3">
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-3 ml-2">
                Discover People
              </p>
              {onlineStrangers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-3 rounded-[24px] bg-blue-600/5 border border-white/5 hover:bg-blue-600/10 transition-colors"
                >
                  <UserAvatar
                    name={user.name}
                    size="w-10 h-10"
                    isOnline={true}
                  />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-white">
                      {user.name}
                    </h4>
                    <p className="text-[10px] text-blue-400 font-medium">
                      Available
                    </p>
                  </div>
                  <button
                    onClick={() => handleSendRequest(user.id)}
                    className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl active:scale-90 shadow-lg"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4v16m8-8H4" strokeWidth="2.5" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Settings Popover */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-20 left-6 z-50 w-48 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl p-2"
            >
              <button
                onClick={() => {
                  setShowProfileDetails(true);
                  setShowSettings(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-white/5 rounded-xl transition-colors"
              >
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    strokeWidth="2"
                  />
                </svg>
                Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-white/5 rounded-xl transition-colors">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"
                    strokeWidth="2"
                  />
                </svg>
                Settings
              </button>
              <div className="h-[1px] bg-white/5 my-2 mx-2"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    strokeWidth="2"
                  />
                </svg>
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Main Chat Area */}
      <div
        className={`${activeChatId ? "flex" : "hidden md:flex"} flex-1 flex-col bg-[#0b1222]/30 h-full relative`}
      >
        {currentChat ? (
          <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0f172a]/60 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveChatId(null)}
                  className="md:hidden p-2"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 19l-7-7 7-7" strokeWidth="2" />
                  </svg>
                </button>
                <UserAvatar
                  name={currentChat.name}
                  size="w-10 h-10"
                  isOnline={currentChat.isOnline}
                />
                <div>
                  <h4 className="font-bold text-sm">{currentChat.name}</h4>
                  {currentChat.type === "groups" && (
                    <p className="text-[10px] text-blue-400">12 Members</p>
                  )}
                </div>
              </div>
              {currentChat.type === "groups" && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddMemberModal(true)}
                    className="p-2 bg-blue-600/20 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <div className="flex items-center gap-2 px-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          strokeWidth="2"
                        />
                      </svg>
                      <span className="text-xs font-bold hidden sm:inline">
                        Add Member
                      </span>
                    </div>
                  </button>
<button onClick={() => setShowInviteModal(true)} className="p-2 bg-purple-600/10 text-purple-400 rounded-xl hover:bg-purple-600 hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" strokeWidth="2"/></svg>
                  </button>
                </div>
              )}
            </div>

            {/* Chat Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              {currentChat.status === "pending" ? (
                <div className="bg-[#0b1222] p-8 rounded-[40px] border border-white/5 shadow-2xl max-w-sm flex flex-col items-center">
                  <UserAvatar name={currentChat.name} size="w-20 h-20" />
                  <h3 className="text-lg font-bold mt-4 mb-2">
                    Respond to Request
                  </h3>
                  <p className="text-gray-400 text-xs mb-8">
                    Accept to chat with {currentChat.name}.
                  </p>
                  <div className="flex gap-4 w-full">
                    <button
                      onClick={() => handleAccept(currentChat.id)}
                      className="flex-1 py-3 bg-blue-600 rounded-2xl text-xs font-bold"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleIgnore(currentChat.id)}
                      className="flex-1 py-3 bg-red-600/10 text-red-500 border border-red-600/20 rounded-2xl text-xs font-bold"
                    >
                      Ignore
                    </button>
                  </div>
                </div>
              ) : currentChat.status === "sent" ? (
                <div className="text-center">
                  <UserAvatar
                    name={currentChat.name}
                    size="w-16 h-16 mx-auto mb-4"
                  />
                  <p className="text-sm text-gray-400 italic">
                    Request pending with {currentChat.name}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  No messages yet. Start the conversation with{" "}
                  {currentChat.name}!
                </p>
              )}
            </div>

            {/* Input Area */}
            {currentChat.status === "accepted" && (
              <div className="p-6">
                <div className="bg-white/5 border border-white/10 p-2 rounded-2xl flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type message..."
                    className="flex-1 bg-transparent px-4 py-2 outline-none text-sm"
                  />
                  <button className="p-3 bg-blue-600 rounded-xl transition-all active:scale-95">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 uppercase tracking-widest font-black opacity-20 text-4xl">
            Chat-APP
          </div>
        )}
      </div>

      {/* Modals & Profile Slider */}
      <AnimatePresence>
        {/* ADD USER MODAL */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8"
            >
              <h2 className="text-xl font-bold mb-6">Add Friend</h2>
              <input
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="User name..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 mb-6"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 py-4 bg-white/5 rounded-2xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSendRequest()}
                  className="flex-1 py-4 bg-blue-600 rounded-2xl text-xs font-bold"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* NEW GROUP MODAL */}
        {showGroupModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8"
            >
              <h2 className="text-xl font-bold mb-6">New Group</h2>
              <input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Group name..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 mb-6"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowGroupModal(false)}
                  className="flex-1 py-4 bg-white/5 rounded-2xl text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroup}
                  className="flex-1 py-4 bg-blue-600 rounded-2xl text-xs font-bold"
                >
                  Create
                </button>
              </div>
            </motion.div>
          </div>
        )}
        {/* ✅ INVITE & QR MODAL */}
        {showInviteModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0f172a] border border-white/10 w-full max-w-sm rounded-[40px] p-8 text-center"
            >
              <h2 className="text-xl font-bold mb-2">
                Invite to {currentChat?.name}
              </h2>
              <p className="text-gray-400 text-xs mb-8">
                Share this QR or link with friends
              </p>

              {/* QR Code Container */}
              <div className="bg-white p-4 rounded-3xl inline-block mb-8 shadow-2xl shadow-blue-500/20">
                <QRCodeSVG
                  value={inviteLink}
                  size={180}
                  level="H"
                  includeMargin={false}
                  fgColor="#0f172a"
                />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between mb-8 overflow-hidden">
                <span className="text-[10px] text-blue-400 truncate mr-2 font-mono">
                  {inviteLink}
                </span>
                <button
                  onClick={handleCopyLink}
                  className={`shrink-0 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${copied ? "bg-green-500" : "bg-blue-600"}`}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <button
                onClick={() => setShowInviteModal(false)}
                className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}

        {/* ✅ ADD MEMBER MODAL (FIXED) */}
        {showAddMemberModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#0f172a] border border-white/10 w-full max-w-md rounded-[32px] overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  Add to {currentChat?.name}
                </h2>
                <button
                  onClick={() => setShowAddMemberModal(false)}
                  className="text-gray-500 hover:text-white"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
                  </svg>
                </button>
              </div>
              <div className="max-h-[300px] overflow-y-auto p-4 space-y-2 no-scrollbar">
                {chatData
                  .filter((u) => u.type === "direct" && u.status === "accepted")
                  .map((friend) => (
                    <div
                      key={friend.id}
                      onClick={() => setSelectedUserForGroup(friend.id)}
                      className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all ${selectedUserForGroup === friend.id ? "bg-blue-600" : "hover:bg-white/5"}`}
                    >
                      <UserAvatar name={friend.name} size="w-10 h-10" />
                      <div className="flex-1 text-sm font-bold">
                        {friend.name}
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUserForGroup === friend.id ? "border-white" : "border-white/20"}`}
                      >
                        {selectedUserForGroup === friend.id && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
              <div className="p-6 bg-[#0b1222]">
                <button
                  onClick={() => {
                    alert("Added!");
                    setShowAddMemberModal(false);
                  }}
                  className="w-full py-4 bg-blue-600 rounded-2xl text-xs font-bold shadow-lg active:scale-95 transition-all"
                >
                  Confirm Add
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* PROFILE SLIDER */}
        {showProfileDetails && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-[#0b1222] border-l border-white/10 z-[150] shadow-2xl p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold">Profile</h2>
              <button
                onClick={() => setShowProfileDetails(false)}
                className="p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center gap-4">
              <UserAvatar name="Madan Machi" size="w-32 h-32" />
              <h3 className="text-xl font-bold">Madan Machi</h3>
              <button
                className="w-full py-4 bg-blue-600 rounded-2xl text-xs font-bold mt-4"
                onClick={() => setShowProfileDetails(false)}
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
