import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
name: String,
email: String,
avatar: String,
online: Boolean,
last_seen: Date,
});


export default mongoose.models.User || mongoose.model("User", UserSchema);