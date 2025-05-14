import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        type: { type: String, required: true},
        price: { type: Number, required: true},
        status: { type: String, enum: ["new", "used"],  required: true},
        image: { type: String, trim: true, required: false},
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },{
        timestamps: true,
    }
)

export default mongoose.model("Product", productSchema)