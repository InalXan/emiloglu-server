import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  header: { type: String, required: true },
  section: { type: String, required: true },
  paragraph: { type: String, required: true },
  images: [{ type: String }]
});

const About = mongoose.model('About', aboutSchema);
export default About;