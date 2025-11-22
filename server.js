// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./database/db.js";
// import userRoute from "./routes/user.route.js";
// import blogRoute from "./routes/blog.route.js";
// import commentRoute from "./routes/comment.route.js";
// import uploadRoutes from "./routes/uploadRoutes.js"; // ✅ import upload route
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";

// dotenv.config();
// const app = express();

// // ✅ PORT setup
// const PORT = process.env.PORT || 3000;

// // ✅ Middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:5173", // your React frontend
//     credentials: true,
//   })
// );

// // ✅ Get directory name for serving frontend
// const _dirname = path.resolve();

// // ✅ API routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/blog", blogRoute);
// app.use("/api/v1/comment", commentRoute);
// app.use("/api/v1/upload", uploadRoutes); // ✅ Cloudinary upload route

// // ✅ Serve React frontend build (for production)
// app.use(express.static(path.join(_dirname, "/frontend/dist")));
// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
// });

// // ✅ Start server and connect DB
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
//   connectDB();
// });


import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";
import uploadRoutes from "./routes/uploadRoutes.js"; 
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS CONFIGURATION
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app-frontend-live.vercel.app" 
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// ✅ API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/upload", uploadRoutes); 

// ---------------------------------------------------------
// ❌ REMOVED: Frontend Static Serving (Causes Crash on Render)
// app.use(express.static(path.join(_dirname, "/frontend/dist")));
// app.get("*", (_, res) => { ... });
// ---------------------------------------------------------

// ✅ ADDED: Basic Root Route
// This stops the "Cannot GET /" error and lets you know the backend is alive.
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Backend is running successfully"
    });
});

// ✅ Start server and connect DB
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});