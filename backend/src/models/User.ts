import mongoose from "mongoose";
import bcrypt from "bcrypt";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  username: string;
};

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const UserModel = mongoose.model<UserType>("User", UserSchema);

export default UserModel;
