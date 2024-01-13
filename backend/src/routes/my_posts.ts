import { v2 } from "cloudinary";
import express, { Request, Response } from "express";
import multer from "multer";
import Post, { PostType } from "../models/post";
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("name is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("type").notEmpty().withMessage("type is required"),
  ],
  upload.array("imageFiles", 4),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newPost: PostType = req.body;

      const upPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = `data:${image.mimetype};base64,${b64}`;
        const res = await v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(upPromises);
      newPost.imageUrls = imageUrls;
      newPost.lastUpdated = new Date();
      newPost.userId = req.userId;

      const post = new Post(newPost);
      await post.save();

      res.status(201).json(post);
    } catch (error) {
      console.log("Error creating: ", error);
      res.status(500).json({ message: "Someting went wrong" });
    }
  }
);

export default router;
