import mongoose from "mongoose";

const SponsorCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const SponsorCategory = mongoose.model("SponsorCategory", SponsorCategorySchema);
export default SponsorCategory;

