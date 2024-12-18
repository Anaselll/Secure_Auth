import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { authenticate } from "./middlewares/authenticate.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.get("/chat", authenticate, (req, res) => {
  res.send(req.user);
});
connectDB();
const port = 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
