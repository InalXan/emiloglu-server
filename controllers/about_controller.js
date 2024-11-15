import About from "../db/models/about_model.js";
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
export const createAboutContent = async (req, res) => {
  try {
    const { header, section, paragraph } = req.body;
    const images = req.files.map(file => file.path);

    const aboutContent = new About({
      header,
      section,
      paragraph,
      images
    });

    const savedContent = await aboutContent.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(500).json({ error: 'Error creating about content' });
  }
};

export const updateAboutContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { header, section, paragraph } = req.body;
    const images = req.files.map(file => file.path);

    const updatedContent = await About.findByIdAndUpdate(
      id,
      { header, section, paragraph, images },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ error: 'About content not found' });
    }

    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: 'Error updating about content' });
  }
};

// Get All About Contents
export const getAboutContent = async (req, res) => {
  try {
    const aboutContents = await About.find();
    res.status(200).json(aboutContents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching about content' });
  }
};



// Delete About Content
export const deleteAboutContent = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findByIdAndDelete(id);

    if (!about) {
        return res.status(404).json({ message: 'Sponsor not found' });
    }

    // Delete the associated image file
    if (about.image) {
        fs.unlinkSync(about.image);
    }

    res.status(200).json({ message: 'Sponsor deleted successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
}
};