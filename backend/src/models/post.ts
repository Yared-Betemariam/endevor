import mongoose from "mongoose";

export type PostType = {
  _id: string;
  userId: string;
  name: string;
  description: string;
  type: string;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

const PostSchema = new mongoose.Schema<PostType>({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  lastUpdated: { type: Date, required: true },
  imageUrls: [{ type: String, required: true }],
});

const Post = mongoose.model<PostType>("Post", PostSchema);

export default Post;
