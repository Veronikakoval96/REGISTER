import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        type: { type: String, required: true},
        price: { type: Number, required: true},
        status: { type: String, enum: ["new", "used"],  required: true}
    }
)

export default mongoose.model("Product", productSchema)