import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
    name: { type: String, trim: true, required: true},
    email: { type: String, trim: true,  required: true},
    password: {
         type: String, 
         required: true,
        trim: true,
        minlenght:  [8, "Password 8 characters minimum"]},
    role: { type: String, enum: ["user", "admin"], default: "user", required: true},
    image: { type: String},
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
},
{ timestamps: true})

export default mongoose.model("User", userSchema)