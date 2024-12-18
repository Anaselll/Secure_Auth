import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  gmail: String,
  password: String,
  refreshToken: String,
  resetToken: String,
  verifyEmail: Boolean,
});

const User = mongoose.model("User", userSchema);

export default User;
