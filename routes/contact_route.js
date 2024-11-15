import express from "express";
const contact = express.Router();
import { submitForm, getContacts, deleteContact } from "../controllers/contact_controller.js";

contact.post('/submit', submitForm);
contact.get('/contacts', getContacts);
contact.delete('/contacts/:id', deleteContact);

export default contact