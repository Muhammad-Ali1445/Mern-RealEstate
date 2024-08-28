import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"; // Ensure the .js extension is correct

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => console.log("Error connecting: " + err.message));

app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
