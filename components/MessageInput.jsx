import { useState } from "react";


export default function MessageInput({ onSend }) {
const [text, setText] = useState("");


return (
<div className="flex gap-2 border-t p-3">
<input
className="flex-1 rounded border px-3"
value={text}
onChange={(e) => setText(e.target.value)}
onKeyDown={(e) => e.key === "Enter" && onSend(text)}
/>
<button
className="rounded bg-green-600 px-4 text-white"
onClick={() => onSend(text)}
>
Send
</button>
</div>
);
}