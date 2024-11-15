import mongoose from "mongoose";

const SpocategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const SpoCategory = mongoose.model("SpoCategory", SpocategorySchema);
export default SpoCategory;
