export default function ChatList({ chats }) {
return (
<div>
{chats.map((c) => (
<div key={c.id} className="p-3 border-b">{c.name}</div>
))}
</div>
);
}