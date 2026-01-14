import connectMongoDB from "@/lib/mongodb";
import Message from "@/models/Message";


export async function POST(req) {
await connectMongoDB();
const body = await req.json();


const msg = await Message.create(body);
return Response.json({ success: true, msg });
}


export async function GET() {
await connectMongoDB();
const messages = await Message.find().sort({ createdAt: 1 });
return Response.json(messages);
}