import express from "express"; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ✅ NEW
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://urban-nest-2c0l03i5b-ali-munirs-projects.vercel.app",
      "https://urban-nest-livid.vercel.app",
      "https://urban-nest-hfhvpy6h0-ali-munirs-projects.vercel.app", // ✅ Add this line
      "https://urban-nest-git-main-ali-munirs-projects.vercel.app"   // ✅ Add this too (optional)
    ],
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// test Route 
app.get("/ping", (req, res) => {
  res.send("API is working ✅");
});

// ❌ Commented out because we're not serving the frontend from here
// app.use(express.static(path.join(__dirname, '/client/dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
