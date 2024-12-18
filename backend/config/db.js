import mongoose from "mongoose";

export function connectDB() {
  mongoose
    .connect("mongodb://localhost/auth", {})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB", err));
}
