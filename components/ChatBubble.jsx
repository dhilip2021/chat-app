export default function ChatBubble({ message }) {
return (
<div className={`my-2 flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
<div className="max-w-[70%] rounded-xl bg-green-600 px-4 py-2 text-white">
{message.text}
</div>
</div>
);
}