import mongoose from "mongoose";

const SponsorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SponsorCategory",
    required: true,
  },
});

export default mongoose.model("Sponsors", SponsorSchema);
