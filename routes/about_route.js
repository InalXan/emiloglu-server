import express from "express";
const about_route = express.Router();
import multer from "multer"
import path from "path"
import {createAboutContent, getAboutContent, updateAboutContent, deleteAboutContent } from "../controllers/about_controller.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/about');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
about_route.post('/new/about', upload.array('images', 10), createAboutContent);
about_route.get('/fetch/about', getAboutContent);
about_route.put('/about/:id', upload.array('images', 10), updateAboutContent);
about_route.delete('/delete/about/:id', deleteAboutContent);

export default about_route;