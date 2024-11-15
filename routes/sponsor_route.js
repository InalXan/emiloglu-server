import express from "express";
import multer from "multer";
import fs from "fs";
import Sponsors from "../db/models/sponsor_model.js";
import SponsorCategory from "../db/models/sponsor_category.js";

const sponsors_router = express.Router();

const uploadDir = "./uploads/sponsors";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
    }
  },
});

sponsors_router.post("/new/sponsor", upload.single("image"), async (req, res) => {
  const { name, categoryId } = req.body;

  try {
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Sponsor name is required and must be valid." });
    }

    if (!categoryId) {
      return res.status(400).json({ message: "Category ID is required." });
    }

    const category = await SponsorCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    const sponsor = new Sponsors({
      name,
      image: req.file ? `/uploads/sponsors/${req.file.filename}` : "",
      categoryId,
    });

    await sponsor.save();
    res.status(201).json(sponsor);
  } catch (error) {
    if (error instanceof multer.MulterError) {
      res.status(400).json({ error: "File upload error: " + error.message });
    } else {
      console.error(error);
      res.status(500).json({ error: "An error occurred while creating the sponsor." });
    }
  }
});

sponsors_router.get("/fetch/sponsors/:categoryId", async (req, res) => {
  const { categoryId } = req.params; // URL'den categoryId'yi alıyoruz

  if (!categoryId) {
    return res.status(400).json({ message: "Category ID is required." }); // Category ID eksikse hata veriyoruz
  }

  try {
    const sponsors = await Sponsors.find({ categoryId });
    if (sponsors.length === 0) {
      return res.status(404).json({ message: "No sponsors found for this category." }); // Sponsor bulunmazsa hata
    }
    res.status(200).json(sponsors); // Sponsorları döndürüyoruz
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" }); // Sunucu hatası
  }
});

sponsors_router.put("/sponsor/:id", upload.single("image"), async (req, res) => {
  try {
    const sponsor = await Sponsors.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found." });
    }

    sponsor.name = req.body.name || sponsor.name;
    sponsor.categoryId = req.body.categoryId || sponsor.categoryId;

    if (req.file) {
      if (sponsor.image && fs.existsSync(`.${sponsor.image}`)) {
        fs.unlinkSync(`.${sponsor.image}`);
      }
      sponsor.image = `/uploads/sponsors/${req.file.filename}`;
    }

    await sponsor.save();
    res.status(200).json(sponsor);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

sponsors_router.delete("/delete/sponsor/:id", async (req, res) => {
  try {
    const sponsor = await Sponsors.findByIdAndDelete(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found." });
    }

    if (sponsor.image && fs.existsSync(`.${sponsor.image}`)) {
      fs.unlinkSync(`.${sponsor.image}`);
    }

    res.status(200).json({ message: "Sponsor deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export default sponsors_router;
