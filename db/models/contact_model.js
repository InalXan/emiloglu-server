import mongoose from "mongoose";

const ContactSchema = mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    message: { type: String, required: true }
});

const Contact = mongoose.model('contacts', ContactSchema);

 export default Contact;