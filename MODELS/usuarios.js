import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
    name: { type: String, trim: true, required: true},
    email: { type: String, trim: true,  required: true},
    password: {
         type: String, 
         required: true,
        trim: true,
        minlength:  [8, "Password 8 characters minimum"]},
    role: { type: String, enum: ["user", "admin"], default: "user", required: false},
    image: { type: String, trim: true, required: false},
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
},
{ timestamps: true})

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) 
        return next()
    try{
    this.password =  await bcrypt.hash(this.password, 10)
    next()
    } catch(error){
    next(error)
}
} )

export default mongoose.model("User", userSchema)

