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
    role: { type: String, enum: ["user", "admin"], default: "user", required: true},
    image: { type: String, trim: true, required: false},
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product"}]
},
{ timestamps: true})

userSchema.pre("save", function (next){
    if (this.password.minlength < 8 ){
        next( new Error("Password 8 characters minimum"))
    }
    this.password = bcrypt.hashSync(this.password, 10)
next()
} )

export default mongoose.model("User", userSchema)

