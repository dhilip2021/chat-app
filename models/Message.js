import mongoose from "mongoose";


const MessageSchema = new mongoose.Schema(
{
sender: String,
text: String,
type: { type: String, default: "text" },
},
{ timestamps: true }
);


export default mongoose.models.Message || mongoose.model("Message", MessageSchema);