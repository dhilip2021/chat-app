"use client";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import ChatBubble from "@/components/ChatBubble";
import MessageInput from "@/components/MessageInput";
import ChatHeader from "@/components/ChatHeader";


export default function ChatPage() {
const [messages, setMessages] = useState([]);


useEffect(() => {
socket.emit("join", "user_1");


socket.on("receive_message", (msg) => {
setMessages((prev) => [...prev, msg]);
});


return () => socket.off("receive_message");
}, []);


const sendMessage = (text) => {
const msg = { text, sender: "me" };
socket.emit("send_message", msg);
setMessages((prev) => [...prev, msg]);
};


return (
<div className="flex h-screen flex-col">
<ChatHeader />
<div className="flex-1 overflow-y-auto p-4">
{messages.map((m, i) => (
<ChatBubble key={i} message={m} />
))}
</div>
<MessageInput onSend={sendMessage} />
</div>
);
}